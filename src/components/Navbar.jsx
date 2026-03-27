import React from 'react';
import logo from '../assets/diava-logo.png';
import './Navbar.css';

// activePage  : current page string e.g. "Home"
// setActivePage : setter to navigate between pages
// setActiveCategory : reset category filter when navigating
const NAV_ITEMS = ['Home', 'About Us', 'Products', 'Contact'];

export default function Navbar({ activePage, setActivePage, setActiveCategory }) {
  function navigate(item) {
    setActivePage(item);
    setActiveCategory('All');
  }

  return (
    <nav className="navbar">
      {/* Logo — click to go home */}
      <img
        src={logo}
        alt="Diava Logo"
        className="navbar__logo"
        onClick={() => navigate('Home')}
      />

      {/* Nav links */}
      <div className="navbar__links">
        {NAV_ITEMS.map((item) => (
          <button
            key={item}
            className={`navbar__link ${activePage === item ? 'navbar__link--active' : ''}`}
            onClick={() => navigate(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </nav>
  );
}
