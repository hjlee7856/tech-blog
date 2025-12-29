import Link from 'next/link';

import { styled } from '@/styled-system/jsx';

export const HeaderContainer = styled('header', {
  base: {
    display: 'flex',
    width: '100%',
    height: '56px',
    backgroundColor: 'rgba(17, 24, 39, 0.96)',
    backdropFilter: 'blur(8px)',
    borderBottom: '1px solid rgba(0, 0, 0, 0.3)',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 50,
    alignItems: { pc: 'auto', pcDown: 'center' },
    paddingInline: { pc: '0', pcDown: '12px' },
  },
});

export const HeaderContent = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: '100%',
  },
});

export const HeaderLeft = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
});

export const HeaderTitle = styled('h1', {
  base: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#fff',
    margin: 0,
    textAlign: 'center',
    flex: 1,
    letterSpacing: '-0.5px',
  },
});

export const HeaderRight = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
});

export const HeaderNav = styled('nav', {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    color: '#fff',
  },
});

export const HeaderNavLink = styled(Link, {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    height: '32px',
    paddingInline: '10px',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#f9fafb',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    _visited: {
      color: '#f9fafb',
    },
    _hover: {
      backgroundColor: 'rgba(255, 255, 255, 0.12)',
      color: '#fff',
    },
    _active: {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
    },
  },
});

export const SidebarToggleButton = styled('button', {
  base: {
    backgroundColor: 'transparent',
    color: '#d1d5db',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 10px',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    display: { pc: 'none', pcDown: 'flex' },
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '500',
    _hover: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: '#fff',
    },
    _active: {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
    },
  },
});
