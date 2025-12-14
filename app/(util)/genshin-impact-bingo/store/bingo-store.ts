import { create } from 'zustand';

import type { User } from '../lib/auth';
import type { GameState, Player } from '../lib/game';

interface BingoState {
  user: User | null;
  gameState: GameState | null;
  players: Player[];
  isLoading: boolean;
  hasInitialized: boolean;
  setUser: (user: User | null) => void;
  setGameState: (gameState: GameState | null) => void;
  setPlayers: (players: Player[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setInitialized: () => void;
}

export const useBingoStore = create<BingoState>((set) => ({
  user: null,
  gameState: null,
  players: [],
  isLoading: true,
  hasInitialized: false,
  setUser: (user) => set({ user }),
  setGameState: (gameState) => set({ gameState }),
  setPlayers: (players) => set({ players }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setInitialized: () => set({ hasInitialized: true }),
}));
