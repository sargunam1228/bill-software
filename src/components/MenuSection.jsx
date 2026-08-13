import React, { useState } from 'react';
import { Search, SlidersHorizontal, UtensilsCrossed, Receipt } from 'lucide-react';
import { CATEGORIES, MENU_ITEMS } from '../data/menuData';
import FoodCard from './FoodCard';

export default function MenuSection({ cart, onAddToCart, onUpdateQuantity, onNavigateToBilling, onBackToHome }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const totalCartCount = cart ? cart.reduce((sum, item) => sum + item.quantity, 0) : 0;

  // Filtering Logic
  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCartQuantity = (id) => {
    const found = cart.find(c => c.id === id);
    return found ? found.quantity : 0;
  };

  return (
    <section 
      id="menu" 
      style={{
        padding: '5rem 0',
        background: '#ffffff',
        position: 'relative'
      }}
    >
      <div className="container">
        
        {/* Header Title */}
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 3rem' }}>
          <span className="badge badge-hero" style={{ marginBottom: '0.75rem' }}>
            <UtensilsCrossed size={14} /> Traditional Tamil Nadu Menu
          </span>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 800, color: '#0f172a', marginBottom: '0.75rem' }}>
            Explore Our <span style={{ color: '#ea580c' }}>Delicious Menu</span>
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#64748b' }}>
            Handcrafted with fresh ingredients, traditional ground spices, and cooked hot on order. Select items to instantly add them to your POS bill!
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          
          {/* Search Input Bar */}
          <div style={{
            position: 'relative',
            maxWidth: '520px',
            margin: '0 auto',
            width: '100%'
          }}>
            <Search 
              size={20} 
              color="#94a3b8" 
              style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} 
            />
            <input 
              type="text"
              placeholder="Search biryani, parotta, dosa, meals, coffee..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.85rem 1rem 0.85rem 3rem',
                borderRadius: '16px',
                border: '1.5px solid #fed7aa',
                fontSize: '1rem',
                outline: 'none',
                background: '#fffbf5',
                boxShadow: '0 4px 12px rgba(234, 88, 12, 0.05)',
                transition: 'border-color 0.2s ease'
              }}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  fontWeight: 700
                }}
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '0.75rem'
          }}>
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  style={{
                    padding: '0.65rem 1.25rem',
                    borderRadius: '14px',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    border: active ? 'none' : '1.5px solid #fed7aa',
                    background: active ? 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)' : '#fffbf5',
                    color: active ? '#ffffff' : '#334155',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    boxShadow: active ? '0 6px 16px rgba(234, 88, 12, 0.3)' : 'none',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Food Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="menu-food-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.75rem'
          }}>
            {filteredItems.map((item) => (
              <FoodCard
                key={item.id}
                item={item}
                cartQuantity={getCartQuantity(item.id)}
                onAddToCart={onAddToCart}
                onUpdateQuantity={onUpdateQuantity}
              />
            ))}
          </div>
        ) : (
          /* Empty state for search */
          <div style={{
            textAlign: 'center',
            padding: '4rem 1.5rem',
            background: '#fffbf5',
            borderRadius: '24px',
            border: '2px dashed #fed7aa'
          }}>
            <UtensilsCrossed size={48} color="#ea580c" style={{ marginBottom: '1rem', opacity: 0.7 }} />
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
              No Food Items Found
            </h3>
            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
              We couldn't find any dishes matching "{searchQuery}". Try searching for biryani, parotta, meals, or reset your filters.
            </p>
            <button 
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="btn btn-secondary"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Floating Bill Button (Shown when items are added to cart) */}
        {totalCartCount > 0 && (
          <button
            onClick={onNavigateToBilling}
            style={{
              position: 'fixed',
              bottom: '24px',
              left: 0,
              right: 0,
              margin: '0 auto',
              width: 'fit-content',
              zIndex: 9999,
              background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
              color: '#ffffff',
              border: 'none',
              borderRadius: '50px',
              padding: '0.85rem 1.6rem',
              fontSize: '1.05rem',
              fontWeight: 800,
              fontFamily: 'var(--font-heading)',
              boxShadow: '0 8px 24px rgba(234, 88, 12, 0.45), 0 2px 8px rgba(0, 0, 0, 0.15)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
            className="animate-slide-up"
            aria-label="View POS Bill"
            title="Go to POS Billing"
          >
            <Receipt size={22} />
            <span>Bill</span>
            <span style={{
              background: '#ffffff',
              color: '#ea580c',
              fontSize: '0.85rem',
              fontWeight: 900,
              padding: '2px 8px',
              borderRadius: '12px'
            }}>
              {totalCartCount}
            </span>
          </button>
        )}

        {/* Back to Home Button */}
        <div style={{ textAlign: 'center', marginTop: '3.5rem', marginBottom: '4.5rem' }}>
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
