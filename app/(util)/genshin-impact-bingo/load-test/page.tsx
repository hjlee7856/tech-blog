'use client';

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
} from 'react';

import { supabase } from '@/lib/supabaseClient';

import { styles } from './styles';

interface LoadTestConfig {
  virtualUsers: number;
  intervalMs: number;
  jitterMs: number;
  includeGameState: boolean;
  includePlayers: boolean;
  includeChat: boolean;
  enableWrites: boolean;
  writeRatio: number;
}

interface Sample {
  id: string;
  at: number;
  op: OperationName;
  ms: number;
  ok: boolean;
  error?: string;
}

type OperationName =
  | 'game_state'
  | 'players'
  | 'chat'
  | 'write_last_seen'
  | 'write_bingo_message';

interface OpStats {
  total: number;
  ok: number;
  error: number;
  inFlight: number;
  lastError?: string;
  msSamples: number[];
}

type HealthLevel = 'good' | 'warn' | 'bad';

interface HealthSummary {
  level: HealthLevel;
  title: string;
  detail: string;
}

const DEFAULT_CONFIG: LoadTestConfig = {
  virtualUsers: 25,
  intervalMs: 800,
  jitterMs: 400,
  includeGameState: true,
  includePlayers: true,
  includeChat: false,
  enableWrites: false,
  writeRatio: 0.15,
};

const SAMPLE_WINDOW = 400;
const LOG_WINDOW = 120;

const EVENT_PRESETS = {
  readOnly25: {
    label: '25명: 읽기 위주',
    config: {
      virtualUsers: 25,
      intervalMs: 1000,
      jitterMs: 500,
      includeGameState: true,
      includePlayers: true,
      includeChat: false,
      enableWrites: false,
      writeRatio: 0.0,
    },
    note: '게임 대기/진행 중 클라이언트가 주로 하는 select 부하를 재현',
  },
  readChat25: {
    label: '25명: 읽기 + 채팅 조회',
    config: {
      virtualUsers: 25,
      intervalMs: 1200,
      jitterMs: 600,
      includeGameState: true,
      includePlayers: true,
      includeChat: true,
      enableWrites: false,
      writeRatio: 0.0,
    },
    note: '채팅 리스트 조회(select)까지 포함한 읽기 부하',
  },
  writeLight25: {
    label: '25명: 가벼운 쓰기',
    config: {
      virtualUsers: 25,
      intervalMs: 1500,
      jitterMs: 700,
      includeGameState: true,
      includePlayers: true,
      includeChat: false,
      enableWrites: true,
      writeRatio: 0.1,
    },
    note: '이벤트성으로 간헐적인 update(last_seen/bingo_message)까지 포함',
  },
} satisfies Record<
  string,
  {
    label: string;
    note: string;
    config: LoadTestConfig;
  }
>;

export default function Page() {
  const [config, setConfig] = useState<LoadTestConfig>(DEFAULT_CONFIG);
  const [isRunning, setIsRunning] = useState(false);
  const [tick, setTick] = useState(0);
  const [logs, setLogs] = useState<Sample[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [userIdsInput, setUserIdsInput] = useState('');
  const [isFetchingUserIds, setIsFetchingUserIds] = useState(false);
  const [userIdsError, setUserIdsError] = useState<string | null>(null);
  const [isCreatingTestUsers, setIsCreatingTestUsers] = useState(false);
  const [testUsersProgress, setTestUsersProgress] = useState<string | null>(
    null,
  );

  const runIdRef = useRef<string | null>(null);
  const isRunningRef = useRef(false);
  const statsRef = useRef<Record<OperationName, OpStats>>({
    game_state: createEmptyStats(),
    players: createEmptyStats(),
    chat: createEmptyStats(),
    write_last_seen: createEmptyStats(),
    write_bingo_message: createEmptyStats(),
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const totalsRef = useRef({
    startedAt: 0,
    total: 0,
    ok: 0,
    error: 0,
    inFlight: 0,
  });

  useEffect(() => {
    if (!isRunning) return;

    const id = setInterval(() => {
      setTick((prev) => prev + 1);
    }, 500);

    return () => {
      clearInterval(id);
    };
  }, [isRunning]);

  const metrics = useMemo(() => {
    const now = Date.now();
    const totals = totalsRef.current;
    const elapsedMs = totals.startedAt
      ? Math.max(1, now - totals.startedAt)
      : 1;
    const rps = (totals.total / elapsedMs) * 1000;

    const errorRate = totals.total > 0 ? totals.error / totals.total : 0;

    const opStats = statsRef.current;

    return {
      now,
      elapsedMs,
      rps,
      errorRate,
      totals: { ...totals },
      perOp: {
        game_state: computeStatsView(opStats.game_state),
        players: computeStatsView(opStats.players),
        chat: computeStatsView(opStats.chat),
        write_last_seen: computeStatsView(opStats.write_last_seen),
        write_bingo_message: computeStatsView(opStats.write_bingo_message),
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick]);

  const health = useMemo((): HealthSummary => {
    if (!isRunning)
      return {
        level: 'good',
        title: '대기',
        detail: '테스트를 시작하면 판정이 표시됩니다.',
      };

    if (metrics.totals.total < 30)
      return {
        level: 'warn',
        title: '워밍업',
        detail: '표본이 적습니다. 30회 이상 누적 후 판단해 주세요.',
      };

    const p95Candidates = [
      metrics.perOp.game_state.p95,
      metrics.perOp.players.p95,
      metrics.perOp.chat.p95,
    ].flatMap((v) => (typeof v === 'number' ? [v] : []));

    const maxP95 = p95Candidates.length > 0 ? Math.max(...p95Candidates) : 0;
    const errorRate = metrics.errorRate;

    if (errorRate >= 0.02 || maxP95 >= 2000)
      return {
        level: 'bad',
        title: '위험',
        detail: `에러율 ${(errorRate * 100).toFixed(2)}% 또는 p95 ${Math.round(maxP95)}ms가 높습니다. 무료 플랜에서 불안정할 수 있습니다.`,
      };

    if (errorRate >= 0.005 || maxP95 >= 1200)
      return {
        level: 'warn',
        title: '주의',
        detail: `에러율 ${(errorRate * 100).toFixed(2)}% 또는 p95 ${Math.round(maxP95)}ms가 상승 중입니다. 이벤트 당일 채팅/요청 폭주를 조심하세요.`,
      };

    return {
      level: 'good',
      title: '양호',
      detail: `에러율 ${(errorRate * 100).toFixed(2)}%, p95 최대 ${Math.round(maxP95)}ms`,
    };
  }, [isRunning, metrics]);

  const userIds = useMemo(() => parseUserIds(userIdsInput), [userIdsInput]);

  const applyPreset = (key: keyof typeof EVENT_PRESETS) => {
    const preset = EVENT_PRESETS[key];
    if (!preset) return;
    setConfig(preset.config);
  };

  const start = async () => {
    if (isRunningRef.current) return;

    if (config.enableWrites && userIds.length === 0) {
      const loaded = await fetchAndApplyTestUserIds({
        limit: config.virtualUsers,
        setIsFetchingUserIds,
        setUserIdsError,
        setUserIdsInput,
      });
      if (!loaded) return;
    }

    resetStats();

    const runId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    runIdRef.current = runId;
    isRunningRef.current = true;
    totalsRef.current.startedAt = Date.now();
    setIsRunning(true);

    for (let i = 0; i < config.virtualUsers; i += 1) {
      void runVirtualUser({
        runId,
        userIndex: i,
        config,
        userIds,
        isRunningRef,
        runIdRef,
        totalsRef,
        statsRef,
        onSample: (sample) => {
          appendLog(sample);
        },
      });
    }
  };

  const stop = () => {
    isRunningRef.current = false;
    runIdRef.current = null;
    setIsRunning(false);
  };

  const resetStats = () => {
    totalsRef.current = {
      startedAt: 0,
      total: 0,
      ok: 0,
      error: 0,
      inFlight: 0,
    };

    statsRef.current = {
      game_state: createEmptyStats(),
      players: createEmptyStats(),
      chat: createEmptyStats(),
      write_last_seen: createEmptyStats(),
      write_bingo_message: createEmptyStats(),
    };

    setLogs([]);
    setTick((prev) => prev + 1);
  };

  const appendLog = (sample: Sample) => {
    setLogs((prev) => {
      const next = [sample, ...prev];
      if (next.length <= LOG_WINDOW) return next;
      return next.slice(0, LOG_WINDOW);
    });
  };

  return (
    <main style={styles.page}>
      <div style={styles.header}>
        <div>
          <div style={styles.title}>Genshin Bingo Load Test</div>
          <div style={styles.subTitle}>
            브라우저 한 탭에서 가상 유저를 만들어 Supabase 쿼리를 반복
            실행합니다
          </div>

          <div style={styles.subCardTitle}>25인 기준 판정</div>
          <div
            style={{
              ...styles.healthBox,
              ...(health.level === 'good'
                ? styles.healthGood
                : health.level === 'warn'
                  ? styles.healthWarn
                  : styles.healthBad),
            }}
          >
            <div style={styles.healthTitleRow}>
              <div style={styles.healthTitle}>{health.title}</div>
              <div style={styles.healthBadge}>{health.level.toUpperCase()}</div>
            </div>
            <div style={styles.healthDetail}>{health.detail}</div>
            <div style={styles.healthDetail}>
              권장 기준(가이드):
              <div style={{ marginTop: 6 }}>
                - 에러율 0.5% 미만 & p95 1200ms 미만: 대체로 OK
              </div>
              <div>- 에러율 2% 이상 또는 p95 2000ms 이상: 위험 신호</div>
            </div>
          </div>
        </div>

        <div style={styles.actions}>
          <button
            type="button"
            onClick={() => void start()}
            disabled={isRunning}
            style={{
              ...styles.button,
              ...(isRunning ? styles.buttonDisabled : styles.buttonPrimary),
            }}
          >
            시작
          </button>
          <button
            type="button"
            onClick={stop}
            disabled={!isRunning}
            style={{
              ...styles.button,
              ...(!isRunning ? styles.buttonDisabled : styles.buttonDanger),
            }}
          >
            정지
          </button>
          <button
            type="button"
            onClick={resetStats}
            style={{ ...styles.button, ...styles.buttonGhost }}
          >
            리셋
          </button>
        </div>
      </div>

      <section style={styles.grid}>
        <div style={styles.card}>
          <div style={styles.cardTitle}>설정</div>

          <div style={styles.subCardTitle}>25인(송년회) 프리셋</div>
          <div style={styles.presetGrid}>
            {Object.entries(EVENT_PRESETS).map(([key, preset]) => (
              <button
                key={key}
                type="button"
                disabled={isRunning}
                onClick={() => applyPreset(key as keyof typeof EVENT_PRESETS)}
                style={{
                  ...styles.button,
                  ...(isRunning ? styles.buttonDisabled : styles.buttonGhost),
                }}
                title={preset.note}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <div style={styles.formGrid}>
            <label style={styles.label}>
              가상 유저 수
              <input
                style={styles.input}
                type="number"
                min={1}
                max={200}
                value={config.virtualUsers}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    virtualUsers: clampInt(e.target.value, 1, 200),
                  }))
                }
                disabled={isRunning}
              />
            </label>

            <label style={styles.label}>
              유저당 주기(ms)
              <input
                style={styles.input}
                type="number"
                min={100}
                max={10_000}
                value={config.intervalMs}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    intervalMs: clampInt(e.target.value, 100, 10_000),
                  }))
                }
                disabled={isRunning}
              />
            </label>

            <label style={styles.label}>
              지터(ms)
              <input
                style={styles.input}
                type="number"
                min={0}
                max={10_000}
                value={config.jitterMs}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    jitterMs: clampInt(e.target.value, 0, 10_000),
                  }))
                }
                disabled={isRunning}
              />
            </label>

            <div style={styles.checkboxCol}>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={config.includeGameState}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      includeGameState: e.target.checked,
                    }))
                  }
                  disabled={isRunning}
                />
                game_state (select)
              </label>

              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={config.includePlayers}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      includePlayers: e.target.checked,
                    }))
                  }
                  disabled={isRunning}
                />
                players (select)
              </label>

              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={config.includeChat}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      includeChat: e.target.checked,
                    }))
                  }
                  disabled={isRunning}
                />
                chat (select)
              </label>

              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={config.enableWrites}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      enableWrites: e.target.checked,
                    }))
                  }
                  disabled={isRunning}
                />
                writes (update)
              </label>
            </div>
          </div>

          <div style={styles.writeRow}>
            <label style={styles.label}>
              write ratio (0~1)
              <input
                style={styles.input}
                type="number"
                min={0}
                max={1}
                step={0.05}
                value={config.writeRatio}
                onChange={(e) =>
                  setConfig((prev) => ({
                    ...prev,
                    writeRatio: clampFloat(e.target.value, 0, 1),
                  }))
                }
                disabled={isRunning}
              />
            </label>

            <label style={styles.label}>
              write userIds (comma)
              <input
                style={styles.input}
                placeholder="예: 1,2,3,4,5"
                value={userIdsInput}
                onChange={(e) => setUserIdsInput(e.target.value)}
                disabled={isRunning}
              />
            </label>

            <div style={styles.hintSmall}>
              <div>
                enableWrites를 켜면 DB를 실제로 변경합니다. 테스트용 계정 id만
                넣으세요. (현재 구현 write: last_seen, bingo_message)
              </div>
            </div>
          </div>

          <div style={styles.testUsersSection}>
            <div style={styles.testUsersTitle}>테스트 전용 계정</div>
            <div style={styles.testUsersActions}>
              <button
                type="button"
                onClick={() =>
                  void fetchAndApplyTestUserIds({
                    limit: config.virtualUsers,
                    setIsFetchingUserIds,
                    setUserIdsError,
                    setUserIdsInput,
                  })
                }
                disabled={isRunning || isFetchingUserIds}
                style={{
                  ...styles.button,
                  ...(isRunning || isFetchingUserIds
                    ? styles.buttonDisabled
                    : styles.buttonGhost),
                }}
              >
                {isFetchingUserIds
                  ? 'ID 불러오는 중...'
                  : '테스트 유저 ID 불러오기'}
              </button>

              <button
                type="button"
                onClick={() =>
                  void createTestUsers({
                    count: config.virtualUsers,
                    setIsCreatingTestUsers,
                    setTestUsersProgress,
                    setUserIdsError,
                    setUserIdsInput,
                  })
                }
                disabled={isRunning || isCreatingTestUsers}
                style={{
                  ...styles.button,
                  ...(isRunning || isCreatingTestUsers
                    ? styles.buttonDisabled
                    : styles.buttonGhost),
                }}
              >
                {isCreatingTestUsers
                  ? '계정 생성 중...'
                  : `테스트 계정 ${config.virtualUsers}개 생성`}
              </button>
            </div>

            {(testUsersProgress || userIdsError) && (
              <div style={styles.testUsersStatus}>
                {testUsersProgress && (
                  <div style={{ opacity: 0.9, fontWeight: 700 }}>
                    {testUsersProgress}
                  </div>
                )}
                {userIdsError && (
                  <div style={{ color: '#ef4444', fontWeight: 700 }}>
                    {userIdsError}
                  </div>
                )}
              </div>
            )}
          </div>

          <div style={styles.hint}>
            시작 전에 실제 게임 페이지를 25명으로 띄우는 대신, 여기서 “읽기
            부하”를 재현할 수 있습니다. (쓰기 부하는 일부러 넣지 않았습니다)
          </div>

          <div style={styles.hint}>
            25인 이벤트 기준 권장 흐름:
            <div style={{ marginTop: 6 }}>
              1) "25명: 읽기 위주"로 1~2분 실행
            </div>
            <div>2) 채팅도 자주 쓰면 "25명: 읽기 + 채팅 조회"로 1~2분 실행</div>
            <div>3) enableWrites는 테스트 계정에만 사용 (userIds 필수)</div>
            <div style={{ marginTop: 6 }}>
              무료 플랜 안정성은 보통 "error 증가" 또는 "ms(p95) 급증"으로 먼저
              드러납니다.
            </div>
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}>요약</div>

          <div style={styles.kvGrid}>
            <div>
              <div style={styles.k}>상태</div>
              <div style={styles.v}>{isRunning ? 'RUNNING' : 'STOPPED'}</div>
            </div>
            <div>
              <div style={styles.k}>RPS</div>
              <div style={styles.v}>{metrics.rps.toFixed(1)}</div>
            </div>
            <div>
              <div style={styles.k}>총 요청</div>
              <div style={styles.v}>{metrics.totals.total}</div>
            </div>
            <div>
              <div style={styles.k}>성공</div>
              <div style={styles.v}>{metrics.totals.ok}</div>
            </div>
            <div>
              <div style={styles.k}>에러</div>
              <div style={styles.v}>{metrics.totals.error}</div>
            </div>
            <div>
              <div style={styles.k}>in-flight</div>
              <div style={styles.v}>{metrics.totals.inFlight}</div>
            </div>
          </div>

          <div style={styles.subCardTitle}>브라우저 리소스</div>
          <div style={styles.kvGrid}>
            <div>
              <div style={styles.k}>UA</div>
              <div style={styles.vSmall}>
                {isMounted ? window.navigator.userAgent : '-'}
              </div>
            </div>
            <div>
              <div style={styles.k}>JS Heap</div>
              <div style={styles.v}>
                {isMounted ? formatBytes(getJsHeapUsedBytes()) : '-'}
              </div>
            </div>
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.cardTitle}>오퍼레이션별 통계</div>

          <OpRow title="game_state" stats={metrics.perOp.game_state} />
          <OpRow title="players" stats={metrics.perOp.players} />
          <OpRow title="chat" stats={metrics.perOp.chat} />
          <OpRow
            title="write_last_seen"
            stats={metrics.perOp.write_last_seen}
          />
          <OpRow
            title="write_bingo_message"
            stats={metrics.perOp.write_bingo_message}
          />
        </div>

        <div style={{ ...styles.card, ...styles.fullWidth }}>
          <div style={styles.cardTitle}>최근 로그</div>
          <div style={styles.logBox}>
            {logs.length === 0 && <div style={styles.logEmpty}>로그 없음</div>}
            {logs.map((l) => (
              <div key={l.id} style={styles.logRow}>
                <span style={styles.logAt}>{formatTime(l.at)}</span>
                <span style={styles.logOp}>{l.op}</span>
                <span style={l.ok ? styles.logOk : styles.logErr}>
                  {l.ok ? 'OK' : 'ERR'}
                </span>
                <span style={styles.logMs}>{l.ms.toFixed(0)}ms</span>
                {!l.ok && (
                  <span style={styles.logMsg} title={l.error}>
                    {l.error}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{ ...styles.card, ...styles.fullWidth }}>
          <div style={styles.cardTitle}>게임 로직 Smoke Test 체크리스트</div>
          <div style={styles.hint}>
            아래 항목이 모두 통과하면(특히 자동 시작/종료/리셋) 이벤트 당일 운영
            리스크가 크게 줄어듭니다.
            <div style={{ marginTop: 10, display: 'grid', gap: 8 }}>
              <div>
                1) 온라인 2명 이상 + 보드 25칸 완성 → (온라인 보드완성자 전원)
                준비 완료 시 자동 시작
              </div>
              <div>
                2) 온라인 보드완성자 중 1명이라도 준비 안 함 → 자동 시작 안 됨
                (관리자 강제 시작으로만 시작)
              </div>
              <div>
                3) 게임 종료(승리) 시 종료 모달에 “게임 참가자(order&gt;0)”만
                랭킹 표시
              </div>
              <div>4) 관리자 게임 초기화(reset) 시 종료 모달이 즉시 닫힘</div>
              <div>
                5) 빠른 채팅 연타 시 rate limit으로 과부하 방지 동작 확인
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function OpRow({
  title,
  stats,
}: {
  title: OperationName;
  stats: {
    total: number;
    ok: number;
    error: number;
    inFlight: number;
    p50: number | null;
    p95: number | null;
    avg: number | null;
    lastError?: string;
  };
}) {
  return (
    <div style={styles.opRow}>
      <div style={styles.opName}>{title}</div>
      <div style={styles.opMetrics}>
        <div>
          <div style={styles.k}>total</div>
          <div style={styles.v}>{stats.total}</div>
        </div>
        <div>
          <div style={styles.k}>ok</div>
          <div style={styles.v}>{stats.ok}</div>
        </div>
        <div>
          <div style={styles.k}>err</div>
          <div style={styles.v}>{stats.error}</div>
        </div>
        <div>
          <div style={styles.k}>in-flight</div>
          <div style={styles.v}>{stats.inFlight}</div>
        </div>
        <div>
          <div style={styles.k}>avg</div>
          <div style={styles.v}>
            {stats.avg ? `${stats.avg.toFixed(0)}ms` : '-'}
          </div>
        </div>
        <div>
          <div style={styles.k}>p50</div>
          <div style={styles.v}>
            {stats.p50 ? `${stats.p50.toFixed(0)}ms` : '-'}
          </div>
        </div>
        <div>
          <div style={styles.k}>p95</div>
          <div style={styles.v}>
            {stats.p95 ? `${stats.p95.toFixed(0)}ms` : '-'}
          </div>
        </div>
      </div>
      {stats.lastError && (
        <div style={styles.opLastError} title={stats.lastError}>
          lastError: {stats.lastError}
        </div>
      )}
    </div>
  );
}

async function runVirtualUser({
  runId,
  userIndex,
  config,
  userIds,
  isRunningRef,
  runIdRef,
  totalsRef,
  statsRef,
  onSample,
}: {
  runId: string;
  userIndex: number;
  config: LoadTestConfig;
  userIds: number[];
  isRunningRef: MutableRefObject<boolean>;
  runIdRef: MutableRefObject<string | null>;
  totalsRef: MutableRefObject<{
    startedAt: number;
    total: number;
    ok: number;
    error: number;
    inFlight: number;
  }>;
  statsRef: MutableRefObject<Record<OperationName, OpStats>>;
  onSample: (sample: Sample) => void;
}) {
  const sleepBase = Math.max(10, config.intervalMs);

  while (isSameRun({ runId, runIdRef }) && isGlobalRunning(isRunningRef)) {
    const ops = buildOps(config);
    if (ops.length === 0) {
      await sleep(sleepBase);
      continue;
    }

    const shouldWrite =
      config.enableWrites &&
      userIds.length > 0 &&
      Math.random() < clampFloat(String(config.writeRatio), 0, 1);

    const op = shouldWrite
      ? pickWriteOp({ userIndex })
      : ops[userIndex % ops.length];
    if (!op) {
      await sleep(sleepBase);
      continue;
    }
    const started = performance.now();

    incInFlight({ op, totalsRef, statsRef });

    try {
      await executeOp({
        op,
        runId,
        userIndex,
        userIds,
      });
      const ms = performance.now() - started;
      recordSample({
        op,
        ms,
        ok: true,
        totalsRef,
        statsRef,
        onSample,
      });
    } catch (err) {
      const ms = performance.now() - started;
      recordSample({
        op,
        ms,
        ok: false,
        error: toErrorString(err),
        totalsRef,
        statsRef,
        onSample,
      });
    } finally {
      decInFlight({ op, totalsRef, statsRef });
    }

    const jitter =
      config.jitterMs > 0 ? Math.floor(Math.random() * config.jitterMs) : 0;
    await sleep(sleepBase + jitter);
  }
}

function buildOps(config: LoadTestConfig): OperationName[] {
  const ops: OperationName[] = [];
  if (config.includeGameState) ops.push('game_state');
  if (config.includePlayers) ops.push('players');
  if (config.includeChat) ops.push('chat');
  return ops;
}

function pickWriteOp({ userIndex }: { userIndex: number }): OperationName {
  const choices: OperationName[] = ['write_last_seen', 'write_bingo_message'];
  return choices[userIndex % choices.length] ?? 'write_last_seen';
}

async function executeOp({
  op,
  runId,
  userIndex,
  userIds,
}: {
  op: OperationName;
  runId: string;
  userIndex: number;
  userIds: number[];
}) {
  if (op === 'game_state') {
    const { error } = await supabase
      .from('genshin-bingo-game-state')
      .select('*')
      .eq('id', 1)
      .single();

    if (error) throw error;
    return;
  }

  if (op === 'players') {
    const { error } = await supabase
      .from('genshin-bingo-game-user')
      .select(
        'id, name, score, order, board, is_admin, is_ready, profile_image',
      )
      .order('order', { ascending: true });

    if (error) throw error;
    return;
  }

  if (op === 'chat') {
    const { error } = await supabase
      .from('genshin-bingo-chat')
      .select(
        'id, user_id, user_name, profile_image, message, is_boast, rank, created_at',
      )
      .order('created_at', { ascending: false })
      .limit(30);

    if (error) throw error;
    return;
  }

  const targetUserId =
    userIds.length > 0 ? userIds[userIndex % userIds.length] : null;
  if (!targetUserId) throw new Error('write_enabled_but_no_user_ids');

  if (op === 'write_last_seen') {
    const { error } = await supabase
      .from('genshin-bingo-game-user')
      .update({ last_seen: new Date().toISOString() })
      .eq('id', targetUserId);

    if (error) throw error;
    return;
  }

  if (op === 'write_bingo_message') {
    const message = `load-test:${runId}:${targetUserId}:${Date.now()}`;
    const { error } = await supabase
      .from('genshin-bingo-game-user')
      .update({
        bingo_message: message,
        bingo_message_at: new Date().toISOString(),
      })
      .eq('id', targetUserId);

    if (error) throw error;
  }
}

function recordSample({
  op,
  ms,
  ok,
  error,
  totalsRef,
  statsRef,
  onSample,
}: {
  op: OperationName;
  ms: number;
  ok: boolean;
  error?: string;
  totalsRef: MutableRefObject<{
    startedAt: number;
    total: number;
    ok: number;
    error: number;
    inFlight: number;
  }>;
  statsRef: MutableRefObject<Record<OperationName, OpStats>>;
  onSample: (sample: Sample) => void;
}) {
  const now = Date.now();

  const totals = totalsRef.current;
  totals.total += 1;
  totals.inFlight = Math.max(0, totals.inFlight);
  if (ok) totals.ok += 1;
  else totals.error += 1;

  const stat = statsRef.current[op];
  stat.total += 1;
  if (ok) stat.ok += 1;
  else {
    stat.error += 1;
    stat.lastError = error;
  }

  stat.msSamples.push(ms);
  if (stat.msSamples.length > SAMPLE_WINDOW)
    stat.msSamples.splice(0, stat.msSamples.length - SAMPLE_WINDOW);

  const sample: Sample = {
    id: `${now}-${op}-${Math.random().toString(36).slice(2)}`,
    at: now,
    op,
    ms,
    ok,
    ...(error ? { error } : {}),
  };

  onSample(sample);
}

function computeStatsView(stat: OpStats) {
  const samples = stat.msSamples;
  const avg =
    samples.length > 0
      ? samples.reduce((a, b) => a + b, 0) / samples.length
      : null;
  const sorted = samples.length > 0 ? samples.toSorted((a, b) => a - b) : [];
  const p50 = sorted.length > 0 ? percentile(sorted, 50) : null;
  const p95 = sorted.length > 0 ? percentile(sorted, 95) : null;

  return {
    total: stat.total,
    ok: stat.ok,
    error: stat.error,
    inFlight: stat.inFlight,
    avg,
    p50,
    p95,
    lastError: stat.lastError,
  };
}

function percentile(sorted: number[], p: number) {
  if (sorted.length === 0) return 0;
  const idx = Math.min(
    sorted.length - 1,
    Math.max(0, Math.ceil((p / 100) * sorted.length) - 1),
  );
  return sorted[idx] ?? 0;
}

function clampInt(value: string, min: number, max: number) {
  const n = Number.parseInt(value, 10);
  if (Number.isNaN(n)) return min;
  return Math.min(max, Math.max(min, n));
}

function clampFloat(value: string, min: number, max: number) {
  const n = Number.parseFloat(value);
  if (Number.isNaN(n)) return min;
  return Math.min(max, Math.max(min, n));
}

function parseUserIds(raw: string): number[] {
  if (!raw.trim()) return [];
  const parts = raw
    .split(',')
    .map((p) => p.trim())
    .filter((p) => !!p);

  const ids = parts.flatMap((p) => {
    const n = Number.parseInt(p, 10);
    if (Number.isNaN(n)) return [];
    if (n <= 0) return [];
    return [n];
  });

  return Array.from(new Set(ids)).toSorted((a, b) => a - b);
}

const TEST_LOGIN_PREFIX = 'load-test-';

function buildTestLoginId(index: number) {
  return `${TEST_LOGIN_PREFIX}${String(index).padStart(2, '0')}`;
}

async function fetchAndApplyTestUserIds({
  limit,
  setIsFetchingUserIds,
  setUserIdsError,
  setUserIdsInput,
}: {
  limit: number;
  setIsFetchingUserIds: (next: boolean) => void;
  setUserIdsError: (next: string | null) => void;
  setUserIdsInput: (next: string) => void;
}): Promise<boolean> {
  setIsFetchingUserIds(true);
  setUserIdsError(null);

  try {
    const loginIds = Array.from({ length: Math.max(1, limit) }, (_, i) =>
      buildTestLoginId(i + 1),
    );

    const { data, error } = await supabase
      .from('genshin-bingo-game-user')
      .select('id, login_id')
      .in('login_id', loginIds)
      .order('id', { ascending: true });

    if (error || !data) {
      setUserIdsError(error?.message ?? 'test_userIds_fetch_failed');
      return false;
    }

    const ids = (
      data as Array<{ id: number | null; login_id?: string | null }>
    ).flatMap((row) =>
      typeof row.id === 'number' && row.id > 0 ? [row.id] : [],
    );

    if (ids.length === 0) {
      setUserIdsError('test_userIds_empty');
      return false;
    }

    setUserIdsInput(ids.join(','));
    return true;
  } catch {
    setUserIdsError('test_userIds_fetch_failed');
    return false;
  } finally {
    setIsFetchingUserIds(false);
  }
}

async function createTestUsers({
  count,
  setIsCreatingTestUsers,
  setTestUsersProgress,
  setUserIdsError,
  setUserIdsInput,
}: {
  count: number;
  setIsCreatingTestUsers: (next: boolean) => void;
  setTestUsersProgress: (next: string | null) => void;
  setUserIdsError: (next: string | null) => void;
  setUserIdsInput: (next: string) => void;
}): Promise<void> {
  setIsCreatingTestUsers(true);
  setUserIdsError(null);
  setTestUsersProgress('기존 테스트 계정 확인 중...');

  try {
    const targetCount = Math.max(1, Math.min(200, count));
    const loginIds = Array.from({ length: targetCount }, (_, i) =>
      buildTestLoginId(i + 1),
    );

    const { data: existing, error: existingError } = await supabase
      .from('genshin-bingo-game-user')
      .select('id, login_id')
      .in('login_id', loginIds);

    if (existingError) {
      setUserIdsError(existingError.message);
      return;
    }

    const existingLoginIds = new Set(
      (existing as Array<{ login_id?: string | null }> | null)?.flatMap((r) =>
        r.login_id ? [r.login_id] : [],
      ) ?? [],
    );

    const toCreate = loginIds
      .filter((id) => !existingLoginIds.has(id))
      .map((loginId) => ({
        login_id: loginId,
        name: loginId,
        password: 'load-test',
        score: 0,
        order: 0,
        is_admin: false,
        profile_image: 'Nahida',
        board: [],
        is_ready: false,
        last_seen: new Date(0).toISOString(),
        bingo_message: null,
        bingo_message_at: null,
      }));

    if (toCreate.length > 0) {
      setTestUsersProgress(`테스트 계정 생성 중... (${toCreate.length}개)`);
      const { error: insertError } = await supabase
        .from('genshin-bingo-game-user')
        .insert(toCreate);

      if (insertError) {
        setUserIdsError(insertError.message);
        return;
      }
    }

    setTestUsersProgress('생성 완료. ID 불러오는 중...');
    const ok = await fetchAndApplyTestUserIds({
      limit: targetCount,
      setIsFetchingUserIds: () => {},
      setUserIdsError,
      setUserIdsInput,
    });

    if (!ok) return;
    setTestUsersProgress('완료');
    setTimeout(() => setTestUsersProgress(null), 1500);
  } finally {
    setIsCreatingTestUsers(false);
  }
}

function sleep(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(() => resolve(), ms);
  });
}

function toErrorString(err: unknown) {
  if (!err) return 'unknown_error';
  if (typeof err === 'string') return err;
  if (err instanceof Error) return err.message;

  try {
    return JSON.stringify(err);
  } catch {
    return String(err);
  }
}

function createEmptyStats(): OpStats {
  return {
    total: 0,
    ok: 0,
    error: 0,
    inFlight: 0,
    msSamples: [],
  };
}

function isGlobalRunning(isRunningRef: MutableRefObject<boolean>) {
  return isRunningRef.current;
}

function isSameRun({
  runId,
  runIdRef,
}: {
  runId: string;
  runIdRef: MutableRefObject<string | null>;
}) {
  return runIdRef.current === runId;
}

function incInFlight({
  op,
  totalsRef,
  statsRef,
}: {
  op: OperationName;
  totalsRef: MutableRefObject<{
    startedAt: number;
    total: number;
    ok: number;
    error: number;
    inFlight: number;
  }>;
  statsRef: MutableRefObject<Record<OperationName, OpStats>>;
}) {
  totalsRef.current.inFlight += 1;
  statsRef.current[op].inFlight += 1;
}

function decInFlight({
  op,
  totalsRef,
  statsRef,
}: {
  op: OperationName;
  totalsRef: MutableRefObject<{
    startedAt: number;
    total: number;
    ok: number;
    error: number;
    inFlight: number;
  }>;
  statsRef: MutableRefObject<Record<OperationName, OpStats>>;
}) {
  totalsRef.current.inFlight = Math.max(0, totalsRef.current.inFlight - 1);
  statsRef.current[op].inFlight = Math.max(
    0,
    statsRef.current[op].inFlight - 1,
  );
}

function getJsHeapUsedBytes() {
  const anyPerformance = performance as unknown as {
    memory?: { usedJSHeapSize?: number };
  };
  return anyPerformance.memory?.usedJSHeapSize ?? null;
}

function formatBytes(bytes: number | null) {
  if (bytes === null) return '-';
  const units = ['B', 'KB', 'MB', 'GB'];
  let v = bytes;
  let u = 0;
  while (v >= 1024 && u < units.length - 1) {
    v /= 1024;
    u += 1;
  }
  return `${v.toFixed(1)}${units[u]}`;
}

function formatTime(ts: number) {
  const d = new Date(ts);
  const hh = String(d.getHours()).padStart(2, '0');
  const mm = String(d.getMinutes()).padStart(2, '0');
  const ss = String(d.getSeconds()).padStart(2, '0');
  return `${hh}:${mm}:${ss}`;
}
