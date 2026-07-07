import { Idol } from '@/data/idols';
import { RarityType } from '@/data/rarities';

export interface PullResult {
  idol: Idol;
  timestamp: string;
  pityPull: boolean; 
}

export interface PullHistory {
  pulls: PullResult[];
  lastPullTimestamp: string | null; 
}

export interface PityCounter {
  rare: number; 
  epic: number; 
  legendary: number; 
  mythical: number; 
}

export interface GachaStats {
  totalPulls: number;
  rarityDistribution: Record<RarityType, number>;
  pityPulls: number;
}

export interface PullAnimation {
  isPlaying: boolean;
  result: PullResult | null;
  step: 'initial' | 'pulling' | 'reveal' | 'complete';
}
