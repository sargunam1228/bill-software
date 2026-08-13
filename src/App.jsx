import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MenuSection from './components/MenuSection';
import BillingDashboard from './components/BillingDashboard';
import ReceiptModal from './components/ReceiptModal';
import HistorySection from './components/HistorySection';
import TotalSection from './components/TotalSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import ToastNotification from './components/ToastNotification';

export default function App() {
  // Navigation active section
  const [activeSection, setActiveSection] = useState('home');

  // Cart / Bill items state
  const [cart, setCart] = useState([]);

  // Customer Details
  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    orderType: 'Dine In',
    tableNo: ''
  });

  // Payment Selection State
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [isPaid, setIsPaid] = useState(false);

  // Discount State
  const [discountValue, setDiscountValue] = useState(0);
  const [discountType, setDiscountType] = useState('rupees'); // 'rupees' | 'percent'

  // Receipt Modal Visibility & Bill snapshot
  const [generatedBill, setGeneratedBill] = useState(null);

  // Bill History State (persisted in localStorage)
  const [billHistory, setBillHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('valli_bill_history');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('valli_bill_history', JSON.stringify(billHistory));
    } catch (e) {}
  }, [billHistory]);

  // Toast Notification state
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (activeSection === 'home' && window.innerWidth > 768) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    }
  }, [activeSection]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  
  let discountAmount = 0;
  if (discountType === 'percent') {
    discountAmount = (subtotal * (discountValue || 0)) / 100;
  } else {
    discountAmount = discountValue || 0;
  }
  discountAmount = Math.min(subtotal, Math.max(0, discountAmount));

  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const grandTotal = Math.max(0, subtotal - discountAmount);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Add Item to Cart
  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const existing = prevCart.find((c) => c.id === item.id);
      if (existing) {
        return prevCart.map((c) => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c);
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
    showToast(`Added "${item.name}" to Bill!`);
  };

  // Update Item Quantity
  const handleUpdateQuantity = (id, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(id);
    } else {
      setCart((prevCart) => prevCart.map((c) => c.id === id ? { ...c, quantity: newQty } : c));
    }
  };

  // Remove Item from Cart
  const handleRemoveItem = (id) => {
    const item = cart.find(c => c.id === id);
    setCart((prevCart) => prevCart.filter((c) => c.id !== id));
    if (item) showToast(`Removed "${item.name}" from Bill`, 'info');
  };

  // Clear Entire Bill
  const handleClearBill = () => {
    setCart([]);
    setDiscountValue(0);
    setIsPaid(false);
    showToast('Cleared current bill items.', 'info');
  };

  // Generate Bill & Open Receipt Modal
  const handleGenerateBill = () => {
    if (cart.length === 0) {
      showToast('Please add at least one food item to generate a bill.', 'error');
      return;
    }

    const now = new Date();
    const billNo = 'VFS-' + now.getFullYear() + '-' + Math.floor(1000 + Math.random() * 9000);
    const dateStr = now.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });

    const newBillSnapshot = {
      billNo,
      date: dateStr,
      time: timeStr,
      customer: {
        name: 'Walk-in Customer',
        phone: '-',
        orderType: 'POS Order',
        tableNo: '-'
      },
      items: [...cart],
      subtotal,
      discountValue,
      discountType,
      discount: discountAmount,
      grandTotal,
      paymentMethod,
      isPaid: true
    };

    setGeneratedBill(newBillSnapshot);
    setBillHistory(prev => [newBillSnapshot, ...prev]);
    showToast('Generated Bill #' + billNo + '!');
  };

  // New Bill Reset
  const handleDoneBill = () => {
    setCart([]);
    setDiscountValue(0);
    setDiscountType('rupees');
    setPaymentMethod('Cash');
    setIsPaid(false);
    setGeneratedBill(null);
    scrollToSection('history');
  };

  const handleNewBill = () => {
    setCart([]);
    setDiscountValue(0);
    setIsPaid(false);
    setGeneratedBill(null);
    showToast('Started a fresh new bill.', 'success');
  };

  const scrollToSection = (id) => {
    setActiveSection(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-root-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Sticky Glass Navbar */}
      <Navbar 
        cartCount={totalCartCount}
        onOpenCart={() => scrollToSection('billing')}
        activeSection={activeSection}
        setActiveSection={scrollToSection}
      />

      {/* Main Content Sections */}
      <main className="app-main-content" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        
        {activeSection === 'home' && (
          <Hero 
            onStartBilling={() => scrollToSection('menu')}
            onHistory={() => scrollToSection('history')}
            onTotal={() => scrollToSection('total')}
          />
        )}

        {activeSection === 'menu' && (
          <MenuSection 
            cart={cart}
            onAddToCart={handleAddToCart}
            onUpdateQuantity={handleUpdateQuantity}
            onNavigateToBilling={() => scrollToSection('billing')}
            onBackToHome={() => scrollToSection('home')}
          />
        )}

        {activeSection === 'billing' && (
          <BillingDashboard 
            cart={cart}
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            isPaid={isPaid}
            setIsPaid={setIsPaid}
            discountValue={discountValue}
            setDiscountValue={setDiscountValue}
            discountType={discountType}
            setDiscountType={setDiscountType}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onClearBill={handleClearBill}
            onGenerateBill={handleGenerateBill}
            subtotal={subtotal}
            discountAmount={discountAmount}
            grandTotal={grandTotal}
            onBackToHome={() => scrollToSection('home')}
          />
        )}

        {activeSection === 'history' && (
          <HistorySection 
            billHistory={billHistory} 
            onBackToHome={() => scrollToSection('home')}
          />
        )}

        {activeSection === 'total' && (
          <TotalSection 
            billHistory={billHistory} 
            onBackToHome={() => scrollToSection('home')}
          />
        )}

        {activeSection === 'about' && (
          <AboutSection />
        )}

        {activeSection === 'contact' && (
          <ContactSection showToast={showToast} />
        )}

      </main>

      {/* Toast Notification */}
      <ToastNotification toast={toast} onClose={() => setToast(null)} />

      {/* Printable Receipt Modal */}
      <ReceiptModal 
        bill={generatedBill}
        onClose={() => setGeneratedBill(null)}
        onDone={handleDoneBill}
      />

    </div>
  );
}
