'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

interface PostOverlayProps {
  title: string;
  subtitle?: string;
  category?: string;
  className?: string;
}

export function PostOverlay({
  title,
  subtitle,
  category,
  className,
}: PostOverlayProps) {
  const router = useRouter();

  const handleCategoryClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (category) {
      void router.push(`/?category=${encodeURIComponent(category)}`);
    }
  };

  return (
    <div
      className={className}
      aria-modal="true"
      role="dialog"
      style={{
        width: '100%',
        height: 'min(75vh, 450px)',
        position: 'absolute',
        inset: 0,
        zIndex: 5,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: 'min(70%, 900px)',
          minWidth: 320,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          textShadow: '0 2px 8px rgba(0, 0, 0, 0.6)',
        }}
      >
        {category && (
          <button
            type="button"
            onClick={handleCategoryClick}
            tabIndex={0}
            aria-label={`Go to category ${category}`}
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              color: '#fff',
              display: 'inline-block',
              fontSize: '0.9rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              opacity: 0.85,
              borderRadius: 22,
              border: '1px solid white',
              padding: '4px 14px',
              marginBottom: 8,
              cursor: 'pointer',
            }}
          >
            {category}
          </button>
        )}
        <h1
          style={{
            maxWidth: '90%',
            color: '#fff',
            fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
            fontWeight: 700,
            marginBottom: 10,
            wordBreak: 'keep-all',
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <h2
            style={{
              color: '#fff',
              fontSize: 'clamp(1rem, 2vw, 1.2rem)',
              fontWeight: 400,
              opacity: 0.92,
              margin: 0,
            }}
          >
            {subtitle}
          </h2>
        )}
      </div>
    </div>
  );
}
