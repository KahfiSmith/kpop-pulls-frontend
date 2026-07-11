export type RarityType = 'common' | 'rare' | 'epic' | 'legendary' | 'mythical';

export interface Rarity {
  id: RarityType;
  name: string;
  probability: number; 
  color: string; 
  borderColor: string; 
  bgColor: string; 
  textColor: string; 
  soundEffect?: string; 
}

export const rarities: Record<RarityType, Rarity> = {
  common: {
    id: 'common',
    name: 'Rookie',
    probability: 50,
    color: 'text-gray-600',
    borderColor: 'border-gray-400',
    bgColor: 'bg-gray-200',
    textColor: 'text-gray-700',
    // soundEffect: '/sounds/anime-wow.mp3'
  },
  rare: {
    id: 'rare',
    name: 'Rising Star',
    probability: 30,
    color: 'text-blue-600',
    borderColor: 'border-blue-400',
    bgColor: 'bg-blue-200',
    textColor: 'text-blue-700',
    // soundEffect: '/sounds/anime-wow.mp3'
  },
  epic: {
    id: 'epic',
    name: 'Superstar',
    probability: 15,
    color: 'text-purple-600',
    borderColor: 'border-purple-400',
    bgColor: 'bg-purple-200',
    textColor: 'text-purple-700',
    // soundEffect: '/sounds/anime-wow.mp3'
  },
  legendary: {
    id: 'legendary',
    name: 'Idol Queen',
    probability: 10,
    color: 'text-orange-600',
    borderColor: 'border-orange-400',
    bgColor: 'bg-orange-200',
    textColor: 'text-orange-700',
    // soundEffect: '/sounds/anime-wow.mp3'
  },
  mythical: {
    id: 'mythical',
    name: 'Ultimate Bias',
    probability: 5,
    color: 'text-pink-600',
    borderColor: 'border-pink-400',
    bgColor: 'bg-pink-200',
    textColor: 'text-pink-700',
    // soundEffect: '/sounds/anime-wow.mp3'
  }
};

export const pityConfig = {
  rare: 5,
  epic: 20, 
  legendary: 50, 
  mythical: 80 
};