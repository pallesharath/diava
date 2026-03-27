import React from 'react';
import './ProductsPage.css';

// Props:
//   products        – live product list
//   categories      – live category list
//   categoryMeta    – {[name]: {icon,color,bg}} map
//   activeCategory  – currently selected filter
//   setActiveCategory
//   setSelectedProduct – open modal

export default function ProductsPage({
  products,
  categories,
  categoryMeta,
  activeCategory,
  setActiveCategory,
  setSelectedProduct,
}) {
  const allCats = ['All', ...categories.map((c) => c.name)];

  const filtered =
    activeCategory === 'All'
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="products-page">

      {/* ── SIDEBAR ────────────────────────────────────── */}
      <aside className="cat-sidebar">
        <div className="cat-sidebar__title">📂 Categories</div>

        {allCats.map((cat) => {
          const meta = categoryMeta[cat] || { icon: '🏪' };
          const count =
            cat === 'All'
              ? products.length
              : products.filter((p) => p.category === cat).length;

          return (
            <button
              key={cat}
              className={`cat-btn ${activeCategory === cat ? 'cat-btn--active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              <span className="cat-btn__icon">{meta.icon}</span>
              {cat}
              <span className="cat-btn__count">{count}</span>
            </button>
          );
        })}
      </aside>

      {/* ── MAIN GRID ──────────────────────────────────── */}
      <main className="prod-main">
        {/* Breadcrumb */}
        <div className="prod-breadcrumb">
          Home › Products {activeCategory !== 'All' ? `› ${activeCategory}` : ''}
        </div>

        {/* Page heading */}
        <h1 className="prod-page-title">
          {activeCategory === 'All' ? (
            <>All <span>Products</span></>
          ) : (
            <span>{activeCategory}</span>
          )}
        </h1>
        <p className="prod-page-sub">
          Showing {filtered.length} product{filtered.length !== 1 ? 's' : ''}
          {activeCategory !== 'All' ? ` in "${activeCategory}"` : ''}
        </p>

        {/* Empty state */}
        {filtered.length === 0 ? (
          <div className="empty-state">
            <div>🌿</div>
            <p>No products in this category yet.</p>
          </div>
        ) : (
          <div className="prod-grid">
            {filtered.map((p) => {
              const meta = categoryMeta[p.category] || { color: '#1a6b3a', bg: '#e8f8ee' };
              return (
                <div key={p.id} className="prod-card">
                  <div
                    className="prod-card-img"
                    style={{ background: `linear-gradient(135deg, ${meta.bg}, #fff)` }}
                  >
                    {p.image ? (
                      <img 
                        src={p.image}
                        alt={p.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <span>{p.emoji}</span>
                    )}
                    <span
                      className="prod-card-badge"
                      style={{ background: meta.color, color: '#fff' }}
                    >
                      {p.category}
                    </span>
                  </div>
                  <div className="prod-card-body">
                    <div className="prod-card-name">{p.name}</div>
                    <div className="prod-card-origin">📍 {p.origin}</div>
                    <div className="prod-card-price">{p.price}</div>
                    <button
                      className="prod-card-btn"
                      onClick={() => setSelectedProduct(p)}
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
