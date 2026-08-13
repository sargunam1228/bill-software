import React, { useState, useEffect } from 'react';
import { Flame } from 'lucide-react';

export default function Navbar({ activeSection, setActiveSection }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        transition: 'all 0.3s ease',
        background: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 251, 245, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: isScrolled ? '0 4px 20px rgba(15, 23, 42, 0.08)' : 'none',
        borderBottom: '1px solid rgba(254, 215, 170, 0.4)'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.85rem 1.5rem' }}>
        
        {/* Brand Logo */}
        <div 
          onClick={() => {
            if (setActiveSection) {
              setActiveSection('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}
        >
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #f97316 0%, #dc2626 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: '0 4px 12px rgba(234, 88, 12, 0.3)'
          }}>
            <Flame size={26} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em', margin: 0, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              VALLI <span style={{ color: '#ea580c' }}>FOOD STALL</span>
            </h1>
            <p style={{ fontSize: '0.72rem', color: '#78716c', fontWeight: 600, margin: 0, letterSpacing: '0.02em' }}>
              MADURAI STREET FOOD POS
            </p>
          </div>
        </div>

      </div>
    </header>
  );
}
