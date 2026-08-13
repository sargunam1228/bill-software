import React from 'react';
import { DollarSign, Receipt, Download, Calendar, CreditCard, FileText } from 'lucide-react';
import { SHOP_INFO } from '../data/menuData';

export default function TotalSection({ billHistory, onBackToHome }) {
  const todayStr = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  
  // Filter ONLY today's bills
  const todayBills = billHistory.filter((bill) => bill.date === todayStr);

  // Calculate today's dynamic metrics
  const cashBills = todayBills.filter(b => b.paymentMethod === 'Cash');
  const upiBills = todayBills.filter(b => b.paymentMethod === 'UPI');

  const cashSales = cashBills.reduce((acc, b) => acc + b.grandTotal, 0);
  const upiSales = upiBills.reduce((acc, b) => acc + b.grandTotal, 0);
  const todaySales = cashSales + upiSales;

  // Download Daily PDF Report
  const handleDownloadPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <title>Valli_Food_Stall_Daily_Sales_Report_${todayStr.replace(/\s+/g, '_')}</title>
  <style>
    @page {
      size: A4;
      margin: 15mm;
    }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #0f172a;
      background: #ffffff;
      margin: 0;
      padding: 20px;
    }
    .header {
      text-align: center;
      border-bottom: 2.5px solid #ea580c;
      padding-bottom: 12px;
      margin-bottom: 24px;
    }
    .header h1 {
      color: #ea580c;
      font-size: 26px;
      margin: 0 0 4px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .header h2 {
      font-size: 16px;
      color: #0f172a;
      margin: 0 0 6px;
      font-weight: 800;
    }
    .header p {
      font-size: 12px;
      color: #64748b;
      margin: 2px 0;
    }
    .date-badge {
      display: inline-block;
      background: #fff7ed;
      color: #ea580c;
      border: 1px solid #fed7aa;
      padding: 6px 16px;
      border-radius: 8px;
      font-weight: 800;
      font-size: 13px;
      margin-top: 8px;
    }
    .section-title {
      font-size: 14px;
      font-weight: 800;
      color: #0f172a;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin: 24px 0 10px;
      border-left: 4px solid #ea580c;
      padding-left: 8px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
      font-size: 13px;
    }
    th, td {
      border: 1px solid #cbd5e1;
      padding: 10px 14px;
      text-align: left;
    }
    th {
      background-color: #fff7ed;
      color: #0f172a;
      font-weight: 800;
    }
    td.number {
      text-align: right;
      font-weight: 700;
    }
    .summary-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
      margin-top: 16px;
    }
    .summary-box {
      border: 1px solid #fed7aa;
      background: #fffbf5;
      padding: 12px 16px;
      border-radius: 8px;
    }
    .summary-box .label {
      font-size: 11px;
      color: #64748b;
      font-weight: 700;
      text-transform: uppercase;
    }
    .summary-box .val {
      font-size: 20px;
      font-weight: 900;
      color: #ea580c;
      margin-top: 2px;
    }
    .footer {
      margin-top: 40px;
      text-align: center;
      font-size: 11px;
      color: #94a3b8;
      border-top: 1px dashed #cbd5e1;
      padding-top: 12px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🔥 ${SHOP_INFO.name}</h1>
    <h2>DAILY SALES REPORT</h2>
    <p>${SHOP_INFO.address} | Ph: ${SHOP_INFO.phone}</p>
    <div class="date-badge">Date: ${todayStr}</div>
  </div>

  <div class="section-title">DAILY SALES TOTAL TABLE</div>
  <table>
    <thead>
      <tr>
        <th>Date</th>
        <th style="text-align: right;">Total Sales</th>
        <th style="text-align: right;">Cash</th>
        <th style="text-align: right;">UPI</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>${todayStr}</strong></td>
        <td class="number" style="color: #ea580c; font-size: 14px;">₹${todaySales.toFixed(2)}</td>
        <td class="number" style="color: #16a34a;">₹${cashSales.toFixed(2)}</td>
        <td class="number" style="color: #0284c7;">₹${upiSales.toFixed(2)}</td>
      </tr>
    </tbody>
  </table>

  <div class="section-title">SUMMARY OVERVIEW</div>
  <div class="summary-grid">
    <div class="summary-box">
      <div class="label">Today's Total Sales</div>
      <div class="val">₹${todaySales.toFixed(2)}</div>
    </div>
    <div class="summary-box">
      <div class="label">Total Bills Issued</div>
      <div class="val" style="color: #0f172a;">${todayBills.length}</div>
    </div>
    <div class="summary-box">
      <div class="label">💵 Cash Sales</div>
      <div class="val" style="color: #16a34a;">₹${cashSales.toFixed(2)} (${cashBills.length} bills)</div>
    </div>
    <div class="summary-box">
      <div class="label">📱 UPI / GPay / PhonePe Sales</div>
      <div class="val" style="color: #0284c7;">₹${upiSales.toFixed(2)} (${upiBills.length} bills)</div>
    </div>
  </div>

  <div class="section-title">PAYMENT DETAILS LOGIC</div>
  <table>
    <thead>
      <tr>
        <th>Payment Mode</th>
        <th style="text-align: center;">Bills Count</th>
        <th style="text-align: right;">Total Collected</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>💵 Cash</strong></td>
        <td style="text-align: center;">${cashBills.length}</td>
        <td class="number" style="color: #16a34a;">₹${cashSales.toFixed(2)}</td>
      </tr>
      <tr>
        <td><strong>📱 UPI / GPay / PhonePe</strong></td>
        <td style="text-align: center;">${upiBills.length}</td>
        <td class="number" style="color: #0284c7;">₹${upiSales.toFixed(2)}</td>
      </tr>
    </tbody>
  </table>

  <div class="footer">
    Generated automatically by Valli Food Stall POS System on ${new Date().toLocaleString()}
  </div>
</body>
</html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      try { printWindow.print(); } catch(e) {}
    }, 300);
  };

  return (
    <section id="total" style={{ padding: '5rem 0 6rem', background: 'linear-gradient(180deg, #fffbf5 0%, #fff7ed 100%)', minHeight: '80vh' }}>
      <div className="container">
        
        {/* Header Title */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3rem' }}>
          <span className="badge badge-hero" style={{ marginBottom: '0.75rem' }}>
            📊 Daily POS Analytics
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
            Daily <span style={{ color: '#ea580c' }}>Sales Total</span>
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#64748b' }}>
            Real-time daily sales totals, payment method breakdown (Cash & UPI), and professional PDF report download.
          </p>
        </div>

        {/* Date Banner & Download PDF Action */}
        <div style={{ maxWidth: '960px', margin: '0 auto 2rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', background: '#ffffff', padding: '1.25rem 1.75rem', borderRadius: '20px', border: '1px solid #fed7aa', boxShadow: '0 4px 20px rgba(15,23,42,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#fff7ed', border: '1px solid #ffedd5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ea580c' }}>
              <Calendar size={22} />
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Current Date
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
                {todayStr}
              </div>
            </div>
          </div>

          <button 
            onClick={handleDownloadPDF}
            className="btn btn-primary"
            style={{ padding: '0.75rem 1.5rem', fontSize: '0.95rem', borderRadius: '14px', display: 'flex', alignItems: 'center', gap: '0.6rem' }}
          >
            <span>📄</span>
            <span>Download Daily PDF</span>
          </button>
        </div>

        {/* 4. DAILY TOTAL TABLE */}
        <div style={{ maxWidth: '960px', margin: '0 auto 2.5rem', background: '#ffffff', borderRadius: '24px', padding: '1.75rem', border: '1px solid #fed7aa', boxShadow: '0 4px 20px rgba(15,23,42,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid #ffedd5' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FileText size={20} color="#ea580c" />
              <span>DAILY SALES TOTAL</span>
            </h3>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ea580c', background: '#fff7ed', padding: '4px 12px', borderRadius: '10px', border: '1px solid #fed7aa' }}>
              Date: {todayStr}
            </span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #fed7aa', borderRadius: '14px', overflow: 'hidden' }}>
              <thead>
                <tr style={{ background: '#fff7ed', borderBottom: '2px solid #fed7aa', textAlign: 'left', color: '#0f172a' }}>
                  <th style={{ padding: '0.9rem 1.25rem', fontWeight: 800, fontSize: '0.95rem' }}>Date</th>
                  <th style={{ padding: '0.9rem 1.25rem', fontWeight: 800, fontSize: '0.95rem', textAlign: 'right' }}>Total Sales</th>
                  <th style={{ padding: '0.9rem 1.25rem', fontWeight: 800, fontSize: '0.95rem', textAlign: 'right' }}>Cash</th>
                  <th style={{ padding: '0.9rem 1.25rem', fontWeight: 800, fontSize: '0.95rem', textAlign: 'right' }}>UPI</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ background: '#ffffff', fontWeight: 700, color: '#334155' }}>
                  <td style={{ padding: '1rem 1.25rem', color: '#0f172a', fontWeight: 800 }}>{todayStr}</td>
                  <td style={{ padding: '1rem 1.25rem', textAlign: 'right', color: '#ea580c', fontWeight: 900, fontSize: '1.15rem' }}>₹{todaySales.toFixed(2)}</td>
                  <td style={{ padding: '1rem 1.25rem', textAlign: 'right', color: '#16a34a', fontWeight: 800 }}>₹{cashSales.toFixed(2)}</td>
                  <td style={{ padding: '1rem 1.25rem', textAlign: 'right', color: '#0284c7', fontWeight: 800 }}>₹{upiSales.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. DAILY TOTAL SUMMARY CARDS */}
        <div style={{ maxWidth: '960px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
          
          {/* Today's Total Sales */}
          <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '20px', border: '1px solid #fed7aa', boxShadow: '0 4px 20px rgba(15,23,42,0.05)' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.5rem' }}>
              Today's Total Sales
            </span>
            <div style={{ fontSize: '1.85rem', fontWeight: 900, color: '#ea580c' }}>
              ₹{todaySales.toFixed(2)}
            </div>
          </div>

          {/* Cash Sales */}
          <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '20px', border: '1px solid #fed7aa', boxShadow: '0 4px 20px rgba(15,23,42,0.05)' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.5rem' }}>
              💵 Cash Sales
            </span>
            <div style={{ fontSize: '1.85rem', fontWeight: 900, color: '#16a34a' }}>
              ₹{cashSales.toFixed(2)}
            </div>
          </div>

          {/* UPI Sales */}
          <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '20px', border: '1px solid #fed7aa', boxShadow: '0 4px 20px rgba(15,23,42,0.05)' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.5rem' }}>
              📱 UPI Sales
            </span>
            <div style={{ fontSize: '1.85rem', fontWeight: 900, color: '#0284c7' }}>
              ₹{upiSales.toFixed(2)}
            </div>
          </div>

          {/* Total Bills */}
          <div style={{ background: '#ffffff', padding: '1.5rem', borderRadius: '20px', border: '1px solid #fed7aa', boxShadow: '0 4px 20px rgba(15,23,42,0.05)' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', marginBottom: '0.5rem' }}>
              Total Bills
            </span>
            <div style={{ fontSize: '1.85rem', fontWeight: 900, color: '#0f172a' }}>
              {todayBills.length}
            </div>
          </div>

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
