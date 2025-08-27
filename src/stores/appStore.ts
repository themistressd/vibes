import { create } from 'zustand';
import type { VibeType } from '../styles/themes/types';

export interface Profile {
  id: string;
  name: string;
  age: number;
  vibe: VibeType;
  bio: string;
  images: string[];
  distance?: number;
  personality: {
    style: string;
    catchphrase: string;
    interests: string[];
    signature_move: string;
  };
}

export interface Match {
  id: string;
  profile: Profile;
  matchedAt: Date;
  conversation: Message[];
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'voice' | 'gif' | 'reaction';
  reaction?: string;
}

export interface SwipeAction {
  type: 'like' | 'pass' | 'boots' | 'wig';
  profileId: string;
  timestamp: Date;
}

interface AppState {
  // User state
  currentUser: {
    id: string;
    name: string;
    age: number;
    vibes: VibeType[];
    bio: string;
    images: string[];
  };
  
  // App state
  currentVibe: VibeType;
  profiles: Profile[];
  matches: Match[];
  currentProfileIndex: number;
  likesGiven: Record<VibeType, number>;
  likesReceived: Record<VibeType, number>;

  // Actions
  setCurrentVibe: (vibe: VibeType) => void;
  swipeProfile: (action: SwipeAction) => void;
  addMatch: (profile: Profile) => void;
  sendMessage: (matchId: string, message: Omit<Message, 'id' | 'timestamp'>) => void;
  nextProfile: () => void;
  resetSwipeStack: () => void;
  addLikeGiven: (vibe: VibeType) => void;
  addLikeReceived: (vibe: VibeType) => void;
  receiveLike: (vibe: VibeType) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  currentUser: {
    id: 'themistressd',
    name: 'themistressd',
    age: 28,
    vibes: ['spicy', 'chill', 'urban', 'artsy', 'dluxe'],
    bio: 'UNIVERSO VIBES - Living my best drag fantasy across all dimensions 💅✨',
    images: ['/api/placeholder/400/600', '/api/placeholder/400/600'],
  },
  
  currentVibe: 'spicy',
  profiles: [],
  matches: [],
  currentProfileIndex: 0,
  likesGiven: { spicy: 0, chill: 0, urban: 0, artsy: 0, dluxe: 0 },
  likesReceived: { spicy: 0, chill: 0, urban: 0, artsy: 0, dluxe: 0 },

  // Actions
  setCurrentVibe: (vibe: VibeType) => set({ currentVibe: vibe }),

  swipeProfile: (action: SwipeAction) => {
    const state = get();
    const profile = state.profiles[state.currentProfileIndex];

    if (action.type === 'boots' || action.type === 'wig' || action.type === 'like') {
      // Simulate match (for demo purposes, let's say 30% match rate)
      if (Math.random() > 0.7) {
        get().addMatch(profile);
      }
    }

    if (action.type === 'like') {
      get().addLikeGiven(profile.vibe);
    }

    get().nextProfile();
  },

  addLikeGiven: (vibe: VibeType) =>
    set((state) => ({
      likesGiven: {
        ...state.likesGiven,
        [vibe]: (state.likesGiven[vibe] ?? 0) + 1,
      },
    })),

  addLikeReceived: (vibe: VibeType) =>
    set((state) => ({
      likesReceived: {
        ...state.likesReceived,
        [vibe]: (state.likesReceived[vibe] ?? 0) + 1,
      },
    })),

  receiveLike: (vibe: VibeType) => {
    get().addLikeReceived(vibe);
  },
  
  addMatch: (profile: Profile) => {
    const matchId = `match_${Date.now()}`;
    const newMatch: Match = {
      id: matchId,
      profile,
      matchedAt: new Date(),
      conversation: [],
    };
    
    set((state) => ({
      matches: [...state.matches, newMatch],
    }));
  },
  
  sendMessage: (matchId: string, message: Omit<Message, 'id' | 'timestamp'>) => {
    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const fullMessage: Message = {
      ...message,
      id: messageId,
      timestamp: new Date(),
    };
    
    set((state) => ({
      matches: state.matches.map((match) =>
        match.id === matchId
          ? {
              ...match,
              conversation: [...match.conversation, fullMessage],
            }
          : match
      ),
    }));
  },
  
  nextProfile: () => set((state) => ({
    currentProfileIndex: (state.currentProfileIndex + 1) % Math.max(state.profiles.length, 1),
  })),
  
  resetSwipeStack: () => set({ currentProfileIndex: 0 }),
}));