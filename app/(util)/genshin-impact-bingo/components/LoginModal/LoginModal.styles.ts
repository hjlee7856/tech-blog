import { styled } from '@/styled-system/jsx';

export const Backdrop = styled('div', {
  base: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    background: 'var(--bingo-page-bg)',
  },
});

export const SpectatorButton = styled('button', {
  base: {
    padding: '12px',
    fontSize: '14px',
    fontWeight: 'bold',
    backgroundColor: 'var(--bingo-surface-2)',
    color: 'var(--bingo-text)',
    border: '1px solid var(--bingo-primary)',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    _hover: {
      backgroundColor: 'var(--bingo-border-2)',
    },
  },
});

export const Modal = styled('div', {
  base: {
    backgroundColor: 'var(--bingo-surface)',
    borderRadius: '12px',
    padding: '32px',
    width: '90%',
    maxWidth: '400px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
});

export const Title = styled('h2', {
  base: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    margin: 0,
  },
});

export const Form = styled('form', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
});

export const InputGroup = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
});

export const Label = styled('label', {
  base: {
    fontSize: '14px',
    color: 'var(--bingo-text-muted)',
    fontWeight: '500',
  },
});

export const Input = styled('input', {
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
      color: 'var(--bingo-text-subtle)',
    },
  },
});

export const SubmitButton = styled('button', {
  base: {
    padding: '14px',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: 'var(--bingo-primary)',
    color: 'var(--bingo-text)',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    _hover: {
      backgroundColor: 'var(--bingo-primary-hover)',
    },
    _disabled: {
      backgroundColor: 'var(--bingo-surface-2)',
      cursor: 'not-allowed',
    },
  },
});

export const ToggleButton = styled('button', {
  base: {
    backgroundColor: 'transparent',
    border: 'none',
    color: 'var(--bingo-primary)',
    fontSize: '14px',
    cursor: 'pointer',
    textDecoration: 'underline',
    _hover: {
      color: 'var(--bingo-primary)',
    },
  },
});

export const ErrorMessage = styled('p', {
  base: {
    color: 'var(--bingo-danger)',
    fontSize: '14px',
    textAlign: 'center',
    margin: 0,
  },
});

export const HelperText = styled('p', {
  base: {
    color: 'var(--bingo-text-muted)',
    fontSize: '12px',
    margin: 0,
  },
});

export const UserInfo = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px 16px',
    backgroundColor: 'var(--bingo-surface)',
    borderRadius: '8px',
  },
});

export const UserName = styled('span', {
  base: {
    color: 'var(--bingo-text)',
    fontSize: '14px',
    fontWeight: '500',
  },
});

export const LogoutButton = styled('button', {
  base: {
    padding: '6px 12px',
    fontSize: '13px',
    backgroundColor: 'var(--bingo-surface-2)',
    color: 'var(--bingo-text-muted)',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    _hover: {
      backgroundColor: 'var(--bingo-border-2)',
    },
  },
});
