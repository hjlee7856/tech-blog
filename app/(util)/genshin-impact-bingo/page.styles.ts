import { styled } from '@/styled-system/jsx';

export const Page = styled('div', {
  base: {
    position: 'relative',
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
    '--bingo-shadow-primary-button': '0 4px 12px rgba(88, 101, 242, 0.4)',
    '--bingo-shadow-danger-button': '0 4px 12px rgba(237, 66, 69, 0.4)',
    '--bingo-shadow-glow-green':
      '0 0 8px #4ade80, 0 0 16px #4ade80, inset 0 0 8px rgba(74, 222, 128, 0.3)',
    '--bingo-shadow-glow-gold':
      '0 0 8px #FFD700, 0 0 16px #FFD700, inset 0 0 8px rgba(255, 215, 0, 0.3)',
    backgroundColor: 'var(--bingo-page-bg)',
    color: 'var(--bingo-text)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxSizing: 'border-box',
    height: '100dvh',
    overflow: 'hidden',
    padding: '16px 12px',
    // 모바일 가로모드 지원
    '@media (max-width: 896px) and (orientation: landscape)': {
      padding: '12px 16px',
      height: '100dvh',
    },
  },
});

export const Title = styled('h1', {
  base: {
    textAlign: 'center',
    fontSize: '32px',
    fontWeight: 'bold',
    color: 'var(--bingo-text)',
    marginBottom: '12px',
    marginTop: { mdDown: '32px' },
    flexShrink: 0,
    // 모바일 가로모드
    '@media (max-width: 896px) and (orientation: landscape)': {
      fontSize: '24px',
      marginTop: '16px',
      marginBottom: '8px',
    },
  },
});
