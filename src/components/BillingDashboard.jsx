import React from 'react';
import BillingPanel from './BillingPanel';
import { Receipt } from 'lucide-react';

export default function BillingDashboard({
  cart,
  paymentMethod,
  setPaymentMethod,
  isPaid,
  setIsPaid,
  discountValue,
  setDiscountValue,
  discountType,
  setDiscountType,
  onUpdateQuantity,
  onRemoveItem,
  onClearBill,
  onGenerateBill,
  subtotal,
  discountAmount,
  grandTotal,
  onBackToHome
}) {
  return (
    <section 
      id="billing" 
      style={{
        padding: '5rem 0',
        background: 'linear-gradient(180deg, #fffbf5 0%, #fff7ed 100%)',
        borderTop: '1px solid #fed7aa',
        borderBottom: '1px solid #fed7aa'
      }}
    >
      <div className="container">
        
        {/* Section Title */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3rem' }}>
          <span className="badge badge-hero" style={{ marginBottom: '0.75rem' }}>
            <Receipt size={14} /> Smart Digital POS Billing
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
            Digital <span style={{ color: '#ea580c' }}>Billing Dashboard</span>
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#64748b' }}>
            Seamlessly calculate totals, apply discounts, accept UPI payments, and generate instant thermal print receipts.
          </p>
        </div>

        {/* Centered Billing Panel */}
        <div style={{
          maxWidth: '640px',
          margin: '0 auto',
          width: '100%'
        }}>
          <BillingPanel 
            cart={cart}
            onUpdateQuantity={onUpdateQuantity}
            onRemoveItem={onRemoveItem}
            onClearBill={onClearBill}
            onGenerateBill={onGenerateBill}
            discountValue={discountValue}
            setDiscountValue={setDiscountValue}
            discountType={discountType}
            setDiscountType={setDiscountType}
            subtotal={subtotal}
            discountAmount={discountAmount}
            grandTotal={grandTotal}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            isPaid={isPaid}
            setIsPaid={setIsPaid}
          />
        </div>

        {/* Back to Home Button */}
        <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
          <button
            onClick={onBackToHome}
            className="btn btn-secondary"
            style={{
              padding: '0.75rem 1.75rem',
              borderRadius: '50px',
              fontSize: '0.95rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: '0 4px 14px rgba(15, 23, 42, 0.06)'
            }}
          >
            <span>←</span>
            <span>Back to Home</span>
          </button>
        </div>

      </div>
    </section>
  );
}
