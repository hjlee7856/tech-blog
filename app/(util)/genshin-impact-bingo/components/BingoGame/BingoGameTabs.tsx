'use client';

import { useMemo, type ReactNode } from 'react';

import {
  BadgeCount,
  BadgeDot,
  BottomNav,
  BottomNavBadgeCount,
  BottomNavBadgeDot,
  BottomNavButton,
  Content,
  TabBar,
  TabButton,
  TabPanel,
} from './BingoGameTabs.styles';

interface BingoGameTabsProps {
  activeTab: GameTabKey;
  onTabChange: (nextTab: GameTabKey) => void;
  gameHasDot?: boolean;
  chatBadgeCount?: number;
  gamePanel: ReactNode;
  rankingPanel: ReactNode;
  chatPanel: ReactNode;
}

type GameTabKey = 'game' | 'ranking' | 'chat';

export function BingoGameTabs({
  activeTab,
  onTabChange,
  gameHasDot = false,
  chatBadgeCount = 0,
  gamePanel,
  rankingPanel,
  chatPanel,
}: BingoGameTabsProps) {
  const labels = useMemo(
    () =>
      ({
        game: '게임',
        ranking: '순위',
        chat: '채팅',
      }) satisfies Record<GameTabKey, string>,
    [],
  );

  return (
    <>
      <TabBar>
        <TabButton
          type="button"
          isActive={activeTab === 'game'}
          onClick={() => onTabChange('game')}
        >
          {labels.game}
          {gameHasDot && <BadgeDot />}
        </TabButton>
        <TabButton
          type="button"
          isActive={activeTab === 'ranking'}
          onClick={() => onTabChange('ranking')}
        >
          {labels.ranking}
        </TabButton>
        <TabButton
          type="button"
          isActive={activeTab === 'chat'}
          onClick={() => onTabChange('chat')}
        >
          {labels.chat}
          {chatBadgeCount > 0 && <BadgeCount>{chatBadgeCount}</BadgeCount>}
        </TabButton>
      </TabBar>

      <Content>
        <TabPanel isActive={activeTab === 'game'} scrollMode="panel">
          {gamePanel}
        </TabPanel>
        <TabPanel isActive={activeTab === 'ranking'} scrollMode="none">
          {rankingPanel}
        </TabPanel>
        <TabPanel isActive={activeTab === 'chat'} scrollMode="none">
          {chatPanel}
        </TabPanel>
      </Content>

      <BottomNav>
        <BottomNavButton
          type="button"
          isActive={activeTab === 'game'}
          onClick={() => onTabChange('game')}
        >
          {labels.game}
          {gameHasDot && <BottomNavBadgeDot />}
        </BottomNavButton>
        <BottomNavButton
          type="button"
          isActive={activeTab === 'ranking'}
          onClick={() => onTabChange('ranking')}
        >
          {labels.ranking}
        </BottomNavButton>
        <BottomNavButton
          type="button"
          isActive={activeTab === 'chat'}
          onClick={() => onTabChange('chat')}
        >
          {labels.chat}
          {chatBadgeCount > 0 && (
            <BottomNavBadgeCount>{chatBadgeCount}</BottomNavBadgeCount>
          )}
        </BottomNavButton>
      </BottomNav>
    </>
  );
}
