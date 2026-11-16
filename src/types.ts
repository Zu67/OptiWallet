export enum Issuer {
  CHASE = 'Chase',
  AMEX = 'Amex',
  CAPITAL_ONE = 'Capital One',
  CITI = 'Citi',
  DISCOVER = 'Discover',
  WELLS_FARGO = 'Wells Fargo',
  US_BANK = 'US Bank',
  BOA = 'Bank of America',
  BARCLAYS = 'Barclays',
  BILT = 'Bilt',
  OTHER = 'Other'
}

export interface Multiplier {
  category: string;
  rate: number;
  description?: string;
}

export interface Card {
  id: string;
  name: string;
  issuer: Issuer;
  annualFee: number;
  multipliers: Multiplier[];
  baseMultiplier: number; // The catch-all rate (e.g., 1x or 1.5x)
  pointValuation: number; // Cents per point
  perks: string[];
  usageStrategy: string; // Generic "Best For"
  credits?: string[]; // Array of string descriptions for monetary credits
  imageUrl?: string; 
  rewardName?: string; // e.g. "Ultimate Rewards", "Membership Rewards"
  transferPartners?: string[]; // List of major transfer partners
}

export interface SpendingCategory {
  id: string;
  label: string;
  iconName: string;
}