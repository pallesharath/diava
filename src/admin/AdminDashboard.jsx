import React, { useState } from 'react';
import logo from '../assets/diava-logo.png';
import AdminProducts   from './AdminProducts';
import AdminCategories from './AdminCategories';
import AdminAds        from './AdminAds';
import './AdminDashboard.css';

// Props passed down from App:
//   products, setProducts
//   categories, setCategories
//   ads, setAds
//   onExit – called to leave admin and go back to website

const TABS = [
  { key: 'products',   label: '🛒 Products'  },
  { key: 'categories', label: '📂 Categories' },
  { key: 'ads',        label: '📢 Ads'        },
];

export default function AdminDashboard({
  products,   setProducts,
  categories, setCategories,
  ads,        setAds,
  onExit,
}) {
  const [activeTab, setActiveTab] = useState('products');
  const [toast, setToast]         = useState(null);

  function showToast(msg, ok = true) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 2600);
  }

  const counts = {
    products:   products.length,
    categories: categories.length,
    ads:        ads.length,
  };

  return (
    <div className="admin-dash">

      {/* ── TOP BAR ──────────────────────────────────── */}
      <header className="admin-dash__topbar">
        <div className="admin-dash__brand">
          <img src={logo} alt="Diava" className="admin-dash__logo" />
          <span className="admin-dash__brand-label">ADMIN DASHBOARD</span>
        </div>
        <div className="admin-dash__topbar-right">
          <span className="admin-dash__user">Logged in as Admin</span>
          <button className="admin-dash__exit-btn" onClick={onExit}>
            ← Exit to Website
          </button>
        </div>
      </header>

      {/* ── TABS ─────────────────────────────────────── */}
      <nav className="admin-dash__tabs">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`admin-dash__tab ${activeTab === t.key ? 'admin-dash__tab--active' : ''}`}
            onClick={() => setActiveTab(t.key)}
          >
            {t.label}
            <span className={`admin-dash__tab-count ${activeTab === t.key ? 'admin-dash__tab-count--active' : ''}`}>
              {counts[t.key]}
            </span>
          </button>
        ))}
      </nav>

      {/* ── CONTENT ──────────────────────────────────── */}
      <main className="admin-dash__content">
        {activeTab === 'products' && (
          <AdminProducts
            products={products}     setProducts={setProducts}
            categories={categories}
            showToast={showToast}
          />
        )}
        {activeTab === 'categories' && (
          <AdminCategories
            categories={categories} setCategories={setCategories}
            products={products}     setProducts={setProducts}
            showToast={showToast}
          />
        )}
        {activeTab === 'ads' && (
          <AdminAds
            ads={ads} setAds={setAds}
            showToast={showToast}
          />
        )}
      </main>

      {/* ── TOAST NOTIFICATION ───────────────────────── */}
      {toast && (
        <div className={`admin-toast ${toast.ok ? 'admin-toast--ok' : 'admin-toast--err'}`}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}
