import React from 'react';
import { Plus, Minus, ShoppingBag, Star, Clock } from 'lucide-react';

export default function FoodCard({ item, cartQuantity, onAddToCart, onUpdateQuantity }) {
  const isAdded = cartQuantity > 0;

  return (
    <div 
      className="food-card-container food-card-hover"
      style={{
        background: '#ffffff',
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(15, 23, 42, 0.06)',
        border: isAdded ? '2px solid #ea580c' : '1px solid #fed7aa',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      {/* Top Image Container */}
      <div className="food-card-image-wrap" style={{ position: 'relative', width: '100%', height: '190px', overflow: 'hidden' }}>
        <img 
          src={item.image} 
          alt={item.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
          className="food-img"
        />
        
        {/* Category / Badge Pills */}
        <div className="food-card-badges" style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          <span className={`badge ${item.category === 'Veg' ? 'badge-veg' : 'badge-nonveg'}`}>
            {item.category === 'Veg' ? '🟢 Veg' : '🔴 Non-Veg'}
          </span>
          {item.badge && (
            <span className="badge" style={{ background: '#0f172a', color: '#fff', fontSize: '0.75rem' }}>
              {item.badge}
            </span>
          )}
        </div>

        {/* Rating Tag */}
        <div className="food-card-rating" style={{
          position: 'absolute',
          bottom: '12px',
          right: '12px',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(6px)',
          padding: '4px 10px',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '0.8rem',
          fontWeight: 700,
          color: '#0f172a'
        }}>
          <Star size={14} fill="#eab308" color="#eab308" />
          <span>{item.rating}</span>
        </div>
      </div>

      {/* Content Body */}
      <div className="food-card-body" style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <h3 className="food-card-title" style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
              {item.name}
            </h3>
          </div>

          <p className="food-card-desc" style={{
            fontSize: '0.85rem',
            color: '#64748b',
            lineHeight: 1.5,
            marginBottom: '1rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {item.description}
          </p>
        </div>

        {/* Price & Add Button Bar */}
        <div className="food-card-price-bar" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '0.85rem',
          borderTop: '1px dashed #e2e8f0',
          marginTop: 'auto'
        }}>
          <div>
            <span className="food-card-price-label" style={{ fontSize: '0.75rem', color: '#64748b', display: 'block', fontWeight: 600 }}>PRICE</span>
            <span className="food-card-price" style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ea580c' }}>
              ₹{item.price}
            </span>
          </div>

          {/* Interactive Quantity Control vs Add to Bill */}
          {isAdded ? (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: '#ea580c',
              borderRadius: '12px',
              padding: '3px',
              gap: '6px',
              color: '#ffffff',
              boxShadow: '0 4px 12px rgba(234,88,12,0.3)'
            }}>
              <button
                onClick={() => onUpdateQuantity(item.id, cartQuantity - 1)}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  color: '#fff',
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>

              <span style={{ fontWeight: 800, fontSize: '0.95rem', minWidth: '20px', textAlign: 'center' }}>
                {cartQuantity}
              </span>

              <button
                onClick={() => onUpdateQuantity(item.id, cartQuantity + 1)}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: 'none',
                  color: '#fff',
                  width: '28px',
                  height: '28px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => onAddToCart(item)}
              className="btn btn-primary"
              style={{
                padding: '0.55rem 1rem',
                fontSize: '0.88rem',
                borderRadius: '12px'
              }}
            >
              <Plus size={16} />
              <span>Add</span>
            </button>
          )}

        </div>
      </div>

      <style>{`
        .food-card-hover:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 32px rgba(234, 88, 12, 0.15) !important;
        }
        .food-card-hover:hover .food-img {
          transform: scale(1.06);
        }
      `}</style>
    </div>
  );
}
