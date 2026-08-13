import React from 'react';
import { Banknote, QrCode, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import { SHOP_INFO } from '../data/menuData';

export default function PaymentSection({ paymentMethod, setPaymentMethod, grandTotal, isPaid, setIsPaid }) {
  return (
    <div style={{
      background: '#ffffff',
      borderRadius: '20px',
      padding: '1.5rem',
      border: '1px solid #fed7aa',
      boxShadow: '0 4px 16px rgba(15,23,42,0.04)',
      marginBottom: '1.5rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid #ffedd5', paddingBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Banknote size={20} color="#ea580c" />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
            Payment Selection
          </h3>
        </div>
        <span style={{ fontSize: '0.85rem', color: '#16a34a', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
          <ShieldCheck size={16} /> Secure POS Checkout
        </span>
      </div>

      {/* Payment Options Selector */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <button
          type="button"
          onClick={() => { setPaymentMethod('Cash'); setIsPaid(false); }}
          style={{
            padding: '0.85rem',
            borderRadius: '14px',
            border: paymentMethod === 'Cash' ? '2px solid #ea580c' : '1px solid #cbd5e1',
            background: paymentMethod === 'Cash' ? '#fff7ed' : '#ffffff',
            color: paymentMethod === 'Cash' ? '#ea580c' : '#475569',
            fontWeight: 700,
            fontSize: '1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.6rem',
            boxShadow: paymentMethod === 'Cash' ? '0 4px 12px rgba(234,88,12,0.15)' : 'none',
            transition: 'all 0.2s ease'
          }}
        >
          <Banknote size={22} />
          <span>Cash Payment</span>
        </button>

        <button
          type="button"
          onClick={() => setPaymentMethod('UPI')}
          style={{
            padding: '0.85rem',
            borderRadius: '14px',
            border: paymentMethod === 'UPI' ? '2px solid #ea580c' : '1px solid #cbd5e1',
            background: paymentMethod === 'UPI' ? '#fff7ed' : '#ffffff',
            color: paymentMethod === 'UPI' ? '#ea580c' : '#475569',
            fontWeight: 700,
            fontSize: '1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.6rem',
            boxShadow: paymentMethod === 'UPI' ? '0 4px 12px rgba(234,88,12,0.15)' : 'none',
            transition: 'all 0.2s ease'
          }}
        >
          <QrCode size={22} />
          <span>UPI / GPay / PhonePe</span>
        </button>
      </div>

      {/* UPI Detailed Card */}
      {paymentMethod === 'UPI' ? (
        <div style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          color: '#ffffff',
          borderRadius: '16px',
          padding: '1.25rem',
          textAlign: 'center',
          boxShadow: '0 8px 24px rgba(15,23,42,0.2)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <QrCode size={24} color="#ea580c" />
            <h4 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700 }}>Scan & Pay via any UPI App</h4>
          </div>

          {/* QR Code Visual Box */}
          <div style={{
            background: '#ffffff',
            padding: '1rem',
            borderRadius: '12px',
            display: 'inline-block',
            marginBottom: '0.85rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
          }}>
            {/* SVG QR Code Graphic */}
            <svg width="120" height="120" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="100" height="100" fill="white"/>
              {/* Outer corners */}
              <rect x="10" y="10" width="30" height="30" fill="#0f172a"/>
              <rect x="15" y="15" width="20" height="20" fill="white"/>
              <rect x="20" y="20" width="10" height="10" fill="#ea580c"/>
              
              <rect x="60" y="10" width="30" height="30" fill="#0f172a"/>
              <rect x="65" y="15" width="20" height="20" fill="white"/>
              <rect x="70" y="20" width="10" height="10" fill="#ea580c"/>

              <rect x="10" y="60" width="30" height="30" fill="#0f172a"/>
              <rect x="15" y="65" width="20" height="20" fill="white"/>
              <rect x="20" y="70" width="10" height="10" fill="#ea580c"/>
              {/* Data modules */}
              <rect x="45" y="10" width="8" height="8" fill="#0f172a"/>
              <rect x="45" y="25" width="8" height="8" fill="#ea580c"/>
              <rect x="10" y="45" width="8" height="8" fill="#0f172a"/>
              <rect x="25" y="45" width="10" height="10" fill="#ea580c"/>
              <rect x="45" y="45" width="12" height="12" fill="#0f172a"/>
              <rect x="65" y="45" width="8" height="8" fill="#0f172a"/>
              <rect x="80" y="45" width="8" height="8" fill="#ea580c"/>
              <rect x="45" y="65" width="10" height="10" fill="#ea580c"/>
              <rect x="60" y="60" width="12" height="12" fill="#0f172a"/>
              <rect x="75" y="75" width="15" height="15" fill="#ea580c"/>
            </svg>
          </div>

          <div style={{ fontSize: '0.88rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
            UPI ID: <strong style={{ color: '#fed7aa' }}>{SHOP_INFO.upiId}</strong>
          </div>

          <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#22c55e', marginBottom: '1rem' }}>
            Amount to Pay: ₹{grandTotal}
          </div>

          <button
            type="button"
            onClick={() => setIsPaid(true)}
            className={`btn ${isPaid ? 'btn-success' : 'btn-primary'}`}
            style={{ width: '100%', padding: '0.75rem', fontSize: '0.95rem' }}
          >
            <CheckCircle2 size={18} />
            <span>{isPaid ? 'Payment Confirmed ✓' : 'Mark Payment Completed'}</span>
          </button>
        </div>
      ) : (
        /* Cash Payment Info */
        <div style={{
          background: '#f8fafc',
          border: '1.5px dashed #cbd5e1',
          borderRadius: '14px',
          padding: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>CASH COLLECT</span>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
              ₹{grandTotal}
            </div>
          </div>
          <span className="badge" style={{ background: '#dcfce7', color: '#15803d' }}>
            Collect at Counter
          </span>
        </div>
      )}
    </div>
  );
}
