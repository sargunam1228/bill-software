import React from 'react';
import { Trash2, Plus, Minus, Receipt, Banknote, Smartphone, CheckCircle } from 'lucide-react';
import { SHOP_INFO } from '../data/menuData';

export default function BillingPanel({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearBill,
  onGenerateBill,
  discountValue,
  setDiscountValue,
  discountType,
  setDiscountType,
  subtotal,
  discountAmount,
  grandTotal,
  paymentMethod,
  setPaymentMethod,
  isPaid,
  setIsPaid
}) {
  const isEmpty = cart.length === 0;

  return (
    <div style={{
      background: '#ffffff',
      borderRadius: '24px',
      padding: '1.5rem',
      border: '1px solid #fed7aa',
      boxShadow: '0 8px 30px rgba(15, 23, 42, 0.08)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: '1rem',
        borderBottom: '1px solid #ffedd5',
        marginBottom: '1.25rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Receipt size={22} color="#ea580c" />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
            Active Bill Summary
          </h3>
        </div>

        {!isEmpty && (
          <button
            onClick={onClearBill}
            style={{
              background: '#fef2f2',
              border: '1px solid #fca5a5',
              color: '#dc2626',
              padding: '0.4rem 0.85rem',
              borderRadius: '10px',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              transition: 'all 0.2s ease'
            }}
            title="Clear current bill"
          >
            <Trash2 size={15} />
            <span>Clear Bill</span>
          </button>
        )}
      </div>

      {/* Cart Items List */}
      <div style={{
        flexGrow: 1,
        overflowY: 'auto',
        maxHeight: '380px',
        paddingRight: '4px',
        marginBottom: '1.25rem'
      }}>
        {!isEmpty ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {cart.map((item) => (
              <div 
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'space-between',
                  gap: '0.85rem',
                  padding: '0.85rem',
                  background: '#fffbf5',
                  borderRadius: '16px',
                  border: '1px solid #ffedd5'
                }}
              >
                {/* Thumbnail & Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: 0 }}>
                  <img 
                    src={item.image} 
                    alt={item.name}
                    style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover' }} 
                  />
                  <div style={{ overflow: 'hidden' }}>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', margin: 0, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                      {item.name}
                    </h4>
                    <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>
                      ₹{item.price} x {item.quantity} = <strong style={{ color: '#ea580c' }}>₹{item.price * item.quantity}</strong>
                    </span>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: '#ffffff',
                    border: '1px solid #fed7aa',
                    borderRadius: '10px',
                    padding: '2px'
                  }}>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#ea580c',
                        cursor: 'pointer',
                        padding: '3px',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={15} />
                    </button>
                    <span style={{ fontWeight: 800, fontSize: '0.9rem', width: '22px', textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#ea580c',
                        cursor: 'pointer',
                        padding: '3px',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                      aria-label="Increase quantity"
                    >
                      <Plus size={15} />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#94a3b8',
                      cursor: 'pointer',
                      padding: '4px'
                    }}
                    title="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Bill Illustration */
          <div style={{
            textAlign: 'center',
            padding: '3rem 1rem',
            background: '#fffbf5',
            borderRadius: '20px',
            border: '2px dashed #fed7aa'
          }}>
            <Receipt size={44} color="#f97316" style={{ opacity: 0.6, marginBottom: '0.75rem' }} />
            <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.35rem' }}>
              Your Bill is Empty
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
              Click <strong>"Add to Bill"</strong> on any food card from the menu above to start generating a customer order bill.
            </p>
          </div>
        )}
      </div>

      {/* Payment Selection, Discount & Calculations */}
      {!isEmpty && (
        <div style={{
          borderTop: '2px dashed #fed7aa',
          paddingTop: '1.25rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem'
        }}>

          {/* Payment Method Section inside Active Bill Summary */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              PAYMENT METHOD
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <button
                type="button"
                onClick={() => { setPaymentMethod('Cash'); setIsPaid(false); }}
                style={{
                  padding: '0.75rem 0.5rem',
                  borderRadius: '12px',
                  border: paymentMethod === 'Cash' ? '2px solid #ea580c' : '1px solid #cbd5e1',
                  background: paymentMethod === 'Cash' ? '#fff7ed' : '#ffffff',
                  color: paymentMethod === 'Cash' ? '#ea580c' : '#475569',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem'
                }}
              >
                <Banknote size={16} />
                <span>Cash Payment</span>
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('UPI')}
                style={{
                  padding: '0.75rem 0.5rem',
                  borderRadius: '12px',
                  border: paymentMethod === 'UPI' ? '2px solid #ea580c' : '1px solid #cbd5e1',
                  background: paymentMethod === 'UPI' ? '#fff7ed' : '#ffffff',
                  color: paymentMethod === 'UPI' ? '#ea580c' : '#475569',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem'
                }}
              >
                <Smartphone size={16} />
                <span>UPI / GPay / PhonePe</span>
              </button>
            </div>

            {paymentMethod === 'UPI' ? (
              <div style={{ background: '#0f172a', color: '#ffffff', borderRadius: '16px', padding: '1.25rem', textAlign: 'center', marginTop: '0.75rem' }}>
                <h4 style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 700, margin: '0 0 0.75rem' }}>Scan & Pay via any UPI App</h4>
                <div style={{ background: '#ffffff', padding: '0.75rem', borderRadius: '12px', display: 'inline-block', marginBottom: '0.75rem' }}>
                  <svg width="90" height="90" viewBox="0 0 100 100" fill="none">
                    <rect width="100" height="100" fill="white"/>
                    <rect x="10" y="10" width="30" height="30" fill="#0f172a"/>
                    <rect x="15" y="15" width="20" height="20" fill="white"/>
                    <rect x="20" y="20" width="10" height="10" fill="#ea580c"/>
                    <rect x="60" y="10" width="30" height="30" fill="#0f172a"/>
                    <rect x="65" y="15" width="20" height="20" fill="white"/>
                    <rect x="70" y="20" width="10" height="10" fill="#ea580c"/>
                    <rect x="10" y="60" width="30" height="30" fill="#0f172a"/>
                    <rect x="15" y="65" width="20" height="20" fill="white"/>
                    <rect x="20" y="70" width="10" height="10" fill="#ea580c"/>
                    <rect x="45" y="45" width="12" height="12" fill="#0f172a"/>
                    <rect x="60" y="60" width="12" height="12" fill="#ea580c"/>
                  </svg>
                </div>
                <div style={{ fontSize: '0.88rem', color: '#cbd5e1', marginBottom: '0.4rem' }}>
                  UPI ID: <strong style={{ color: '#fed7aa' }}>{SHOP_INFO.upiId}</strong>
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#22c55e', marginBottom: '0.85rem' }}>
                  Amount to Pay: ₹{grandTotal.toFixed(2)}
                </div>
                <button
                  type="button"
                  onClick={() => setIsPaid(!isPaid)}
                  className={`btn ${isPaid ? 'btn-success' : 'btn-primary'}`}
                  style={{ width: '100%', padding: '0.65rem' }}
                >
                  {isPaid ? <CheckCircle size={16} /> : null}
                  <span>{isPaid ? 'Payment Confirmed' : 'Mark Payment Completed'}</span>
                </button>
              </div>
            ) : (
              <div style={{ background: '#f8fafc', border: '1.5px dashed #cbd5e1', borderRadius: '14px', padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.75rem' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 600 }}>CASH COLLECT</span>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>₹{grandTotal.toFixed(2)}</div>
                </div>
                <span className="badge" style={{ background: '#dcfce7', color: '#15803d' }}>Collect at Counter</span>
              </div>
            )}
          </div>

          {/* Discount Field */}
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '0.25rem' }}>
              DISCOUNT
            </label>
            <div style={{ display: 'flex', border: '1px solid #cbd5e1', borderRadius: '10px', overflow: 'hidden' }}>
              <input 
                type="number"
                min="0"
                value={discountValue}
                onChange={(e) => setDiscountValue(Math.max(0, Number(e.target.value)))}
                placeholder="0"
                style={{
                  width: '100%',
                  padding: '0.5rem 0.75rem',
                  border: 'none',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  outline: 'none'
                }}
              />
              <button
                type="button"
                onClick={() => setDiscountType(discountType === 'rupees' ? 'percent' : 'rupees')}
                style={{
                  background: '#fff7ed',
                  border: 'none',
                  borderLeft: '1px solid #cbd5e1',
                  padding: '0 0.75rem',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  color: '#ea580c',
                  cursor: 'pointer'
                }}
                title="Toggle % or ₹ discount"
              >
                {discountType === 'rupees' ? '₹' : '%'}
              </button>
            </div>
          </div>

          {/* Detailed Calculations Breakdown */}
          <div style={{ background: '#fffbf5', padding: '0.85rem 1rem', borderRadius: '14px', border: '1px solid #ffedd5', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: '#475569' }}>
              <span>Subtotal</span>
              <span style={{ fontWeight: 700 }}>₹{subtotal.toFixed(2)}</span>
            </div>

            {discountAmount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', color: '#dc2626' }}>
                <span>Discount ({discountType === 'percent' ? `${discountValue}%` : 'Flat'})</span>
                <span style={{ fontWeight: 700 }}>-₹{discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '2px solid #ea580c',
              paddingTop: '8px',
              marginTop: '6px'
            }}>
              <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a' }}>Grand Total</span>
              <span style={{ fontSize: '1.35rem', fontWeight: 900, color: '#ea580c' }}>
                ₹{grandTotal.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={onGenerateBill}
              className="btn btn-primary"
              style={{ flex: 1, padding: '0.85rem', fontSize: '1rem', borderRadius: '14px' }}
            >
              <Receipt size={18} />
              <span>Generate Bill</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
