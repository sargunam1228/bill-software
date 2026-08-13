import React from 'react';
import { Check, ArrowLeft, X, CheckCircle2, Flame } from 'lucide-react';
import { SHOP_INFO } from '../data/menuData';

export default function ReceiptModal({ bill, onClose, onDone }) {
  if (!bill) return null;

  return (
    <div 
      className="receipt-no-print"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 2000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        animation: 'fadeIn 0.25s ease-out'
      }}
    >
      <div 
        style={{
          background: '#ffffff',
          borderRadius: '24px',
          maxWidth: '480px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0,0,0,0.3)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Modal Action Header (Screen only) */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: '#fffbf5',
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle2 size={22} color="#16a34a" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
              Bill Generated Successfully
            </h3>
          </div>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
          >
            <X size={24} />
          </button>
        </div>

        {/* PRINTABLE THERMAL RECEIPT CONTAINER */}
        <div 
          id="thermal-receipt" 
          style={{
            padding: '1.75rem',
            background: '#ffffff',
            color: '#0f172a',
            fontFamily: "'Courier New', Courier, monospace"
          }}
        >
          {/* Receipt Header */}
          <div style={{ textAlign: 'center', marginBottom: '1.25rem', borderBottom: '1px dashed #000', paddingBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '4px' }}>
              <Flame size={20} color="#ea580c" />
              <h2 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#000', margin: 0 }}>
                {SHOP_INFO.name}
              </h2>
            </div>
            <p style={{ fontSize: '0.78rem', fontWeight: 700, margin: '2px 0' }}>
              {SHOP_INFO.tagline}
            </p>
            <p style={{ fontSize: '0.72rem', margin: '2px 0' }}>
              {SHOP_INFO.address}
            </p>
            <p style={{ fontSize: '0.72rem', margin: '2px 0' }}>
              Ph: {SHOP_INFO.phone} | GST: {SHOP_INFO.gstin}
            </p>
          </div>

          {/* Bill Meta Data */}
          <div style={{ fontSize: '0.82rem', marginBottom: '1rem', borderBottom: '1px dashed #000', paddingBottom: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Invoice No: <strong>{bill.billNo}</strong></span>
              <span>Date: {bill.date}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3px' }}>
              <span>Time: {bill.time}</span>
              <span>Payment: <strong>{bill.paymentMethod}</strong></span>
            </div>
          </div>

          {/* Itemized Table */}
          <table style={{ width: '100%', fontSize: '0.82rem', borderCollapse: 'collapse', marginBottom: '1rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #000', textAlign: 'left' }}>
                <th style={{ paddingBottom: '4px' }}>Item</th>
                <th style={{ paddingBottom: '4px', textAlign: 'center' }}>Qty</th>
                <th style={{ paddingBottom: '4px', textAlign: 'right' }}>Price</th>
                <th style={{ paddingBottom: '4px', textAlign: 'right' }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {bill.items.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: '1px dotted #e2e8f0' }}>
                  <td style={{ padding: '6px 0', fontWeight: 600 }}>{item.name}</td>
                  <td style={{ padding: '6px 0', textAlign: 'center' }}>{item.quantity}</td>
                  <td style={{ padding: '6px 0', textAlign: 'right' }}>₹{item.price}</td>
                  <td style={{ padding: '6px 0', textAlign: 'right', fontWeight: 700 }}>₹{item.price * item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Amount Calculation Summary */}
          <div style={{ borderTop: '1px dashed #000', paddingTop: '0.75rem', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
              <span>Subtotal:</span>
              <span>₹{bill.subtotal.toFixed(2)}</span>
            </div>
            {bill.discount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px', color: '#dc2626' }}>
                <span>Discount ({bill.discountType === 'percent' ? `${bill.discountValue}%` : 'Flat'}):</span>
                <span>-₹{bill.discount.toFixed(2)}</span>
              </div>
            )}

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              borderTop: '2px solid #000',
              borderBottom: '2px solid #000',
              padding: '6px 0',
              fontSize: '1.1rem',
              fontWeight: 900
            }}>
              <span>GRAND TOTAL:</span>
              <span>₹{bill.grandTotal.toFixed(2)}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '0.8rem', fontWeight: 700 }}>
              <span>Payment Status:</span>
              <span>PAID ({bill.paymentMethod})</span>
            </div>
          </div>

          {/* Footer Receipt Note */}
          <div style={{ textAlign: 'center', fontSize: '0.75rem', borderTop: '1px dashed #000', paddingTop: '0.75rem' }}>
            <p style={{ margin: '2px 0', fontWeight: 700 }}>Thank you for visiting Valli Food Stall!</p>
            <p style={{ margin: '2px 0', fontStyle: 'italic' }}>Visit again for authentic Madurai taste!</p>
          </div>
        </div>

        {/* Modal Buttons (Screen Action Bar) */}
        <div style={{
          padding: '1.25rem 1.5rem',
          borderTop: '1px solid #e2e8f0',
          background: '#fffbf5',
          display: 'flex',
          gap: '0.75rem',
          borderBottomLeftRadius: '24px',
          borderBottomRightRadius: '24px'
        }}>
          <button 
            onClick={onDone}
            className="btn btn-primary"
            style={{ flex: 1, padding: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
          >
            <Check size={18} />
            <span>Done</span>
          </button>

          <button 
            onClick={onClose}
            className="btn btn-secondary"
            style={{ flex: 1, padding: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}
