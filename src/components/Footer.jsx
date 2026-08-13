import React from 'react';
import { Flame, Heart, Phone, MapPin, Shield } from 'lucide-react';
import { SHOP_INFO } from '../data/menuData';

export default function Footer({ onNavigate }) {
  return (
    <footer style={{
      background: '#0f172a',
      color: '#cbd5e1',
      padding: '4rem 0 2rem',
      borderTop: '4px solid #ea580c'
    }}>
      <div className="container">
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3rem'
        }}>
          
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1rem' }}>
              <div style={{
                width: '38px',
                height: '38px',
                borderRadius: '10px',
                background: '#ea580c',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff'
              }}>
                <Flame size={22} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                VALLI <span style={{ color: '#ea580c' }}>FOOD STALL</span>
              </h3>
            </div>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8', lineHeight: 1.6, marginBottom: '1.25rem' }}>
              Serving authentic, delicious, and fresh Tamil Nadu street food delicacies with speed and hospitality.
            </p>
            <span style={{ fontSize: '0.8rem', color: '#ea580c', fontWeight: 700, letterSpacing: '0.04em' }}>
              {SHOP_INFO.tagline}
            </span>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 700, marginBottom: '1rem' }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.9rem' }}>
              {['home', 'menu', 'billing', 'about', 'contact'].map((sec) => (
                <li key={sec}>
                  <button 
                    onClick={() => onNavigate(sec)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#94a3b8',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      textAlign: 'left',
                      textTransform: 'capitalize',
                      transition: 'color 0.2s ease'
                    }}
                  >
                    • {sec === 'billing' ? 'POS Billing System' : sec}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 700, marginBottom: '1rem' }}>
              Opening Hours
            </h4>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8', margin: '4px 0' }}>Monday - Sunday</p>
            <p style={{ fontSize: '1rem', fontWeight: 800, color: '#22c55e', margin: '4px 0' }}>7:00 AM - 11:00 PM</p>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.5rem' }}>Non-stop hot food service daily!</p>
          </div>

          {/* Stall Contact */}
          <div>
            <h4 style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 700, marginBottom: '1rem' }}>
              Stall Contact
            </h4>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.4rem', margin: '4px 0' }}>
              <Phone size={16} color="#ea580c" /> {SHOP_INFO.phone}
            </p>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.4rem', margin: '4px 0' }}>
              <MapPin size={16} color="#ea580c" /> {SHOP_INFO.address}
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid #1e293b',
          paddingTop: '1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.85rem',
          color: '#64748b'
        }}>
          <div>
            © {new Date().getFullYear()} VALLI FOOD STALL. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            <span>Crafted with</span>
            <Heart size={14} fill="#dc2626" color="#dc2626" />
            <span>for Tamil Nadu Street Food Lovers</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
