import React from 'react';
import './ProductModal.css';

// Shows full product details in an overlay modal
export default function ProductModal({ product, categoryMeta, onClose }) {
  if (!product) return null;

  const meta = categoryMeta[product.category] || { color: '#1a6b3a' };
  const benefits = Array.isArray(product.benefits) ? product.benefits : [];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>

        {/* Header */}
        <div
          className="modal__header"
          style={{ background: `linear-gradient(135deg, ${meta.color}, #0c3520)` }}
        >
          <span className="modal__emoji">{product.emoji}</span>
          <div>
            <div className="modal__title">{product.name}</div>
            <div className="modal__category-label">{product.category}</div>
          </div>
        </div>

        {/* Product Image */}
        {product.image && (
          <div style={{ width: '100%', height: 250, overflow: 'hidden' }}>
            <img 
              src={product.image} 
              alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        )}

        {/* Body */}
        <div className="modal__body">
          <div className="modal__price">{product.price}</div>
          <p className="modal__desc">{product.description}</p>

          <div className="modal__info-row">
            <div className="modal__info-box">
              <div className="modal__info-label">Weight / Pack</div>
              <div className="modal__info-val">{product.weight}</div>
            </div>
            <div className="modal__info-box">
              <div className="modal__info-label">Origin</div>
              <div className="modal__info-val">{product.origin}</div>
            </div>
          </div>

          <div className="modal__benefits-title">Key Benefits</div>
          <div className="modal__benefits-wrap">
            {benefits.map((b) => (
              <span key={b} className="modal__benefit-chip">✓ {b}</span>
            ))}
          </div>

          <div className="modal__actions">
            <button className="modal__btn-close" onClick={onClose}>
              Close
            </button>

            {/* ❌ Order button removed */}
            {/* <button className="modal__btn-order">🛒 Order Now</button> */}
          </div>
        </div>
      </div>
    </div>
  );
}