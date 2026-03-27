import React from 'react';
import logo from '../assets/diava-logo.png';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      {/* Logo */}
      <img src={logo} alt="Diava" className="footer__logo" />

      <p className="footer__tagline">Supporting farmers of Andhra Pradesh since 2020</p>

      {/* Contact details */}
      <div className="footer__contacts">
        <a href="tel:9390058763" className="footer__contact-link">
          📞 9390058763
        </a>
        <a href="mailto:diava.india@gmail.com" className="footer__contact-link">
          ✉️ diava.india@gmail.com
        </a>
      </div>

      <p className="footer__copy">© 2024 Diava. All Rights Reserved.</p>
    </footer>
  );
}
