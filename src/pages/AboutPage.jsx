import React from 'react';
import './AboutPage.css';

export default function AboutPage() {
  return (
    <div className="about-page">
      <span className="section-tag">Our Story</span>

      <h1 className="about-page__title">
        About <span>Diava</span>
      </h1>

      <p className="about-page__para">
        Diava was founded with a single vision — to bridge the gap between
        hardworking farmers of Andhra Pradesh and consumers who value quality,
        authenticity, and trust. We work directly with over 5,000 farming
        families across Guntur, Kurnool, Anantapur, and the Godavari belt.
      </p>

      <p className="about-page__para">
        Every product you see on Diava has been grown with traditional wisdom,
        harvested at the right time, and delivered without unnecessary
        middlemen. We believe farmers deserve fair prices — and consumers
        deserve honest food.
      </p>

      {/* Stats row */}
      <div className="about-stats">
        {[
          { value: '5000+', label: 'Farming Families' },
          { value: '20+',   label: 'Product Varieties' },
          { value: '2020',  label: 'Founded' },
          { value: '100%',  label: 'Organic Certified' },
        ].map((s) => (
          <div key={s.label} className="about-stat">
            <div className="about-stat__value">{s.value}</div>
            <div className="about-stat__label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
