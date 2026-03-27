import React from 'react';
import './ContactPage.css';

const CONTACT_ITEMS = [
  { icon: '📞', label: 'Mobile',  value: '9390058763',          href: 'tel:9390058763' },
  { icon: '✉️', label: 'Email',   value: 'diava.india@gmail.com', href: 'mailto:diava.india@gmail.com' },
  { icon: '📍', label: 'Address', value: ' Hayathnagar,K.V. Rangareddy District,Telangana - 501505 India', href: null },
];

export default function ContactPage() {
  return (
    <div className="contact-page">
      <span className="section-tag">Get in Touch</span>

      <h1 className="contact-page__title">
        Contact <span>Us</span>
      </h1>

      <div className="contact-list">
        {CONTACT_ITEMS.map(({ icon, label, value, href }) => (
          <div key={label} className="contact-card">
            <span className="contact-card__icon">{icon}</span>
            <div>
              <div className="contact-card__label">{label}</div>
              {href ? (
                <a href={href} className="contact-card__value contact-card__value--link">
                  {value}
                </a>
              ) : (
                <div className="contact-card__value">{value}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
