import { supabase } from '@/lib/supabaseClient';

let presenceChannel: ReturnType<typeof supabase.channel> | null = null;
let presenceKey: string | null = null;
let subscribeStarted = false;
let lastSubscribeStatus: string | null = null;

type PresenceListener = () => void;
const presenceListeners = new Set<PresenceListener>();

interface GetPresenceChannelParams {
  userId: number;
}

function ensurePresenceChannel({ userId }: GetPresenceChannelParams) {
  const nextKey = String(userId);

  if (presenceChannel && presenceKey && presenceKey !== nextKey) {
    void supabase.removeChannel(presenceChannel);
    presenceChannel = null;
    presenceKey = null;
    subscribeStarted = false;
    lastSubscribeStatus = null;
  }

  if (presenceChannel) return presenceChannel;

  presenceKey = nextKey;
  presenceChannel = supabase.channel('presence', {
    config: {
      presence: {
        key: nextKey,
      },
    },
  });

  // presence 이벤트 핸들러는 반드시 1회만 등록
  presenceChannel
    .on('presence', { event: 'sync' }, () => {
      for (const listener of presenceListeners) listener();
    })
    .on('presence', { event: 'join' }, () => {
      for (const listener of presenceListeners) listener();
    })
    .on('presence', { event: 'leave' }, () => {
      for (const listener of presenceListeners) listener();
    });

  return presenceChannel;
}

interface AddPresenceListenerParams {
  onPresenceChange: PresenceListener;
}

export function addPresenceListener({
  onPresenceChange,
}: AddPresenceListenerParams): () => void {
  presenceListeners.add(onPresenceChange);
  return () => {
    presenceListeners.delete(onPresenceChange);
  };
}

interface EnsurePresenceSubscribedParams {
  userId: number;
  onStatus?: (status: string) => void;
}

export function ensurePresenceSubscribed({
  userId,
  onStatus,
}: EnsurePresenceSubscribedParams) {
  const channel = ensurePresenceChannel({ userId });

  if (onStatus && lastSubscribeStatus) onStatus(lastSubscribeStatus);
  if (subscribeStarted) return;
  subscribeStarted = true;

  channel.subscribe((status) => {
    lastSubscribeStatus = status;
    if (onStatus) onStatus(status);
  });
}

export function getPresenceChannel({ userId }: GetPresenceChannelParams) {
  return ensurePresenceChannel({ userId });
}
