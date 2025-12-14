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
  },
});

export const Modal = styled('div', {
  base: {
    backgroundColor: 'var(--bingo-surface)',
    borderRadius: '12px',
    padding: '24px',
    width: '90%',
    maxWidth: { md: '500px', mdDown: '100%' },
    maxHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
});

export const Header = styled('div', {
  base: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export const Title = styled('h2', {
  base: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'var(--bingo-text)',
    margin: 0,
  },
});

export const CloseButton = styled('button', {
  base: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--bingo-text-muted)',
    fontSize: '20px',
    cursor: 'pointer',
    padding: '4px 8px',
    _hover: {
      color: 'var(--bingo-text)',
    },
  },
});

export const SearchInput = styled('input', {
  base: {
    padding: '12px 16px',
    fontSize: '16px',
    backgroundColor: 'var(--bingo-page-bg)',
    border: '1px solid var(--bingo-border)',
    borderRadius: '8px',
    color: 'var(--bingo-text)',
    outline: 'none',
    _focus: {
      borderColor: 'var(--bingo-primary)',
    },
    _placeholder: {
      color: 'var(--bingo-text-muted)',
    },
  },
});

export const ClearCellButton = styled('button', {
  base: {
    padding: '10px 16px',
    fontSize: '14px',
    backgroundColor: 'var(--bingo-danger)',
    color: 'var(--bingo-text)',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    _hover: {
      backgroundColor: 'var(--bingo-danger-hover)',
    },
  },
});

export const ListContainer = styled('div', {
  base: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '8px',
    overflowY: 'auto',
    maxHeight: '400px',
    padding: '4px',
  },
});

export const EmptyMessage = styled('p', {
  base: {
    gridColumn: 'span 3',
    textAlign: 'center',
    color: 'var(--bingo-text-muted)',
    padding: '20px',
  },
});

export const CharacterButton = styled('button', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    padding: '8px 4px',
    fontSize: '11px',
    backgroundColor: 'var(--bingo-surface-2)',
    color: 'var(--bingo-text)',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    textAlign: 'center',
    wordBreak: 'keep-all',
    _hover: {
      backgroundColor: 'var(--bingo-primary)',
    },
  },
});

export const CharacterImage = styled('div', {
  base: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    overflow: 'hidden',
    flexShrink: 0,
  },
});

export const CharacterName = styled('span', {
  base: {
    fontSize: '10px',
    lineHeight: '1.2',
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});
