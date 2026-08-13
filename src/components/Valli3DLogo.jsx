import React, { useState } from 'react';

export default function Valli3DLogo() {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -18;
    const rotateY = ((x - centerX) / centerX) * 18;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div 
      className="valli-3d-logo-wrapper"
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        zIndex: 10,
        cursor: 'pointer',
        perspective: '1000px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto'
      }}
    >
      {/* Standalone ORIGINAL 3D Floating Logo (Only Soft Realistic Shadows - NO Lighting Glows) */}
      <div
        style={{
          width: 'clamp(260px, 32vw, 360px)',
          height: 'clamp(260px, 32vw, 360px)',
          transformStyle: 'preserve-3d',
          transform: isHovered 
            ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(1.08) translateZ(25px)` 
            : `perspective(1000px) rotateX(6deg) rotateY(-6deg) scale(1) translateZ(0px)`,
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
          animation: isHovered ? 'none' : 'valliFloat3D 4.5s ease-in-out infinite',
          filter: isHovered
            ? 'drop-shadow(0 30px 50px rgba(0, 0, 0, 0.45)) drop-shadow(0 15px 25px rgba(0, 0, 0, 0.35))'
            : 'drop-shadow(0 18px 35px rgba(0, 0, 0, 0.35)) drop-shadow(0 8px 15px rgba(0, 0, 0, 0.25))'
        }}
      >
        <img 
          src="img/photo_6334613760290525705_y.jpg" 
          alt="VALLI FOODSTALL Original Logo" 
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            objectFit: 'cover',
            display: 'block'
          }}
        />
      </div>

      {/* Floating Metallic Spheres */}
      <div 
        style={{
          position: 'absolute',
          top: '10px',
          right: '20px',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #fef08a 0%, #ca8a04 60%, #451a03 100%)',
          boxShadow: '0 6px 14px rgba(0,0,0,0.3)',
          transform: isHovered ? 'translate3d(10px, -10px, 40px)' : 'translate3d(0, 0, 0)',
          transition: 'transform 0.3s ease',
          animation: 'spherePulse 3s ease-in-out infinite'
        }}
      />
      <div 
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '15px',
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 35% 35%, #94a3b8 0%, #0f172a 70%)',
          boxShadow: '0 4px 10px rgba(0,0,0,0.35)',
          transform: isHovered ? 'translate3d(-8px, 8px, 30px)' : 'translate3d(0, 0, 0)',
          transition: 'transform 0.3s ease'
        }}
      />

      <style>{`
        @keyframes valliFloat3D {
          0%, 100% {
            transform: perspective(1000px) rotateX(6deg) rotateY(-6deg) translateY(0px) scale(1);
          }
          50% {
            transform: perspective(1000px) rotateX(-5deg) rotateY(5deg) translateY(-12px) scale(1.02);
          }
        }
        @keyframes spherePulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
}
