import React from 'react';
import { User, Phone, Utensils, ShoppingBag, Hash } from 'lucide-react';

export default function CustomerForm({ customer, setCustomer }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div style={{
      background: '#ffffff',
      borderRadius: '20px',
      padding: '1.5rem',
      border: '1px solid #fed7aa',
      boxShadow: '0 4px 16px rgba(15,23,42,0.04)',
      marginBottom: '1.5rem'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem', borderBottom: '1px solid #ffedd5', paddingBottom: '0.75rem' }}>
        <User size={20} color="#ea580c" />
        <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
          Customer & Order Info
        </h3>
      </div>

      {/* Order Type Toggle (Dine In vs Take Away) */}
      <div style={{ marginBottom: '1.25rem' }}>
        <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.5rem' }}>
          ORDER TYPE
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <button
            type="button"
            onClick={() => setCustomer(prev => ({ ...prev, orderType: 'Dine In' }))}
            style={{
              padding: '0.75rem',
              borderRadius: '12px',
              border: customer.orderType === 'Dine In' ? '2px solid #ea580c' : '1px solid #cbd5e1',
              background: customer.orderType === 'Dine In' ? '#fff7ed' : '#ffffff',
              color: customer.orderType === 'Dine In' ? '#ea580c' : '#475569',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s ease'
            }}
          >
            <Utensils size={18} />
            <span>Dine In</span>
          </button>

          <button
            type="button"
            onClick={() => setCustomer(prev => ({ ...prev, orderType: 'Take Away' }))}
            style={{
              padding: '0.75rem',
              borderRadius: '12px',
              border: customer.orderType === 'Take Away' ? '2px solid #ea580c' : '1px solid #cbd5e1',
              background: customer.orderType === 'Take Away' ? '#fff7ed' : '#ffffff',
              color: customer.orderType === 'Take Away' ? '#ea580c' : '#475569',
              fontWeight: 700,
              fontSize: '0.95rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              transition: 'all 0.2s ease'
            }}
          >
            <ShoppingBag size={18} />
            <span>Take Away</span>
          </button>
        </div>
      </div>

      {/* Input Fields */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        
        {/* Customer Name */}
        <div>
          <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.35rem' }}>
            CUSTOMER NAME
          </label>
          <div style={{ position: 'relative' }}>
            <User size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text"
              name="name"
              placeholder="e.g. Ramesh Kumar"
              value={customer.name}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.65rem 0.75rem 0.65rem 2.4rem',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                fontSize: '0.95rem',
                outline: 'none',
                background: '#fffbf5'
              }}
            />
          </div>
        </div>

        {/* Contact Phone */}
        <div>
          <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.35rem' }}>
            CONTACT NUMBER
          </label>
          <div style={{ position: 'relative' }}>
            <Phone size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="tel"
              name="phone"
              placeholder="e.g. 9876543210"
              value={customer.phone}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '0.65rem 0.75rem 0.65rem 2.4rem',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                fontSize: '0.95rem',
                outline: 'none',
                background: '#fffbf5'
              }}
            />
          </div>
        </div>

        {/* Table Number (if Dine In) */}
        {customer.orderType === 'Dine In' && (
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.35rem' }}>
              TABLE NUMBER
            </label>
            <div style={{ position: 'relative', maxWidth: '200px' }}>
              <Hash size={18} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="text"
                name="tableNo"
                placeholder="e.g. Table 04"
                value={customer.tableNo || ''}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '0.65rem 0.75rem 0.65rem 2.4rem',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  fontSize: '0.95rem',
                  outline: 'none',
                  background: '#fffbf5'
                }}
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
