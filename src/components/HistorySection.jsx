import React, { useState } from 'react';
import { History, Calendar, Clock, CreditCard, ShoppingBag, CheckCircle, ChevronDown, ChevronUp, FileText, Search } from 'lucide-react';

export default function HistorySection({ billHistory, onBackToHome }) {
  const [expandedBillId, setExpandedBillId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleExpand = (billNo) => {
    setExpandedBillId(expandedBillId === billNo ? null : billNo);
  };

  const filteredBills = billHistory.filter((bill) => {
    const query = searchQuery.toLowerCase();
    return (
      bill.billNo.toLowerCase().includes(query) ||
      bill.date.toLowerCase().includes(query) ||
      bill.paymentMethod.toLowerCase().includes(query) ||
      bill.items.some(i => i.name.toLowerCase().includes(query))
    );
  });

  return (
    <section id="history" style={{ padding: '5rem 0 6rem', background: 'linear-gradient(180deg, #fffbf5 0%, #fff7ed 100%)', minHeight: '80vh' }}>
      <div className="container">
        
        {/* Header Title */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3rem' }}>
          <span className="badge badge-hero" style={{ marginBottom: '0.75rem' }}>
            📜 POS Bill History
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
            Completed <span style={{ color: '#ea580c' }}>Bill History</span>
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#64748b' }}>
            View, search, and inspect past customer receipts generated at Valli Food Stall.
          </p>
        </div>

        {/* Search Bar & Stats Header */}
        <div style={{ maxWidth: '840px', margin: '0 auto 2rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ position: 'relative', flex: '1 1 300px' }}>
            <Search size={18} color="#94a3b8" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              placeholder="Search by invoice no, date, item or payment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 2.6rem',
                borderRadius: '14px',
                border: '1px solid #fed7aa',
                outline: 'none',
                fontSize: '0.95rem',
                fontWeight: 600,
                background: '#ffffff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
              }}
            />
          </div>

          <div style={{ background: '#fff', padding: '0.65rem 1.25rem', borderRadius: '14px', border: '1px solid #fed7aa', fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>
            Total Recorded Bills: <span style={{ color: '#ea580c' }}>{billHistory.length}</span>
          </div>
        </div>

        {/* Bills List */}
        <div style={{ maxWidth: '840px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredBills.length > 0 ? (
            filteredBills.map((bill) => {
              const totalItemsCount = bill.items.reduce((acc, i) => acc + i.quantity, 0);
              const isExpanded = expandedBillId === bill.billNo;

              return (
                <div 
                  key={bill.billNo}
                  style={{
                    background: '#ffffff',
                    borderRadius: '20px',
                    border: '1px solid #fed7aa',
                    boxShadow: '0 4px 20px rgba(15, 23, 42, 0.05)',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {/* Summary Bar */}
                  <div 
                    onClick={() => toggleExpand(bill.billNo)}
                    style={{
                      padding: '1.25rem 1.5rem',
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                      cursor: 'pointer',
                      background: isExpanded ? '#fff7ed' : '#ffffff'
                    }}
                  >
                    {/* Left: Invoice & Time */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: '1 1 240px' }}>
                      <div style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        background: '#fff7ed',
                        border: '1px solid #ffedd5',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ea580c'
                      }}>
                        <FileText size={22} />
                      </div>
                      <div>
                        <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
                          Invoice No: <span style={{ color: '#ea580c' }}>{bill.billNo}</span>
                        </div>
                        <div style={{ fontSize: '0.82rem', color: '#64748b', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '2px' }}>
                          <Calendar size={14} />
                          <span>{bill.date} • {bill.time}</span>
                        </div>
                      </div>
                    </div>

                    {/* Middle: Payment & Items */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                      <div style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <span>{bill.paymentMethod === 'Cash' ? '💵 Cash' : '📱 UPI / GPay / PhonePe'}</span>
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#475569', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                        <ShoppingBag size={15} color="#ea580c" />
                        <span>{totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'}</span>
                      </div>
                    </div>

                    {/* Right: Total & Status */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#ea580c' }}>
                          ₹{bill.grandTotal.toFixed(2)}
                        </div>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '3px',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          background: '#dcfce7',
                          color: '#15803d',
                          padding: '2px 8px',
                          borderRadius: '8px'
                        }}>
                          <CheckCircle size={11} /> PAID
                        </span>
                      </div>
                      <button 
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#64748b',
                          cursor: 'pointer',
                          padding: '4px'
                        }}
                      >
                        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Receipt Breakdown */}
                  {isExpanded && (
                    <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid #fed7aa', background: '#fafaf9' }}>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#64748b', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                        Ordered Items Breakdown
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
                        {bill.items.map((item, idx) => (
                          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: 600, color: '#334155' }}>
                            <span>{item.name} x {item.quantity}</span>
                            <span style={{ fontWeight: 700, color: '#0f172a' }}>₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>

                      <div style={{ borderTop: '1px dashed #cbd5e1', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: 700, color: '#475569' }}>
                        <span>Subtotal: ₹{bill.subtotal.toFixed(2)}</span>
                        {bill.discount > 0 && <span style={{ color: '#dc2626' }}>Discount: -₹{bill.discount.toFixed(2)}</span>}
                        <span style={{ color: '#ea580c', fontSize: '1rem', fontWeight: 900 }}>Grand Total: ₹{bill.grandTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem 1.5rem', background: '#ffffff', borderRadius: '24px', border: '2px dashed #fed7aa' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.75rem', opacity: 0.6 }}>📜</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                No Completed Bills Found
              </h3>
              <p style={{ fontSize: '0.9rem', color: '#64748b', maxWidth: '420px', margin: '0 auto' }}>
                {searchQuery ? 'No bill matches your search criteria.' : 'When you generate bills in the POS billing dashboard, completed receipts will automatically appear in this history.'}
              </p>
            </div>
          )}
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
