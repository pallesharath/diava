import React, { useState, useEffect } from 'react';

// Data
import { INIT_PRODUCTS }   from './data/products';
import { INIT_CATEGORIES, ALL_META } from './data/categories';
import { INIT_ADS }        from './data/ads';

// Supabase
import { supabase } from './lib/supabaseClient';

// Website pages & shared components
import Navbar        from './components/Navbar';
import Footer        from './components/Footer';
import ProductModal  from './components/ProductModal';
import HomePage      from './pages/HomePage';
import ProductsPage  from './pages/ProductsPage';
import AboutPage     from './pages/AboutPage';
import ContactPage   from './pages/ContactPage';

// Admin
import AdminLogin     from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';

// ─── APP ───────────────────────────────────────────────
export default function App() {
  // ── Shared live data ──────────────────────────────────
  const [products,   setProducts]   = useState(INIT_PRODUCTS);
  const [categories, setCategories] = useState(INIT_CATEGORIES);
  const [ads,        setAds]        = useState(INIT_ADS);
  const [loading, setLoading] = useState(true);

  // ── Website navigation ────────────────────────────────
  const [activePage,     setActivePage]     = useState('Home');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ── Admin routing (via URL hash) ──────────────────────
  const [route,         setRoute]         = useState(window.location.hash);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  useEffect(() => {
    const handleHashChange = () => setRoute(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // ── Load data from Supabase on mount + Real-time subscriptions ───
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Fetch products
        const { data: productsData } = await supabase.from('products').select('*');
        if (productsData && productsData.length > 0) setProducts(productsData);
        
        // Fetch categories
        const { data: categoriesData } = await supabase.from('categories').select('*');
        if (categoriesData && categoriesData.length > 0) setCategories(categoriesData);
        
        // Fetch ads
        const { data: adsData } = await supabase.from('ads').select('*');
        if (adsData && adsData.length > 0) setAds(adsData);
        
      } catch (error) {
        // Keep using initial data on error
      } finally {
        setLoading(false);
      }
    };

    loadData();

    // Real-time subscriptions
    const productsSubscription = supabase
      .channel('products')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setProducts((prev) => [...prev, payload.new]);
        } else if (payload.eventType === 'UPDATE') {
          setProducts((prev) => prev.map((p) => p.id === payload.new.id ? payload.new : p));
        } else if (payload.eventType === 'DELETE') {
          setProducts((prev) => prev.filter((p) => p.id !== payload.old.id));
        }
      })
      .subscribe();

    const categoriesSubscription = supabase
      .channel('categories')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'categories' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setCategories((prev) => [...prev, payload.new]);
        } else if (payload.eventType === 'UPDATE') {
          setCategories((prev) => prev.map((c) => c.name === payload.new.name ? payload.new : c));
        } else if (payload.eventType === 'DELETE') {
          setCategories((prev) => prev.filter((c) => c.name !== payload.old.name));
        }
      })
      .subscribe();

    const adsSubscription = supabase
      .channel('ads')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'ads' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setAds((prev) => [...prev, payload.new]);
        } else if (payload.eventType === 'UPDATE') {
          setAds((prev) => prev.map((a) => a.id === payload.new.id ? payload.new : a));
        } else if (payload.eventType === 'DELETE') {
          setAds((prev) => prev.filter((a) => a.id !== payload.old.id));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(productsSubscription);
      supabase.removeChannel(categoriesSubscription);
      supabase.removeChannel(adsSubscription);
    };
  }, []);

  // ── Build categoryMeta lookup map ─────────────────────
  // { "All": {...}, "Grains": {...}, ... }
  const categoryMeta = { All: ALL_META };
  categories.forEach((c) => { categoryMeta[c.name] = c; });

  // ─────────────────────────────────────────────────────
  // ADMIN ROUTE  →  yoursite.com/#/admin
  // ─────────────────────────────────────────────────────
  if (route === '#/admin') {
    if (!adminLoggedIn) {
      return <AdminLogin onLogin={() => setAdminLoggedIn(true)} />;
    }
    return (
      <AdminDashboard
        products={products}     setProducts={setProducts}
        categories={categories} setCategories={setCategories}
        ads={ads}               setAds={setAds}
        onExit={() => {
          setAdminLoggedIn(false);
          window.location.hash = '';   // go back to homepage
        }}
      />
    );
  }

  // ─────────────────────────────────────────────────────
  // MAIN WEBSITE
  // ─────────────────────────────────────────────────────
  return (
    <div>
      {/* Sticky Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        setActiveCategory={setActiveCategory}
      />

      {/* Page content */}
      {activePage === 'Home' && (
        <HomePage
          products={products}
          ads={ads}
          categoryMeta={categoryMeta}
          setActivePage={setActivePage}
          setSelectedProduct={setSelectedProduct}
        />
      )}

      {activePage === 'Products' && (
        <ProductsPage
          products={products}
          categories={categories}
          categoryMeta={categoryMeta}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          setSelectedProduct={setSelectedProduct}
        />
      )}

      {activePage === 'About Us' && <AboutPage />}

      {activePage === 'Contact'  && <ContactPage />}

      {/* Product detail modal (shown on top of any page) */}
      <ProductModal
        product={selectedProduct}
        categoryMeta={categoryMeta}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
