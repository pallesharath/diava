import React, { useState } from 'react';
import { nextId } from './adminConfig';
import { supabase } from '../lib/supabaseClient';
import './AdminShared.css';

export default function AdminAds({ ads, setAds, showToast }) {
  const [modal, setModal]     = useState(null);
  const [confirm, setConfirm] = useState(null);

  // ✅ changed icon → image
  const empty = { image: '', title: '', desc: '' };
  const [form, setForm] = useState(empty);

  function openAdd()  { setForm(empty); setModal('add'); }
  function openEdit(a) { setForm({ ...a }); setModal(a); }

  async function save() {
    if (!form.title.trim()) {
      showToast('Ad title is required', false);
      return;
    }

    try {
      if (modal === 'add') {
        const { error } = await supabase.from('ads').insert([{ ...form }]);
        if (error) {
          throw error;
        }
        showToast('Ad added ✓');
      } else {
        const { error } = await supabase
          .from('ads')
          .update({ ...form })
          .eq('id', modal.id);
        if (error) {
          throw error;
        }
        showToast('Ad updated ✓');
      }
      setModal(null);
    } catch (error) {
      showToast('Failed to save ad: ' + (error.message || 'Unknown error'), false);
    }
  }

  async function askDelete(id) {
    setConfirm({
      msg: 'Delete this ad banner? This cannot be undone.',
      onOk: async () => {
        try {
          const { error } = await supabase.from('ads').delete().eq('id', id);
          if (error) throw error;
          showToast('Ad deleted');
        } catch (error) {
          showToast('Failed to delete ad', false);
        }
      },
    });
  }

  return (
    <div>
      <div className="adm-section-hdr">
        <h2 className="adm-section-title">Ad Banners Management</h2>
        <button className="adm-btn adm-btn--green" onClick={openAdd}>
          + Add Ad
        </button>
      </div>

      {/* ── ADS LIST ───────────────────────────────── */}
      <div className="adm-ads-list">
        {ads.map((a) => (
          <div key={a.id} className="adm-ad-card">

            {/* ✅ IMAGE DISPLAY */}
            <div className="adm-ad-card__icon">
              {a.image ? (
                <img
                  src={a.image}
                  alt="ad"
                  style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 8 }}
                />
              ) : (
                '📷'
              )}
            </div>

            <div className="adm-ad-card__info">
              <div className="adm-ad-card__title">{a.title}</div>
              <div className="adm-ad-card__desc">{a.desc}</div>
            </div>

            <div className="adm-action-btns">
              <button className="adm-btn adm-btn--edit" onClick={() => openEdit(a)}>
                ✏️ Edit
              </button>
              <button className="adm-btn adm-btn--red" onClick={() => askDelete(a.id)}>
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}

        {ads.length === 0 && (
          <div className="adm-empty">
            No ads yet. Click "+ Add Ad" to create one.
          </div>
        )}
      </div>

      {/* ── MODAL ───────────────────────────────── */}
      {modal !== null && (
        <div className="adm-modal-bg" onClick={() => setModal(null)}>
          <div className="adm-modal adm-modal--sm" onClick={(e) => e.stopPropagation()}>
            
            <div className="adm-modal__hdr">
              <span className="adm-modal__title">
                {modal === 'add' ? 'Add New Ad' : 'Edit Ad'}
              </span>
              <button className="adm-modal__close" onClick={() => setModal(null)}>×</button>
            </div>

            <div className="adm-modal__body">

              {/* ✅ IMAGE UPLOAD */}
              <div className="adm-field">
                <label className="adm-label">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  className="adm-input"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const imageUrl = URL.createObjectURL(file);
                      setForm((f) => ({ ...f, image: imageUrl }));
                    }
                  }}
                />
              </div>

              <div className="adm-field">
                <label className="adm-label">Ad Title *</label>
                <input
                  className="adm-input"
                  placeholder="e.g. Free Delivery"
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                />
              </div>

              <div className="adm-field" style={{ marginBottom: 20 }}>
                <label className="adm-label">Description</label>
                <textarea
                  className="adm-input adm-textarea"
                  rows={3}
                  placeholder="Ad description..."
                  value={form.desc}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, desc: e.target.value }))
                  }
                />
              </div>

              {/* ✅ PREVIEW */}
              <div className="adm-ad-preview">
                <div className="adm-ad-preview__icon">
                  {form.image ? (
                    <img
                      src={form.image}
                      alt="preview"
                      style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 8 }}
                    />
                  ) : (
                    '📷'
                  )}
                </div>
                <div className="adm-ad-preview__divider" />
                <div className="adm-ad-preview__title">
                  {form.title || 'Ad Title'}
                </div>
                <div className="adm-ad-preview__desc">
                  {form.desc || 'Description appears here'}
                </div>
              </div>

              <div className="adm-modal__actions">
                <button
                  className="adm-btn adm-btn--cancel"
                  onClick={() => setModal(null)}
                >
                  Cancel
                </button>

                <button
                  className="adm-btn adm-btn--green adm-btn--wide"
                  onClick={save}
                >
                  {modal === 'add' ? 'Add Ad' : 'Save Changes'}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ── CONFIRM ─────────────────────────────── */}
      {confirm && (
        <div className="adm-confirm-bg">
          <div className="adm-confirm">
            <p className="adm-confirm__msg">⚠️ {confirm.msg}</p>
            <div className="adm-confirm__actions">
              <button
                className="adm-btn adm-btn--cancel"
                onClick={() => setConfirm(null)}
              >
                Cancel
              </button>
              <button
                className="adm-btn adm-btn--red"
                onClick={() => {
                  confirm.onOk();
                  setConfirm(null);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}