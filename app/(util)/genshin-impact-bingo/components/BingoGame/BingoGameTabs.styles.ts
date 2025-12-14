import { styled } from '@/styled-system/jsx';

export const TabBar = styled('div', {
  base: {
    display: 'none',
    width: '100%',
    maxWidth: '600px',
    gap: '0px',
    boxSizing: 'border-box',
    backgroundColor: '#1E1F22',
    border: '1px solid #3F4147',
    overflow: 'hidden',
    md: {
      display: 'flex',
      marginBottom: '16px',
    },
  },
});

export const BadgeDot = styled('span', {
  base: {
    position: 'absolute',
    top: '7px',
    right: '9px',
    width: '10px',
    height: '10px',
    display: 'block',
    borderRadius: '9999px',
    backgroundColor: '#ED4245',
    border: '1px solid rgba(17, 18, 20, 0.2)',
    zIndex: 2,
    pointerEvents: 'none',
  },
});

export const BadgeCount = styled('span', {
  base: {
    position: 'absolute',
    top: '6px',
    right: '8px',
    minWidth: '18px',
    height: '18px',
    paddingInline: '5px',
    borderRadius: '9999px',
    backgroundColor: '#ED4245',
    color: '#FFFFFF',
    fontSize: '11px',
    fontWeight: '800',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    pointerEvents: 'none',
  },
});

export const BottomNavBadgeDot = styled(BadgeDot, {
  base: {
    top: '9px',
    right: '13px',
  },
});

export const BottomNavBadgeCount = styled(BadgeCount, {
  base: {
    top: '6px',
    right: '8px',
  },
});

export const TabButton = styled('button', {
  base: {
    flex: 1,
    padding: '10px 12px',
    border: 'none',
    borderRadius: '0px',
    backgroundColor: '#2B2D31',
    color: '#B5BAC1',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    position: 'relative',
    '&:not(:last-child)': {
      borderRight: '1px solid rgba(63, 65, 71, 0.9)',
    },
    transition: 'background-color 0.15s ease, color 0.15s ease',
    _hover: {
      backgroundColor: '#313338',
      color: '#FFFFFF',
    },
  },
  variants: {
    isActive: {
      true: {
        backgroundColor: '#5865F2',
        color: '#FFFFFF',
        _hover: {
          backgroundColor: '#4752C4',
        },
      },
    },
  },
});

export const Content = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: '100%',
    flex: 1,
    height: '100%',
    overflowY: 'hidden',
    boxSizing: 'border-box',
    paddingBottom: '0px',
    md: {
      height: '100%',
      overflowY: 'hidden',
    },
  },
});

export const TabPanel = styled('div', {
  base: {
    display: 'none',
    width: '100%',
    maxWidth: '100%',
    flex: 1,
    minHeight: 0,
    boxSizing: 'border-box',
    paddingBottom: 'calc(58px + env(safe-area-inset-bottom))',
    md: {
      paddingBottom: '0px',
    },
  },
  variants: {
    isActive: {
      true: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        flex: 1,
        minHeight: 0,
      },
    },
    scrollMode: {
      panel: {
        overflowY: 'auto',
        md: {
          overflowY: 'auto',
        },
      },
      none: {
        overflowY: 'hidden',
      },
    },
  },
  defaultVariants: {
    scrollMode: 'panel',
  },
});

export const BottomNav = styled('nav', {
  base: {
    position: 'fixed',
    left: '12px',
    right: '12px',
    bottom: '10px',
    zIndex: 50,
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '0px',

    backgroundColor: 'rgba(30, 31, 34, 0.92)',
    border: '1px solid #2B2D31',
    borderRadius: '0px',
    overflow: 'hidden',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.28)',
    backdropFilter: 'blur(8px)',
    paddingBottom: 'calc(env(safe-area-inset-bottom + 12px))',
    md: {
      display: 'none',
    },
  },
});

export const BottomNavButton = styled('button', {
  base: {
    height: '46px',
    borderRadius: '0px',
    border: 'none',
    backgroundColor: '#2B2D31',
    color: '#B5BAC1',
    fontSize: '13px',
    fontWeight: '800',
    cursor: 'pointer',
    position: 'relative',
    '&:not(:last-child)': {
      borderRight: '1px solid rgba(63, 65, 71, 0.9)',
    },
    transition: 'background-color 0.15s ease, color 0.15s ease',
    _hover: {
      backgroundColor: '#313338',
      color: '#FFFFFF',
    },
  },
  variants: {
    isActive: {
      true: {
        backgroundColor: '#5865F2',
        color: '#FFFFFF',
        _hover: {
          backgroundColor: '#4752C4',
        },
      },
    },
  },
});
