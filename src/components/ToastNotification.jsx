import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function ToastNotification({ toast, onClose }) {
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        onClose();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success';

  return (
    <div style={{
      position: 'fixed',
      bottom: '90px',
      right: '24px',
      zIndex: 10000,
      background: isSuccess ? '#0f172a' : '#7f1d1d',
      color: '#ffffff',
      padding: '0.85rem 1.25rem',
      borderRadius: '16px',
      boxShadow: '0 16px 36px rgba(0,0,0,0.25)',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      border: isSuccess ? '1px solid #22c55e' : '1px solid #fca5a5',
      animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
    }}>
      {isSuccess ? <CheckCircle2 size={20} color="#22c55e" /> : <AlertCircle size={20} color="#ef4444" />}
      <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>{toast.message}</span>
      <button 
        onClick={onClose}
        style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}
      >
        <X size={18} />
      </button>
    </div>
  );
}
