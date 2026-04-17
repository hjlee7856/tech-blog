'use client';

import { useCallback, useEffect, useState } from 'react';
import { FiArrowUp } from 'react-icons/fi';

import { FloatButton, Grid } from 'antd';

export interface FloatingScrollTopButtonProps {
  threshold?: number;
  className?: string;
}

export function FloatingScrollTopButton({
  threshold = 100,
  className = '',
}: FloatingScrollTopButtonProps) {
  const screens = Grid.useBreakpoint();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  const handleClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  if (!isVisible) return null;

  return (
    <FloatButton
      className={className}
      icon={<FiArrowUp size={20} />}
      onClick={handleClick}
      tooltip="Back to top"
      style={{
        right: screens.lg ? 48 : 16,
        bottom: screens.lg ? 48 : 16,
      }}
    />
  );
}
