import { styled } from '@/styled-system/jsx';

export const Container = styled('div', {
  base: {
    minHeight: '100vh',
    '--bingo-page-bg': '#1E1F22',
    '--bingo-surface': '#2B2D31',
    '--bingo-surface-2': '#3F4147',
    '--bingo-surface-3': '#111214',
    '--bingo-border': '#3F4147',
    '--bingo-border-2': '#4F545C',
    '--bingo-offline': '#747F8D',
    '--bingo-text': '#FFFFFF',
    '--bingo-text-muted': '#B5BAC1',
    '--bingo-text-subtle': '#6D6F78',
    '--bingo-primary': '#5865F2',
    '--bingo-primary-hover': '#4752C4',
    '--bingo-danger': '#ED4245',
    '--bingo-danger-hover': '#C73E3A',
    '--bingo-success': '#3BA55C',
    '--bingo-success-hover': '#2D8049',
    '--bingo-warning': '#FAA61A',
    '--bingo-warning-hover': '#D99316',
    '--bingo-gold': '#FFD700',
    '--bingo-gold-bg': '#3d3520',
    '--bingo-matched-bg': '#1a4a2a',
    '--bingo-matched-text': '#4ade80',
    '--bingo-shadow-glow-green':
      '0 0 8px #4ade80, 0 0 16px #4ade80, inset 0 0 8px rgba(74, 222, 128, 0.3)',
    '--bingo-shadow-glow-gold':
      '0 0 8px #FFD700, 0 0 16px #FFD700, inset 0 0 8px rgba(255, 215, 0, 0.3)',
    backgroundColor: 'var(--bingo-page-bg)',
    color: 'var(--bingo-text)',
    padding: '20px 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    md: {
      padding: '40px 20px',
    },
  },
});

export const Title = styled('h1', {
  base: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'var(--bingo-text)',
    textAlign: 'center',
    marginBottom: '24px',
    md: {
      fontSize: '32px',
      marginBottom: '32px',
    },
  },
});

export const MainContent = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    minWidth: { md: '1000px', mdDown: '0' },
    maxWidth: { md: '1000px' },
    width: '100%',
    margin: '0 auto',
    md: {
      flexDirection: 'column',
      gap: '32px',
    },
  },
});

export const PlayerListSection = styled('div', {
  base: {
    flex: '0 0 auto',
    width: '100%',
    md: {
      width: '100%',
    },
  },
});

export const BoardSection = styled('div', {
  base: {
    flex: 1,
    width: '100%',
  },
});

export const SectionTitle = styled('h2', {
  base: {
    fontSize: '16px',
    fontWeight: '600',
    color: 'var(--bingo-text-muted)',
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    md: {
      fontSize: '18px',
      marginBottom: '16px',
    },
  },
});

export const PlayerList = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    maxHeight: '300px',
    overflowY: 'auto',
    md: {
      maxHeight: '600px',
    },
  },
});

export const PlayerCard = styled('button', {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    backgroundColor: 'var(--bingo-surface)',
    border: '2px solid transparent',
    borderRadius: '8px',
    transition: 'all 0.2s',
    textAlign: 'left',
    width: '100%',
    _hover: {
      backgroundColor: 'var(--bingo-surface-2)',
    },
  },
  variants: {
    isSelected: {
      true: {
        borderColor: 'var(--bingo-primary)',
        backgroundColor: 'var(--bingo-surface-2)',
      },
    },
    isOnline: {
      true: {},
      false: {
        opacity: 0.5,
      },
    },
  },
});

export const PlayerAvatar = styled('div', {
  base: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    overflow: 'hidden',
    flexShrink: 0,
    position: 'relative',
  },
});

export const OnlineIndicator = styled('div', {
  base: {
    position: 'absolute',
    bottom: '0',
    right: '0',
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    border: '2px solid var(--bingo-surface)',
  },
  variants: {
    isOnline: {
      true: {
        backgroundColor: 'var(--bingo-success)',
      },
      false: {
        backgroundColor: 'var(--bingo-offline)',
      },
    },
  },
});

export const PlayerInfo = styled('div', {
  base: {
    flex: 1,
    minWidth: 0,
  },
});

export const PlayerName = styled('p', {
  base: {
    fontSize: '14px',
    fontWeight: '600',
    color: 'white',
    margin: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
});

export const PlayerStatus = styled('p', {
  base: {
    fontSize: '13px',
    color: 'var(--bingo-text-muted)',
    margin: 0,
  },
});

export const PlayerScore = styled('div', {
  base: {
    fontSize: '15px',
    fontWeight: 'bold',
    color: 'var(--bingo-gold)',
    flexShrink: 0,
  },
});

export const BoardContainer = styled('div', {
  base: {
    backgroundColor: 'var(--bingo-surface)',
    borderRadius: '12px',
    padding: '16px',
    md: {
      padding: '24px',
    },
  },
});

export const SelectedPlayerHeader = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '16px',
    flexWrap: 'wrap',
    gap: '12px',
  },
});

export const SelectedPlayerInfo = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
});

export const SelectedPlayerName = styled('h3', {
  base: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: 'white',
    margin: 0,
    md: {
      fontSize: '22px',
    },
  },
});

export const ScoreBadge = styled('span', {
  base: {
    padding: '6px 12px',
    backgroundColor: 'var(--bingo-gold-bg)',
    color: 'var(--bingo-gold)',
    borderRadius: '20px',
    fontSize: '15px',
    fontWeight: 'bold',
  },
});

export const ReadyBadge = styled('span', {
  base: {
    padding: '4px 10px',
    borderRadius: '12px',
    fontSize: '13px',
    fontWeight: '600',
  },
  variants: {
    isReady: {
      true: {
        backgroundColor: 'var(--bingo-success)',
        color: 'var(--bingo-text)',
      },
      false: {
        backgroundColor: 'var(--bingo-offline)',
        color: 'var(--bingo-text)',
      },
    },
  },
});

export const EmptyState = styled('div', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    color: 'var(--bingo-text-muted)',
    textAlign: 'center',
  },
});

export const EmptyIcon = styled('div', {
  base: {
    fontSize: '48px',
    marginBottom: '16px',
  },
});

export const EmptyText = styled('p', {
  base: {
    fontSize: '16px',
    margin: 0,
  },
});

export const GameStatusBar = styled('div', {
  base: {
    position: 'relative',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '16px',
    padding: '12px 16px',
    backgroundColor: 'var(--bingo-surface)',
    borderRadius: '8px',
    marginBottom: '20px',
    flexWrap: 'wrap',
    md: {
      marginBottom: '32px',
      maxWidth: '1000px',
    },
  },
});

export const StatusItem = styled('div', {
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '15px',
    color: 'var(--bingo-text)',
  },
});

export const StatusLabel = styled('span', {
  base: {
    color: 'var(--bingo-text-muted)',
  },
});

export const StatusValue = styled('span', {
  base: {
    fontWeight: 'bold',
  },
  variants: {
    status: {
      started: {
        color: 'var(--bingo-success)',
      },
      waiting: {
        color: 'var(--bingo-warning)',
      },
      finished: {
        color: 'var(--bingo-danger)',
      },
    },
  },
});

export const DrawnNameDisplay = styled('div', {
  base: {
    padding: '8px 16px',
    backgroundColor: 'var(--bingo-gold-bg)',
    borderRadius: '8px',
    color: 'var(--bingo-gold)',
    fontWeight: 'bold',
    fontSize: '15px',
  },
});

// 관전용 보드 스타일
export const SpectatorBoard = styled('div', {
  base: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '4px',
    maxWidth: '100%',
    width: '100%',
    md: {
      gap: '8px',
      maxWidth: '500px',
      margin: '0 auto',
    },
  },
});

export const SpectatorCell = styled('div', {
  base: {
    aspectRatio: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    fontSize: '13px',
    fontWeight: '500',
    backgroundColor: 'var(--bingo-surface-2)',
    color: 'var(--bingo-text)',
    border: '1px solid var(--bingo-border-2)',
    borderRadius: '4px',
    padding: '2px',
    textAlign: 'center',
    wordBreak: 'keep-all',
    lineHeight: '1.1',
    overflow: 'hidden',
    md: {
      gap: '6px',
      fontSize: '15px',
      border: '2px solid var(--bingo-border-2)',
      borderRadius: '8px',
      padding: '4px',
    },
  },
});

export const MatchedSpectatorCell = styled('div', {
  base: {
    aspectRatio: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    fontSize: '13px',
    fontWeight: '600',
    backgroundColor: 'var(--bingo-matched-bg)',
    color: 'var(--bingo-matched-text)',
    border: '2px solid var(--bingo-matched-text)',
    borderRadius: '4px',
    padding: '2px',
    textAlign: 'center',
    wordBreak: 'keep-all',
    lineHeight: '1.1',
    overflow: 'hidden',
    boxShadow: 'var(--bingo-shadow-glow-green)',
    md: {
      gap: '6px',
      fontSize: '15px',
      border: '3px solid var(--bingo-matched-text)',
      borderRadius: '8px',
      padding: '4px',
      boxShadow: 'var(--bingo-shadow-glow-green)',
    },
  },
});

export const BingoLineSpectatorCell = styled('div', {
  base: {
    aspectRatio: '1',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
    fontSize: '8px',
    fontWeight: '600',
    backgroundColor: 'var(--bingo-gold-bg)',
    color: 'var(--bingo-gold)',
    border: '2px solid var(--bingo-gold)',
    borderRadius: '4px',
    padding: '2px',
    textAlign: 'center',
    wordBreak: 'keep-all',
    lineHeight: '1.1',
    overflow: 'hidden',
    boxShadow: 'var(--bingo-shadow-glow-gold)',
    md: {
      gap: '6px',
      fontSize: '10px',
      border: '3px solid var(--bingo-gold)',
      borderRadius: '8px',
      padding: '4px',
      boxShadow: 'var(--bingo-shadow-glow-gold)',
    },
  },
});

export const CellImage = styled('div', {
  base: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    overflow: 'hidden',
    flexShrink: 0,
    md: {
      width: '36px',
      height: '36px',
    },
  },
});

export const CellName = styled('span', {
  base: {
    fontSize: '13px',
    lineHeight: '1.1',
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'wrap',
    md: {
      fontSize: '15px',
    },
  },
});

export const TurnIndicator = styled('span', {
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    padding: '4px 8px',
    backgroundColor: 'var(--bingo-primary)',
    color: 'var(--bingo-text)',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: '600',
    md: {
      fontSize: '12px',
    },
  },
});

// 뽑은 이름 목록 스타일
export const DrawnNamesSection = styled('div', {
  base: {
    width: '100%',
    maxWidth: '1000px',
    backgroundColor: 'var(--bingo-surface)',
    borderRadius: '12px',
    padding: '16px',
    marginTop: '16px',
    md: {
      padding: '20px',
      marginTop: '24px',
    },
  },
});

export const DrawnNamesTitle = styled('h3', {
  base: {
    fontSize: '14px',
    fontWeight: '600',
    color: 'var(--bingo-text-muted)',
    marginBottom: '12px',
    md: {
      fontSize: '16px',
    },
  },
});

export const DrawnNamesList = styled('div', {
  base: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
    maxHeight: '150px',
    overflowY: 'auto',
    md: {
      maxHeight: '200px',
    },
  },
});

export const DrawnNameTag = styled('span', {
  base: {
    padding: '4px 10px',
    fontSize: '12px',
    fontWeight: '500',
    color: 'var(--bingo-text-muted)',
    backgroundColor: 'var(--bingo-surface-2)',
    borderRadius: '12px',
    md: {
      padding: '6px 12px',
      fontSize: '13px',
    },
  },
  variants: {
    isLatest: {
      true: {
        backgroundColor: 'var(--bingo-primary)',
        color: 'var(--bingo-text)',
      },
    },
  },
});
