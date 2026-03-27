import React, { useState } from 'react';
import { nextId } from './adminConfig';
import { supabase } from '../lib/supabaseClient';
import './AdminShared.css';

// Props:
//   products    – live array
//   setProducts – setter
//   categories  – for the category dropdown
//   showToast   – fn(msg, isOk)
export default function AdminProducts({ products, setProducts, categories, showToast }) {
  const [modal, setModal]     = useState(null);   // null | 'add' | product-obj (edit)
  const [confirm, setConfirm] = useState(null);   // null | {msg, onOk}
  const [imageFile, setImageFile] = useState(null);  // actual file for upload
  const [imagePreview, setImagePreview] = useState(null);  // preview URL
  const [uploading, setUploading] = useState(false);  // upload in progress

  const empty = { name: '', image: '', price: '', category: categories[0]?.name || '', description: '', weight: '', origin: '', benefits: '' };
  const [form, setForm] = useState(empty);

  function openAdd()  { 
    setForm(empty); 
    setImageFile(null);
    setImagePreview(null);
    setModal('add'); 
  }
  function openEdit(p) {
    setForm({ ...p, benefits: Array.isArray(p.benefits) ? p.benefits.join(', ') : p.benefits });
    setImageFile(null);
    setImagePreview(p.image || null);  // Show existing image
    setModal(p);
  }

  async function uploadImage(file) {
    if (!file) return null;

    try {
      setUploading(true);
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(2, 8);
      const fileName = `product-${timestamp}-${randomStr}.${file.name.split('.').pop()}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, file);

      if (uploadError) {
        throw uploadError;
      }

      // Get Supabase URL components
      const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
      const publicUrl = `${SUPABASE_URL}/storage/v1/object/public/product-images/${fileName}`;
      return publicUrl;
    } catch (error) {
      showToast('Image upload failed: ' + (error.message || 'Unknown error'), false);
    } finally {
      setUploading(false);
    }
  }

  async function save() {
    if (!form.name.trim() || !form.price.trim()) {
      showToast('Name & Price are required', false);
      return;
    }
    const benefitsArr = form.benefits
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      let imageUrl = form.image;

      // Upload image if a new file was selected
      if (imageFile) {
        const uploadedUrl = await uploadImage(imageFile);
        if (!uploadedUrl) {
          showToast('Image upload failed. Product not saved.', false);
          return;
        }
        imageUrl = uploadedUrl;
      }

      if (modal === 'add') {
        const newProduct = { ...form, image: imageUrl, benefits: benefitsArr };
        const { error } = await supabase.from('products').insert([newProduct]);
        if (error) {
          throw error;
        }
        showToast('Product added ✓');
      } else {
        const { error } = await supabase
          .from('products')
          .update({ ...form, image: imageUrl, benefits: benefitsArr, id: modal.id })
          .eq('id', modal.id);
        if (error) {
          throw error;
        }
        showToast('Product updated ✓');
      }
      setModal(null);
      setImageFile(null);
      setImagePreview(null);
    } catch (error) {
      showToast('Failed to save product: ' + (error.message || 'Unknown error'), false);
    }
  }
  async function askDelete(id) {
    setConfirm({
      msg: 'Delete this product? This cannot be undone.',
      onOk: async () => {
        try {
          const { error } = await supabase.from('products').delete().eq('id', id);
          if (error) throw error;
          showToast('Product deleted');
        } catch (error) {
          showToast('Failed to delete product', false);
        }
      },
    });
  }

  return (
    <div>
      {/* Header row */}
      <div className="adm-section-hdr">
        <h2 className="adm-section-title">Product Management</h2>
        <button className="adm-btn adm-btn--green" onClick={openAdd}>+ Add Product</button>
      </div>

      {/* Table */}
      <div className="adm-table-wrap">
        <table className="adm-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Origin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const cat = categories.find((c) => c.name === p.category);
              return (
                <tr key={p.id}>
                  <td style={{ fontSize: 24 }}>
                    {p.image ? (
                      <img src={p.image} alt="product" style={{ width: 40, height: 40, objectFit: 'cover', borderRadius: 6 }} />
                    ) : (
                      '📷'
                    )}
                  </td>
                  <td className="adm-table__name">{p.name}</td>
                  <td>
                    <span
                      className="adm-badge"
                      style={{ background: cat?.bg || '#e8f8ee', color: cat?.color || '#1a6b3a' }}
                    >
                      {p.category}
                    </span>
                  </td>
                  <td className="adm-table__price">{p.price}</td>
                  <td className="adm-table__muted">{p.origin}</td>
                  <td>
                    <div className="adm-action-btns">
                      <button className="adm-btn adm-btn--edit" onClick={() => openEdit(p)}>✏️ Edit</button>
                      <button className="adm-btn adm-btn--red"  onClick={() => askDelete(p.id)}>🗑️ Delete</button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {products.length === 0 && (
          <div className="adm-empty">No products yet. Click "+ Add Product" to get started.</div>
        )}
      </div>

      {/* ── ADD / EDIT MODAL ─────────────────────────── */}
      {modal !== null && (
        <div className="adm-modal-bg" onClick={() => setModal(null)}>
          <div className="adm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal__hdr">
              <span className="adm-modal__title">{modal === 'add' ? 'Add New Product' : 'Edit Product'}</span>
              <button className="adm-modal__close" onClick={() => setModal(null)}>×</button>
            </div>
            <div className="adm-modal__body">
              {/* Row 1: image upload + name */}
              <div className="adm-field" style={{ marginBottom: 18 }}>
                <label className="adm-label">Product Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="adm-input"
                  disabled={uploading}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setImageFile(file);
                      const preview = URL.createObjectURL(file);
                      setImagePreview(preview);
                    }
                  }}
                />
              </div>
              
              <div className="adm-row">
                <div className="adm-field">
                  <label className="adm-label">Product Name *</label>
                  <input className="adm-input" placeholder="e.g. Organic Rice" value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
                </div>
              </div>

              {/* Row 2: price + category */}
              <div className="adm-row">
                <div className="adm-field">
                  <label className="adm-label">Price *</label>
                  <input className="adm-input" placeholder="e.g. ₹80/kg" value={form.price}
                    onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))} />
                </div>
                <div className="adm-field">
                  <label className="adm-label">Category</label>
                  <select className="adm-input" value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
                    {categories.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              {/* Row 3: origin + weight */}
              <div className="adm-row">
                <div className="adm-field">
                  <label className="adm-label">Origin</label>
                  <input className="adm-input" placeholder="e.g. Guntur, AP" value={form.origin}
                    onChange={(e) => setForm((f) => ({ ...f, origin: e.target.value }))} />
                </div>
                <div className="adm-field">
                  <label className="adm-label">Weight / Pack Sizes</label>
                  <input className="adm-input" placeholder="e.g. 250g, 500g, 1kg" value={form.weight}
                    onChange={(e) => setForm((f) => ({ ...f, weight: e.target.value }))} />
                </div>
              </div>

              {/* Description */}
              <div className="adm-field" style={{ marginBottom: 18 }}>
                <label className="adm-label">Description</label>
                <textarea className="adm-input adm-textarea" rows={3} placeholder="Product description..."
                  value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} />
              </div>

              {/* Benefits */}
              <div className="adm-field" style={{ marginBottom: 20 }}>
                <label className="adm-label">Benefits (comma separated)</label>
                <input className="adm-input" placeholder="e.g. Chemical-free, Rich in nutrients"
                  value={form.benefits} onChange={(e) => setForm((f) => ({ ...f, benefits: e.target.value }))} />
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="adm-field" style={{ marginBottom: 28 }}>
                  <label className="adm-label">Image Preview</label>
                  <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0' }}>
                    <img src={imagePreview} alt="preview" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8 }} />
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="adm-modal__actions">
                <button className="adm-btn adm-btn--cancel" onClick={() => setModal(null)} disabled={uploading}>Cancel</button>
                <button className="adm-btn adm-btn--green adm-btn--wide" onClick={save} disabled={uploading}>
                  {uploading ? '⏳ Uploading...' : (modal === 'add' ? 'Add Product' : 'Save Changes')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── CONFIRM DELETE ───────────────────────────── */}
      {confirm && (
        <div className="adm-confirm-bg">
          <div className="adm-confirm">
            <p className="adm-confirm__msg">⚠️ {confirm.msg}</p>
            <div className="adm-confirm__actions">
              <button className="adm-btn adm-btn--cancel" onClick={() => setConfirm(null)}>Cancel</button>
              <button className="adm-btn adm-btn--red" onClick={() => { confirm.onOk(); setConfirm(null); }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
