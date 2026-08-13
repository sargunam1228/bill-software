import React from 'react';
import { Flame, Sparkles, Clock, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function AboutSection() {
  const features = [
    {
      icon: <Sparkles size={28} color="#ea580c" />,
      title: 'Fresh Ingredients',
      description: 'We source farm-fresh vegetables, pure ghee, and hand-ground South Indian spices daily for supreme hygiene and unmatched aroma.'
    },
    {
      icon: <Clock size={28} color="#ea580c" />,
      title: 'Quick Service',
      description: 'Hot sizzling food served within minutes! Our stream-lined kitchen and digital billing ensure minimal waiting time for every customer.'
    },
    {
      icon: <HeartHandshake size={28} color="#ea580c" />,
      title: 'Affordable Price',
      description: 'Authentic street-style taste at honest, wallet-friendly prices so everyone can enjoy a rich Tamil Nadu feast every single day.'
    }
  ];

  return (
    <section id="about" style={{ padding: '5rem 0', background: '#ffffff' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 3.5rem' }}>
          <span className="badge badge-hero" style={{ marginBottom: '0.75rem' }}>
            <Flame size={14} /> Authentic Tamil Nadu Heritage
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: '#0f172a', marginBottom: '1rem' }}>
            Welcome to <span style={{ color: '#ea580c' }}>VALLI FOOD STALL</span>
          </h2>
          <p style={{ fontSize: '1.15rem', color: '#475569', lineHeight: 1.7 }}>
            “Valli Food Stall serves fresh, tasty and affordable food with the authentic taste of Tamil Nadu.”
          </p>
        </div>

        {/* 3 Feature Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem'
        }}>
          {features.map((feat, idx) => (
            <div 
              key={idx}
              style={{
                background: '#fffbf5',
                borderRadius: '20px',
                padding: '2rem',
                border: '1px solid #fed7aa',
                boxShadow: '0 4px 16px rgba(15,23,42,0.04)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              className="about-card-hover"
            >
              <div style={{
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                background: '#ffedd5',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                {feat.icon}
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.6rem' }}>
                {feat.title}
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: 1.6 }}>
                {feat.description}
              </p>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        .about-card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 16px 32px rgba(234, 88, 12, 0.12) !important;
        }
      `}</style>
    </section>
  );
}
