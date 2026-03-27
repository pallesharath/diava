import React, { useState } from 'react';
import logo from '../assets/diava-logo.png';
import { ADMIN_PASSWORD } from './adminConfig';
import './AdminLogin.css';

// onLogin() – called when password is correct
export default function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');

  function handleSubmit() {
    if (password === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  }

  return (
    <div className="admin-login">
      <div className="admin-login__card">
        {/* Logo */}
        <img src={logo} alt="Diava" className="admin-login__logo" />

        <h2 className="admin-login__title">Admin Dashboard</h2>
        <p className="admin-login__sub">Enter your admin password to continue</p>

        {/* Password field */}
        <div className="admin-login__field">
          <label className="admin-login__label">Password</label>
          <input
            type="password"
            className={`admin-login__input ${error ? 'admin-login__input--error' : ''}`}
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(''); }}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
          {error && <p className="admin-login__error">{error}</p>}
        </div>

        <button className="admin-login__btn" onClick={handleSubmit}>
          Login →
        </button>

        <p className="admin-login__note">🔒 Secure admin access only</p>
      </div>
    </div>
  );
}
