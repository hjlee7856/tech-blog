import { styled } from '@/styled-system/jsx';

export const Backdrop = styled('div', {
  base: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '16px',
  },
});

export const Modal = styled('div', {
  base: {
    width: '100%',
    maxWidth: '420px',
    backgroundColor: 'var(--bingo-surface)',
    borderRadius: '12px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
});

export const Title = styled('h2', {
  base: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'var(--bingo-text)',
    margin: 0,
  },
});

export const Description = styled('p', {
  base: {
    margin: 0,
    fontSize: '13px',
    lineHeight: '1.4',
    color: 'var(--bingo-text-muted)',
  },
});

export const ButtonRow = styled('div', {
  base: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '10px',
    marginTop: '8px',
  },
});

export const PrimaryButton = styled('button', {
  base: {
    padding: '12px 14px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: 'var(--bingo-primary)',
    color: 'var(--bingo-text)',
    fontWeight: '700',
    cursor: 'pointer',
    _hover: {
      backgroundColor: 'var(--bingo-primary-hover)',
    },
  },
});

export const SecondaryButton = styled('button', {
  base: {
    padding: '12px 14px',
    borderRadius: '10px',
    border: '1px solid var(--bingo-border)',
    backgroundColor: 'var(--bingo-page-bg)',
    color: 'var(--bingo-text)',
    fontWeight: '700',
    cursor: 'pointer',
    _hover: {
      backgroundColor: 'var(--bingo-surface-2)',
    },
  },
});
