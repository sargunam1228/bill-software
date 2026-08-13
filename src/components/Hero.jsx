import React from 'react';
import { Utensils, Receipt, Sparkles, Clock, Award, Flame, CheckCircle2, ChevronRight } from 'lucide-react';
import Valli3DLogo from './Valli3DLogo';

export default function Hero({ onStartBilling, onHistory, onTotal }) {
  return (
    <section 
      id="home" 
      style={{
        position: 'relative',
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(1rem, 2vh, 2.5rem) 0',
        overflow: 'hidden',
        background: 'radial-gradient(circle at 80% 20%, rgba(254, 215, 170, 0.4) 0%, rgba(255, 251, 245, 1) 60%)'
      }}
    >
      {/* Background Decorative Circles */}
      <div style={{
        position: 'absolute',
        top: '-80px',
        right: '-80px',
        width: '380px',
        height: '380px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.15), rgba(234, 179, 8, 0.15))',
        filter: 'blur(50px)',
        zIndex: 0
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          alignItems: 'center'
        }}>

          {/* Hero Content Left */}
          <div>
            {/* Tagline Pill Badge */}
            <div 
              className="badge badge-hero animate-slide-up"
              style={{
                marginBottom: '1.25rem',
                fontSize: '0.85rem',
                padding: '0.45rem 1rem',
                letterSpacing: '0.04em'
              }}
            >
              <Flame size={16} color="#ea580c" />
              <span>Namma Ooru Taste • Fresh • Fast • Friendly</span>
            </div>

            {/* Main Headline */}
            <h1 
              className="hero-title"
              style={{
                fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: '-0.03em',
                color: '#0f172a',
                marginBottom: '1.25rem'
              }}
            >
              Authentic Madurai Street Food at <br />
              <span style={{
                background: 'linear-gradient(135deg, #ea580c 0%, #dc2626 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}>
                VALLI FOOD STALL
              </span>
            </h1>

            {/* Sub-description */}
            <p style={{
              fontSize: '1.05rem',
              color: '#475569',
              lineHeight: 1.6,
              marginBottom: '2rem',
              maxWidth: '520px'
            }}>
              Savor hot, mouthwatering Tamil Nadu street delicacies cooked with ground spices, pure ghee, and traditional recipes. Paired with a lightning-fast digital POS billing system!
            </p>

            {/* CTA Buttons */}
            <div className="hero-buttons-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
              <button 
                onClick={onStartBilling}
                className="btn btn-primary animate-glow"
                style={{ padding: '0.9rem 2rem', fontSize: '1.05rem', borderRadius: '14px' }}
              >
                <span>🧾</span>
                <span>Start Billing</span>
                <ChevronRight size={18} />
              </button>

              <button 
                onClick={onHistory}
                className="btn btn-secondary"
                style={{ padding: '0.9rem 1.8rem', fontSize: '1.05rem', borderRadius: '14px' }}
              >
                <span>📋</span>
                <span>History</span>
              </button>

              <button 
                onClick={onTotal}
                className="btn btn-secondary"
                style={{ padding: '0.9rem 1.8rem', fontSize: '1.05rem', borderRadius: '14px' }}
              >
                <span>📊</span>
                <span>Total</span>
              </button>
            </div>

            {/* Animated Highlight Feature Badges */}
            <div className="hero-badges-wrapper" style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', paddingTop: '1rem', borderTop: '1px solid #fed7aa' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a' }}>
                  <CheckCircle2 size={18} />
                </div>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#334155' }}>Freshly Prepared</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#ffedd5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ea580c' }}>
                  <Clock size={18} />
                </div>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#334155' }}>Fast Service</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#fef9c3', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ca8a04' }}>
                  <Award size={18} />
                </div>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#334155' }}>Best Local Taste</span>
              </div>
            </div>

          </div>

          {/* Hero Visual Right - Centered Standalone 3D Logo */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', minHeight: '360px' }}>
            <Valli3DLogo />
          </div>

        </div>
      </div>
    </section>
  );
}
