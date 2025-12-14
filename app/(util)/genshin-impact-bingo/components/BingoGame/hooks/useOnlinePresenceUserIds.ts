'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

import {
  addPresenceListener,
  ensurePresenceSubscribed,
  getPresenceChannel,
} from './presenceClient';

interface UseOnlinePresenceUserIdsArgs {
  userId?: number;
  userName?: string;
  profileImage?: string;
}

interface UseOnlinePresenceUserIdsReturn {
  onlineUserIds: number[];
  isPresenceSubscribed: boolean;
}

export function useOnlinePresenceUserIds(
  args: UseOnlinePresenceUserIdsArgs = {},
): UseOnlinePresenceUserIdsReturn {
  const { userId, userName, profileImage } = args;

  const [onlineUserIds, setOnlineUserIds] = useState<number[]>([]);
  const [isPresenceSubscribed, setIsPresenceSubscribed] = useState(false);

  const presenceChannelRef = useRef<ReturnType<
    typeof getPresenceChannel
  > | null>(null);

  useEffect(() => {
    if (!userId) {
      setOnlineUserIds([]);
      setIsPresenceSubscribed(false);
      return;
    }

    const channel = getPresenceChannel({ userId });
    presenceChannelRef.current = channel;
    setIsPresenceSubscribed(false);

    const syncOnlineFromPresence = () => {
      const rawState = channel.presenceState() as unknown;
      const parsedState: Record<string, unknown> =
        typeof rawState === 'string'
          ? (JSON.parse(rawState) as Record<string, unknown>)
          : ((rawState || {}) as Record<string, unknown>);

      const allMetas = Object.values(parsedState).flatMap((bucket) =>
        Array.isArray(bucket) ? bucket : [],
      ) as Array<{ user_id?: number }>;

      const ids = allMetas.flatMap((meta) =>
        typeof meta.user_id === 'number' ? [meta.user_id] : [],
      );

      const uniqueSorted = Array.from(new Set(ids)).toSorted((a, b) => a - b);
      setOnlineUserIds(uniqueSorted);
    };

    const removeListener = addPresenceListener({
      onPresenceChange: () => syncOnlineFromPresence(),
    });

    ensurePresenceSubscribed({
      userId,
      onStatus: (status: string) => {
        console.log('[presence] subscribe status', {
          status,
          userId,
          presenceKey: String(userId),
        });

        if (status !== 'SUBSCRIBED') return;

        setIsPresenceSubscribed(true);
        void channel
          .track({
            user_id: userId,
            user_name: userName ?? `user-${userId}`,
            profile_image: profileImage,
            typing: false,
            sent_at: new Date().toISOString(),
          })
          .then((result: unknown) => {
            console.log('[presence] track result', { userId, result });
          })
          .catch((err: unknown) => {
            console.error('[presence] track error', { userId, err });
          });
        syncOnlineFromPresence();
      },
    });

    return () => {
      presenceChannelRef.current = null;
      setOnlineUserIds([]);
      setIsPresenceSubscribed(false);
      removeListener();
    };
  }, [profileImage, userId, userName]);

  const stableOnlineUserIds = useMemo(() => onlineUserIds, [onlineUserIds]);

  return {
    onlineUserIds: stableOnlineUserIds,
    isPresenceSubscribed,
  };
}
