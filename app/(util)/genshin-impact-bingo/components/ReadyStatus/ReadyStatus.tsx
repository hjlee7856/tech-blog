'use client';

import Image from 'next/image';
import { useMemo } from 'react';
import { getProfileImagePath } from '../../lib/auth';
import type { Player } from '../../lib/game';
import {
  Container,
  OnlineDot,
  PlayerInfo,
  PlayerItem,
  PlayerList,
  PlayerName,
  PlayerNameWrapper,
  ProfileImage,
  ReadyBadge,
  Title,
} from './ReadyStatus.styles';

interface ReadyStatusProps {
  userId?: number;
  players: Player[];
  onlineUserIds: number[];
  isPresenceSubscribed: boolean;
}

export function ReadyStatus({
  userId,
  players,
  onlineUserIds,
  isPresenceSubscribed,
}: ReadyStatusProps) {
  const visiblePlayers = useMemo(
    () => players.filter((player) => onlineUserIds.includes(player.id)),
    [onlineUserIds, players],
  );

  return (
    <Container>
      <Title>
        참가자 준비 상태
        {onlineUserIds.length > 0 && ` (온라인 ${onlineUserIds.length}명)`}
      </Title>
      <PlayerList>
        {visiblePlayers.map((player) => {
          const isMe = player.id === userId;
          const boardCount = player.board.filter(
            (item) => item !== null && item !== '',
          ).length;

          return (
            <PlayerItem key={player.id} isMe={isMe}>
              <PlayerInfo>
                <OnlineDot isOnline={onlineUserIds.includes(player.id)} />
                <ProfileImage>
                  <Image
                    src={getProfileImagePath(player.profile_image || 'Nahida')}
                    alt={player.name}
                    width={24}
                    height={24}
                    style={{ borderRadius: '50%', objectFit: 'cover' }}
                  />
                </ProfileImage>
                <PlayerNameWrapper>
                  <PlayerName>
                    {player.name}
                    {isMe && ' (나)'}
                  </PlayerName>
                  <ReadyBadge isReady={player.is_ready}>
                    {player.is_ready ? '준비완료' : `${boardCount}/25`}
                  </ReadyBadge>
                </PlayerNameWrapper>
              </PlayerInfo>
            </PlayerItem>
          );
        })}
        {visiblePlayers.length === 0 && (
          <PlayerItem>
            <PlayerName style={{ textAlign: 'center', color: '#B5BAC1' }}>
              {isPresenceSubscribed
                ? '온라인 참가자가 없습니다'
                : '온라인 상태 확인 중...'}
            </PlayerName>
          </PlayerItem>
        )}
      </PlayerList>
    </Container>
  );
}
