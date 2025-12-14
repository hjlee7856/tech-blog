import { styled } from 'styled-system/jsx';

export const Container = styled('div', {
  base: {
    width: '100%',
    maxWidth: '100%',
    backgroundColor: 'var(--bingo-surface)',
    borderRadius: '12px',
    padding: '12px',
    marginTop: '0px',
    md: {
      maxWidth: '600px',
      padding: '16px',
      marginTop: '0px',
    },
  },
});

export const OnlineDot = styled('span', {
  base: {
    display: 'inline-block',
    width: '8px',
    height: '8px',
    borderRadius: '9999px',
    marginRight: '6px',
    backgroundColor: 'var(--bingo-border-2)',
    flexShrink: 0,
  },
  variants: {
    isOnline: {
      true: {
        backgroundColor: 'var(--bingo-success)',
      },
    },
  },
});

export const Title = styled('h3', {
  base: {
    fontSize: '14px',
    fontWeight: 'bold',
    color: 'var(--bingo-text)',
    marginBottom: '10px',
    textAlign: 'center',
    md: {
      fontSize: '16px',
      marginBottom: '12px',
    },
  },
});

export const PlayerList = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
});

export const PlayerItem = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '6px 10px',
    backgroundColor: 'var(--bingo-surface-2)',
    color: 'var(--bingo-text)',
    borderRadius: '6px',
    md: {
      padding: '8px 12px',
      borderRadius: '8px',
    },
  },
  variants: {
    isMe: {
      true: {
        border: '2px solid var(--bingo-primary)',
      },
    },
  },
});

export const PlayerInfo = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    flex: 1,
    marginLeft: '8px',
    md: {
      gap: '8px',
    },
  },
});

export const ProfileImage = styled('div', {
  base: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    overflow: 'hidden',
    flexShrink: 0,
    md: {
      width: '24px',
      height: '24px',
    },
  },
});

export const PlayerNameWrapper = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    flex: 1,
  },
});

export const PlayerName = styled('span', {
  base: {
    fontSize: '12px',
    fontWeight: '600',
    color: 'var(--bingo-text)',
    md: {
      fontSize: '13px',
    },
  },
});

export const ReadyBadge = styled('span', {
  base: {
    fontSize: '10px',
    fontWeight: '500',
    padding: '2px 6px',
    borderRadius: '4px',
    width: 'fit-content',
    md: {
      fontSize: '11px',
      padding: '2px 8px',
    },
  },
  variants: {
    isReady: {
      true: {
        backgroundColor: 'var(--bingo-success)',
        color: 'var(--bingo-text)',
      },
      false: {
        backgroundColor: 'var(--bingo-primary)',
        color: 'var(--bingo-text)',
      },
    },
  },
});
