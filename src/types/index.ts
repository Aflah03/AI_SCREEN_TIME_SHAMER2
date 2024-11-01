export interface AppStats {
  socialMedia: number;
  productivity: number;
  entertainment: number;
  gaming: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface SassyResponse {
  text: string;
  severity: 'mild' | 'medium' | 'savage';
  category: keyof AppStats;
}