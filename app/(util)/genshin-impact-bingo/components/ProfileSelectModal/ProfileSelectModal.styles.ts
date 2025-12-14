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
    padding: '20px',
    width: '90%',
    maxWidth: { md: '400px', mdDown: '100%' },
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
    padding: '10px 14px',
    fontSize: '14px',
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

export const ListContainer = styled('div', {
  base: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    overflowY: 'auto',
    maxHeight: '300px',
    padding: '4px',
  },
});

export const CharacterButton = styled('button', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    padding: '8px 4px',
    backgroundColor: 'var(--bingo-surface-2)',
    color: 'var(--bingo-text)',
    border: '2px solid transparent',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    width: 'calc((100% - 16px) / 3)',
    _hover: {
      backgroundColor: 'var(--bingo-primary)',
    },
  },
  variants: {
    isSelected: {
      true: {
        borderColor: 'var(--bingo-primary)',
        backgroundColor: 'var(--bingo-primary-hover)',
      },
    },
  },
});

export const CharacterImage = styled('div', {
  base: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    overflow: 'hidden',
    flexShrink: 0,
  },
});

export const CharacterName = styled('span', {
  base: {
    fontSize: '9px',
    lineHeight: '1.2',
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});
