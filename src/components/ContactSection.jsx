import React, { useState } from 'react';
import { MapPin, Phone, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { SHOP_INFO } from '../data/menuData';

export default function ContactSection({ showToast }) {
  const [inquiry, setInquiry] = useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inquiry.name || !inquiry.phone) {
      if (showToast) showToast('Please enter your name and phone number', 'error');
      return;
    }
    setSubmitted(true);
    if (showToast) showToast('Thank you! Your message has been received.', 'success');
    setTimeout(() => {
      setInquiry({ name: '', phone: '', message: '' });
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section id="contact" style={{ padding: '5rem 0', background: 'linear-gradient(180deg, #ffffff 0%, #fffbf5 100%)' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3.5rem' }}>
          <span className="badge badge-hero" style={{ marginBottom: '0.75rem' }}>
            <MapPin size={14} /> Visit & Contact Us
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
            Get in Touch with <span style={{ color: '#ea580c' }}>VALLI FOOD STALL</span>
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#64748b' }}>
            We'd love to serve you! Drop by our stall or contact us for catering, bulk orders, and party bookings.
          </p>
        </div>

        {/* Contact Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2.5rem',
          alignItems: 'start'
        }}>
          
          {/* Contact Information & Map Visual Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Info Cards */}
            <div style={{
              background: '#ffffff',
              borderRadius: '20px',
              padding: '1.5rem',
              border: '1px solid #fed7aa',
              boxShadow: '0 4px 16px rgba(15,23,42,0.04)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem'
            }}>
              
              {/* Address */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#ffedd5', color: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MapPin size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Location & Address</h4>
                  <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '2px 0' }}>{SHOP_INFO.address}</p>
                </div>
              </div>

              {/* Phone */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#ffedd5', color: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Phone size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Phone & Hotline</h4>
                  <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '2px 0' }}>{SHOP_INFO.phone}</p>
                </div>
              </div>

              {/* Hours */}
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#ffedd5', color: '#ea580c', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Clock size={22} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>Opening Hours</h4>
                  <p style={{ fontSize: '0.9rem', color: '#64748b', margin: '2px 0' }}>{SHOP_INFO.hours}</p>
                </div>
              </div>

            </div>

            {/* Simulated Interactive Map Visual Card */}
            <div style={{
              background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
              color: '#ffffff',
              borderRadius: '20px',
              padding: '1.5rem',
              boxShadow: '0 8px 24px rgba(15,23,42,0.15)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyBetween: 'space-between', marginBottom: '1rem' }}>
                <div>
                  <span className="badge" style={{ background: '#ea580c', color: '#fff', fontSize: '0.75rem', marginBottom: '4px' }}>
                    MADURAI ROAD MAP
                  </span>
                  <h4 style={{ color: '#fff', fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>
                    Stall Location Pin
                  </h4>
                </div>
              </div>

              <div style={{
                height: '140px',
                background: '#334155',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                gap: '0.5rem',
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <MapPin size={36} color="#ea580c" className="animate-float" />
                <span style={{ fontSize: '0.88rem', color: '#f8fafc', fontWeight: 700 }}>
                  📍 Valli Food Stall - Near Madurai Bus Stand
                </span>
                <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                  Click to open Google Maps navigation
                </span>
              </div>
            </div>

          </div>

          {/* Contact Inquiry Form */}
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '2rem',
            border: '1px solid #fed7aa',
            boxShadow: '0 8px 30px rgba(15,23,42,0.06)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <MessageSquare size={22} color="#ea580c" />
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0f172a', margin: 0 }}>
                Quick Inquiry / Party Booking
              </h3>
            </div>

            {submitted ? (
              <div style={{
                textAlign: 'center',
                padding: '2.5rem 1rem',
                background: '#dcfce7',
                borderRadius: '16px',
                border: '1px solid #86efac',
                color: '#15803d'
              }}>
                <CheckCircle2 size={42} style={{ marginBottom: '0.5rem' }} />
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Inquiry Received!</h4>
                <p style={{ fontSize: '0.9rem' }}>We will call you back shortly regarding your request.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.35rem' }}>
                    YOUR NAME
                  </label>
                  <input 
                    type="text"
                    placeholder="e.g. Anbu"
                    value={inquiry.name}
                    onChange={(e) => setInquiry({ ...inquiry, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '12px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.95rem',
                      outline: 'none',
                      background: '#fffbf5'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.35rem' }}>
                    PHONE NUMBER
                  </label>
                  <input 
                    type="tel"
                    placeholder="e.g. 9876543210"
                    value={inquiry.phone}
                    onChange={(e) => setInquiry({ ...inquiry, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '12px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.95rem',
                      outline: 'none',
                      background: '#fffbf5'
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '0.35rem' }}>
                    MESSAGE / BULK ORDER DETAILS
                  </label>
                  <textarea 
                    rows="3"
                    placeholder="Tell us about your event, preferred date, or food requirements..."
                    value={inquiry.message}
                    onChange={(e) => setInquiry({ ...inquiry, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '12px',
                      border: '1px solid #cbd5e1',
                      fontSize: '0.95rem',
                      outline: 'none',
                      background: '#fffbf5',
                      resize: 'none'
                    }}
                  />
                </div>

                <button 
                  type="submit"
                  className="btn btn-primary"
                  style={{ padding: '0.85rem', fontSize: '1rem', marginTop: '0.5rem', borderRadius: '12px' }}
                >
                  <Send size={18} />
                  <span>Send Message</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
