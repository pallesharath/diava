import React, { useState, useEffect } from 'react';
import './HomePage.css';

// Props:
//   products      – live product array from App state
//   categories    – live category array
//   ads           – live ads array
//   categoryMeta  – { [name]: {icon, color, bg} } lookup map
//   setActivePage – navigate to another page
//   setSelectedProduct – open product modal

export default function HomePage({
  products,
  ads,
  categoryMeta,
  setActivePage,
  setSelectedProduct,
}) {
  const [adIndex, setAdIndex]   = useState(0);
  const [adVisible, setAdVisible] = useState(true);

  // Rotate ads automatically every 3.4 s
  useEffect(() => {
    if (ads.length === 0) return;
    const timer = setInterval(() => {
      setAdVisible(false);
      setTimeout(() => {
        setAdIndex((i) => (i + 1) % ads.length);
        setAdVisible(true);
      }, 400);
    }, 3400);
    return () => clearInterval(timer);
  }, [ads.length]);

  // Reset when number of ads changes
  useEffect(() => { setAdIndex(0); setAdVisible(true); }, [ads.length]);

  const currentAd = ads[adIndex] || { icon: '🌿', title: 'Diava', desc: 'Farm fresh produce' };
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="home">

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="hero">
        {/* Left: text + CTA */}
        <div className="hero__left">
          <div className="hero__tag">🌿 Farm to Table</div>
          <h1 className="hero__title">
            Dia<span>va</span>
          </h1>
          <p className="hero__sub">
            Connecting the heart of Andhra Pradesh's farming communities
            directly to your home. Fresh, organic &amp; authentic produce
            grown with generations of wisdom.
          </p>
          <div className="hero__btns">
            <button className="btn-primary" onClick={() => setActivePage('Products')}>
              Explore Products
            </button>
            <button className="btn-outline" onClick={() => setActivePage('About Us')}>
              Our Story
            </button>
          </div>
        </div>

        {/* Right: animated ad board */}
        <div className="hero__right">
          <div className="hero__scene">
            {ads.length > 0 && (
              <div className="ad-board-wrap">
                <div className="ad-board-outer">
                  <div className={`ad-board-inner ${adVisible ? 'ad-board-inner--shown' : 'ad-board-inner--hidden'}`}>
                    <div className="ad-icon">{currentAd.icon}</div>
                    <div className="ad-divider" />
                    <div className="ad-title">{currentAd.title}</div>
                    <div className="ad-desc">{currentAd.desc}</div>
                    {ads.length > 1 && (
                      <div className="ad-dots">
                        {ads.map((_, i) => (
                          <button
                            key={i}
                            className={`ad-dot ${i === adIndex ? 'ad-dot--on' : ''}`}
                            onClick={() => {
                              setAdVisible(false);
                              setTimeout(() => { setAdIndex(i); setAdVisible(true); }, 350);
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ────────────────────────────── */}
      <section className="home-products">
        <div className="home-products__header">
          <span className="section-tag">Our Harvest</span>
          <h2 className="home-products__title">
            Fresh <span>Products</span>
          </h2>
          <p className="home-products__sub">
            Directly sourced from Andhra Pradesh's finest farming communities
          </p>
        </div>

        <div className="home-products__grid">
          {featuredProducts.map((p) => {
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
                  <button className="prod-card-btn" onClick={() => setSelectedProduct(p)}>
                    View Details →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {products.length > 6 && (
          <div className="home-products__cta">
            <button className="btn-primary" onClick={() => setActivePage('Products')}>
              View All Products →
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
