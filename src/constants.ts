
import { Card, Issuer, SpendingCategory } from './types';

export const SPENDING_CATEGORIES: SpendingCategory[] = [
  { id: 'dining', label: 'Dining', iconName: 'Utensils' },
  { id: 'grocery', label: 'Groceries', iconName: 'ShoppingCart' },
  { id: 'grocery_online', label: 'Online Groceries', iconName: 'ShoppingCart' },
  { id: 'travel_air', label: 'Flights', iconName: 'Plane' },
  { id: 'travel_general', label: 'General Travel', iconName: 'Globe' },
  { id: 'travel_portal', label: 'Travel Portal', iconName: 'Globe' },
  { id: 'travel_portal_flight', label: 'Portal Flights', iconName: 'Plane' },
  { id: 'travel_portal_hotel', label: 'Portal Hotels', iconName: 'Bed' },
  { id: 'transit', label: 'Transit', iconName: 'Train' },
  { id: 'gas', label: 'Gas Stations', iconName: 'Fuel' },
  { id: 'hotel_hyatt', label: 'Hyatt Stays', iconName: 'Bed' },
  { id: 'hotel_marriott', label: 'Marriott Stays', iconName: 'Building' },
  { id: 'hotel_hilton', label: 'Hilton Stays', iconName: 'Hotel' },
  { id: 'hotel_ihg', label: 'IHG Stays', iconName: 'Hotel' },
  { id: 'hotel', label: 'Hotels', iconName: 'Bed' },
  { id: 'rent', label: 'Rent', iconName: 'Home' },
  { id: 'drugstore', label: 'Drugstores', iconName: 'Pill' },
  { id: 'streaming', label: 'Streaming', iconName: 'Tv' },
  { id: 'entertainment', label: 'Entertainment', iconName: 'Ticket' },
  { id: 'utilities', label: 'Utilities', iconName: 'Zap' },
  { id: 'mobile_wallet', label: 'Mobile Wallet', iconName: 'Smartphone' },
  { id: 'retail_online', label: 'Online Retail', iconName: 'MousePointerClick' },
  { id: 'business_supply', label: 'Office Supply', iconName: 'Briefcase' },
  { id: 'tech', label: 'Tech & Software', iconName: 'Monitor' },
  { id: 'advertising', label: 'Online Ads', iconName: 'Megaphone' },
  { id: 'shipping', label: 'Shipping', iconName: 'Truck' },
  { id: 'phone', label: 'Phone/Internet', iconName: 'Wifi' },
  { id: 'amazon', label: 'Amazon', iconName: 'ShoppingBag' },
  { id: 'gym', label: 'Gym/Fitness', iconName: 'Dumbbell' },
  { id: 'everyday', label: 'Catch-All', iconName: 'CreditCard' },
  { id: 'rotating', label: 'Quarterly Category', iconName: 'Calendar' },
];

export const MASTER_CARDS_LIST: Card[] = [
  // ==========================================
  // CHASE - CORE
  // ==========================================
  {
    id: 'csr',
    name: 'Chase Sapphire Reserve®',
    issuer: Issuer.CHASE,
    annualFee: 550,
    baseMultiplier: 1,
    pointValuation: 2.05,
    multipliers: [
      { category: 'travel_portal_hotel', rate: 10, description: '10x Hotels/Car via Chase' },
      { category: 'travel_portal_flight', rate: 5, description: '5x Flights via Chase' },
      { category: 'travel_general', rate: 3, description: '3x Travel (Direct)' },
      { category: 'dining', rate: 3, description: '3x Dining' },
      { category: 'lyft', rate: 10, description: '10x Lyft' },
    ],
    credits: ['$300 Annual Travel Credit', '$5 Monthly DoorDash Credit'],
    perks: ['Priority Pass Select', 'Sapphire Lounge Access', 'Global Entry/TSA Credit', 'Primary CDW'],
    usageStrategy: 'Travel Workhorse. Use for all travel & dining unless chasing specific multipliers.',
    rewardName: 'Ultimate Rewards',
    transferPartners: ['United', 'Hyatt', 'Southwest', 'British Airways', 'Marriott']
  },
  {
    id: 'csp',
    name: 'Chase Sapphire Preferred®',
    issuer: Issuer.CHASE,
    annualFee: 95,
    baseMultiplier: 1.1,
    pointValuation: 2.05,
    multipliers: [
      { category: 'travel_portal', rate: 5.1, description: '5x Chase Travel' },
      { category: 'dining', rate: 3.1, description: '3x Dining' },
      { category: 'grocery_online', rate: 3.1, description: '3x Online Grocery' },
      { category: 'streaming', rate: 3.1, description: '3x Streaming' },
      { category: 'travel_general', rate: 2.1, description: '2x Travel' },
    ],
    credits: ['$50 Hotel Credit (Portal)'],
    perks: ['10% Anniversary Points', 'Primary CDW', 'Trip Cancellation Ins.'],
    usageStrategy: 'Starter Travel Card. Great for transferring points to partners.',
    rewardName: 'Ultimate Rewards',
    transferPartners: ['United', 'Hyatt', 'Southwest', 'British Airways', 'Marriott']
  },
  {
    id: 'cfu',
    name: 'Chase Freedom Unlimited®',
    issuer: Issuer.CHASE,
    annualFee: 0,
    baseMultiplier: 1.5,
    pointValuation: 2.05,
    multipliers: [
      { category: 'dining', rate: 3, description: '3x Dining' },
      { category: 'drugstore', rate: 3, description: '3x Drugstores' },
      { category: 'travel_portal', rate: 5, description: '5x Chase Travel' },
    ],
    credits: [],
    perks: ['0% Intro APR (Check offer)', 'Purchase Protection'],
    usageStrategy: 'Everyday Spend. Use for everything that isn\'t a bonus category.',
    rewardName: 'Ultimate Rewards'
  },
  {
    id: 'cff',
    name: 'Chase Freedom Flex®',
    issuer: Issuer.CHASE,
    annualFee: 0,
    baseMultiplier: 1,
    pointValuation: 2.05,
    multipliers: [
      { category: 'rotating', rate: 5, description: '5x Rotating Categories' },
      { category: 'dining', rate: 3, description: '3x Dining' },
      { category: 'drugstore', rate: 3, description: '3x Drugstores' },
    ],
    credits: [],
    perks: ['Cell Phone Protection'],
    usageStrategy: 'Category Sniper. Maximize the 5x quarterly categories.',
    rewardName: 'Ultimate Rewards'
  },
  
  // ==========================================
  // CHASE - BUSINESS
  // ==========================================
  {
    id: 'ink_pref',
    name: 'Ink Business Preferred®',
    issuer: Issuer.CHASE,
    annualFee: 95,
    baseMultiplier: 1,
    pointValuation: 2.05,
    multipliers: [
      { category: 'travel_general', rate: 3, description: '3x Travel (First $150k)' },
      { category: 'shipping', rate: 3, description: '3x Shipping' },
      { category: 'advertising', rate: 3, description: '3x Ads' },
      { category: 'phone', rate: 3, description: '3x Internet/Phone' },
    ],
    credits: [],
    perks: ['Cell Phone Protection', 'Primary CDW (Biz)'],
    usageStrategy: 'Business Travel & Ads. The key to unlocking biz point transfers.',
    rewardName: 'Ultimate Rewards',
    transferPartners: ['United', 'Hyatt', 'Southwest', 'British Airways', 'Marriott']
  },
  {
    id: 'ink_cash',
    name: 'Ink Business Cash®',
    issuer: Issuer.CHASE,
    annualFee: 0,
    baseMultiplier: 1,
    pointValuation: 2.05,
    multipliers: [
      { category: 'business_supply', rate: 5, description: '5x Office Supply ($25k cap)' },
      { category: 'phone', rate: 5, description: '5x Internet/Phone ($25k cap)' },
      { category: 'gas', rate: 2, description: '2x Gas' },
      { category: 'dining', rate: 2, description: '2x Dining' },
    ],
    credits: [],
    perks: ['Primary CDW (Biz)'],
    usageStrategy: 'Office Supply. Buy gift cards at office supply stores for 5x.',
    rewardName: 'Ultimate Rewards'
  },
  {
    id: 'ink_unlimited',
    name: 'Ink Business Unlimited®',
    issuer: Issuer.CHASE,
    annualFee: 0,
    baseMultiplier: 1.5,
    pointValuation: 2.05,
    multipliers: [],
    credits: [],
    perks: ['Primary CDW (Biz)'],
    usageStrategy: 'Business Catch-All. Simple 1.5x on everything.',
    rewardName: 'Ultimate Rewards'
  },

  // ==========================================
  // CHASE - CO-BRANDED AIRLINE
  // ==========================================
  {
    id: 'united_quest',
    name: 'United Quest℠ Card',
    issuer: Issuer.CHASE,
    annualFee: 250,
    baseMultiplier: 1,
    pointValuation: 1.2,
    multipliers: [
      { category: 'travel_air', rate: 3, description: '3x United' },
      { category: 'dining', rate: 2, description: '2x Dining' },
    ],
    credits: ['$125 United Purchase Credit', 'Two 5k Mile Rebates'],
    perks: ['Free 1st & 2nd Checked Bag', 'Priority Boarding'],
    usageStrategy: 'United Flyer. Credits effectively lower fee to $25.',
    rewardName: 'United MileagePlus'
  },
  {
    id: 'united_explorer',
    name: 'United℠ Explorer Card',
    issuer: Issuer.CHASE,
    annualFee: 95, // Waived year 1 usually
    baseMultiplier: 1,
    pointValuation: 1.2,
    multipliers: [
      { category: 'travel_air', rate: 2, description: '2x United' },
      { category: 'dining', rate: 2, description: '2x Dining' },
      { category: 'hotel', rate: 2, description: '2x Hotels (Direct)' },
    ],
    credits: ['2 United Club Passes'],
    perks: ['Free Checked Bag', 'Priority Boarding', 'Global Entry/TSA Credit'],
    usageStrategy: 'Occasional United Flyer. Free bag and club passes pay for the fee.',
    rewardName: 'United MileagePlus'
  },
  {
    id: 'united_club',
    name: 'United Club℠ Infinite',
    issuer: Issuer.CHASE,
    annualFee: 525,
    baseMultiplier: 1,
    pointValuation: 1.2,
    multipliers: [
      { category: 'travel_air', rate: 4, description: '4x United' },
      { category: 'dining', rate: 2, description: '2x Dining' },
    ],
    credits: ['United Club Membership ($650 value)'],
    perks: ['Free 1st & 2nd Bags', 'Premier Access'],
    usageStrategy: 'Lounge Access. Cheaper than buying Club membership directly.',
    rewardName: 'United MileagePlus'
  },
  {
    id: 'sw_priority',
    name: 'Southwest Rapid Rewards® Priority',
    issuer: Issuer.CHASE,
    annualFee: 149,
    baseMultiplier: 1,
    pointValuation: 1.4,
    multipliers: [
      { category: 'travel_air', rate: 3, description: '3x Southwest' },
      { category: 'transit', rate: 2, description: '2x Local Transit' },
    ],
    credits: ['$75 Southwest Travel Credit', '7,500 Anniversary Points'],
    perks: ['4 Upgraded Boardings/yr', 'Tier Qualifying Points'],
    usageStrategy: 'Southwest Loyalists. The points and credit outweigh the fee.',
    rewardName: 'Southwest Rapid Rewards'
  },
  {
    id: 'sw_premier',
    name: 'Southwest Rapid Rewards® Premier',
    issuer: Issuer.CHASE,
    annualFee: 99,
    baseMultiplier: 1,
    pointValuation: 1.4,
    multipliers: [
      { category: 'travel_air', rate: 3, description: '3x Southwest' },
    ],
    credits: ['6,000 Anniversary Points'],
    perks: ['EarlyBird Check-In (2/yr)', 'Tier Qualifying Points'],
    usageStrategy: 'Southwest Mid-Tier. Good for accumulating Companion Pass points.',
    rewardName: 'Southwest Rapid Rewards'
  },
  {
    id: 'ba_visa',
    name: 'British Airways Visa Signature®',
    issuer: Issuer.CHASE,
    annualFee: 95,
    baseMultiplier: 1,
    pointValuation: 1.3, // Avios
    multipliers: [
      { category: 'travel_air', rate: 3, description: '3x BA/Iberia/Aer Lingus' },
      { category: 'hotel', rate: 2, description: '2x Hotels' },
    ],
    credits: ['Reward Flight Saver', '10% off BA Flights'],
    perks: ['Travel Together Ticket (w/ $30k spend)'],
    usageStrategy: 'Avios Earner. The 10% flight discount can save hundreds.',
    rewardName: 'Avios'
  },

  // ==========================================
  // CHASE - CO-BRANDED HOTEL & OTHER
  // ==========================================
  {
    id: 'woh',
    name: 'World of Hyatt Credit Card',
    issuer: Issuer.CHASE,
    annualFee: 95,
    baseMultiplier: 1,
    pointValuation: 1.7,
    multipliers: [
      { category: 'hotel_hyatt', rate: 4, description: '4x Hyatt' },
      { category: 'gym', rate: 2, description: '2x Fitness' },
      { category: 'transit', rate: 2, description: '2x Transit' },
    ],
    credits: ['Free Night Award (Cat 1-4)'],
    perks: ['5 Elite Night Credits', 'Discoverist Status'],
    usageStrategy: 'Hyatt Keeper. The free night pays for the card.',
    rewardName: 'World of Hyatt Points'
  },
  {
    id: 'marriott_boundless',
    name: 'Marriott Bonvoy Boundless®',
    issuer: Issuer.CHASE,
    annualFee: 95,
    baseMultiplier: 2,
    pointValuation: 0.84,
    multipliers: [
      { category: 'hotel_marriott', rate: 6, description: '6x Marriott' },
      { category: 'grocery', rate: 3, description: '3x Grocery ($6k cap)' },
      { category: 'gas', rate: 3, description: '3x Gas ($6k cap)' },
      { category: 'dining', rate: 3, description: '3x Dining ($6k cap)' },
    ],
    credits: ['Free Night Award (35k)'],
    perks: ['15 Elite Night Credits', 'Silver Elite Status'],
    usageStrategy: 'Marriott Keeper. Free night certificate > $95 fee.',
    rewardName: 'Marriott Bonvoy Points'
  },
  {
    id: 'ihg_premier',
    name: 'IHG One Rewards Premier',
    issuer: Issuer.CHASE,
    annualFee: 99,
    baseMultiplier: 3,
    pointValuation: 0.5,
    multipliers: [
      { category: 'hotel_ihg', rate: 10, description: '10x IHG (+16x from status)' },
      { category: 'travel_general', rate: 5, description: '5x Travel' },
      { category: 'gas', rate: 5, description: '5x Gas' },
      { category: 'dining', rate: 5, description: '5x Dining' },
    ],
    credits: ['Free Night Award (40k)', '$50 United TravelBank Cash'],
    perks: ['Platinum Elite Status', '4th Night Free on Awards'],
    usageStrategy: 'IHG Stays. 4th Night Free perk saves massive points.',
    rewardName: 'IHG One Rewards'
  },
  {
    id: 'amazon_prime',
    name: 'Prime Visa',
    issuer: Issuer.CHASE,
    annualFee: 0, // Requires Prime
    baseMultiplier: 1,
    pointValuation: 1.0,
    multipliers: [
      { category: 'amazon', rate: 5, description: '5% Amazon/Whole Foods' },
      { category: 'travel_portal', rate: 5, description: '5% Chase Travel' },
      { category: 'dining', rate: 2, description: '2% Dining' },
      { category: 'gas', rate: 2, description: '2% Gas' },
    ],
    credits: [],
    perks: ['No FX Fees'],
    usageStrategy: 'Amazon Shopping. 5% back on Amazon is unbeatable.',
    rewardName: 'Cash Back'
  },
  {
    id: 'disney_premier',
    name: 'Disney® Premier Visa®',
    issuer: Issuer.CHASE,
    annualFee: 49,
    baseMultiplier: 1,
    pointValuation: 1.0,
    multipliers: [
      { category: 'streaming', rate: 5, description: '5% Disney+/Hulu/ESPN' },
      { category: 'gas', rate: 2, description: '2% Gas' },
      { category: 'grocery', rate: 2, description: '2% Grocery' },
      { category: 'dining', rate: 2, description: '2% Dining' },
    ],
    credits: [],
    perks: ['10% Savings on Disney Shopping/Dining', 'Character Meet & Greets'],
    usageStrategy: 'Disney Fans. The perks at the parks outweigh the rewards.',
    rewardName: 'Disney Rewards Dollars'
  },

  // ==========================================
  // AMEX - PERSONAL
  // ==========================================
  {
    id: 'amex_plat',
    name: 'The Platinum Card®',
    issuer: Issuer.AMEX,
    annualFee: 695,
    baseMultiplier: 1,
    pointValuation: 2.0,
    multipliers: [
      { category: 'travel_air', rate: 5, description: '5x Flights (Direct/Amex)' },
      { category: 'travel_portal_hotel', rate: 5, description: '5x Prepaid Hotels' },
    ],
    credits: ['$200 Hotel Credit', '$200 Airline Fee', '$200 Uber Cash', '$240 Digital Ent.', '$189 CLEAR Plus'],
    perks: ['Centurion Lounge', 'Priority Pass', 'Hilton/Marriott Gold Status', 'Hertz President\'s Circle'],
    usageStrategy: 'Perks & Lounges. Not for daily spend, but for luxury travel benefits.',
    rewardName: 'Membership Rewards',
    transferPartners: ['Delta', 'British Airways', 'Air Canada', 'Flying Blue', 'Virgin Atlantic', 'Hilton', 'Marriott']
  },
  {
    id: 'amex_gold',
    name: 'American Express® Gold Card',
    issuer: Issuer.AMEX,
    annualFee: 325,
    baseMultiplier: 1,
    pointValuation: 2.0,
    multipliers: [
      { category: 'dining', rate: 4, description: '4x Dining Worldwide' },
      { category: 'grocery', rate: 4, description: '4x US Supermarkets ($25k cap)' },
      { category: 'travel_air', rate: 3, description: '3x Flights' },
    ],
    credits: ['$120 Dining Credit', '$120 Uber Cash', '$100 Resy Credit'],
    perks: ['No FX Fees'],
    usageStrategy: 'Daily Driver. The best card for Food & Groceries.',
    rewardName: 'Membership Rewards',
    transferPartners: ['Delta', 'British Airways', 'Air Canada', 'Flying Blue', 'Virgin Atlantic', 'Hilton', 'Marriott']
  },
  {
    id: 'amex_green',
    name: 'American Express® Green Card',
    issuer: Issuer.AMEX,
    annualFee: 150,
    baseMultiplier: 1,
    pointValuation: 2.0,
    multipliers: [
      { category: 'travel_general', rate: 3, description: '3x Travel/Transit' },
      { category: 'dining', rate: 3, description: '3x Dining' },
    ],
    credits: ['CLEAR Plus Credit', 'LoungeBuddy Credit'],
    perks: ['No FX Fees'],
    usageStrategy: 'Broad Travel. Great for trains, subways, and tours.',
    rewardName: 'Membership Rewards'
  },
  {
    id: 'amex_bcp',
    name: 'Blue Cash Preferred®',
    issuer: Issuer.AMEX,
    annualFee: 95,
    baseMultiplier: 1,
    pointValuation: 1.0,
    multipliers: [
      { category: 'grocery', rate: 6, description: '6% US Supermarkets ($6k cap)' },
      { category: 'streaming', rate: 6, description: '6% Streaming' },
      { category: 'gas', rate: 3, description: '3% Gas' },
      { category: 'transit', rate: 3, description: '3% Transit' },
    ],
    credits: ['Disney Bundle Credit', 'Equinox+ Credit'],
    perks: ['Return Protection'],
    usageStrategy: 'Groceries & Streaming. 6% return is best in class.',
    rewardName: 'Cash Back'
  },

  // ==========================================
  // AMEX - BUSINESS
  // ==========================================
  {
    id: 'amex_biz_plat',
    name: 'Business Platinum Card®',
    issuer: Issuer.AMEX,
    annualFee: 695,
    baseMultiplier: 1,
    pointValuation: 2.0,
    multipliers: [
      { category: 'travel_air', rate: 5, description: '5x Flights (Amex Travel)' },
      { category: 'travel_portal_hotel', rate: 5, description: '5x Hotels (Amex Travel)' },
      { category: 'business_supply', rate: 1.5, description: '1.5x on Construction/Hardware/Supplies' },
    ],
    credits: ['$400 Dell Credit', '$200 Airline Fee', '$120 Wireless', '$189 CLEAR Plus'],
    perks: ['35% Points Rebate (Air)', 'Centurion Lounge Access', 'Global Entry/TSA Credit'],
    usageStrategy: 'Business Travel. 35% rebate on points effectively makes points worth ~1.54 cents.',
    rewardName: 'Membership Rewards'
  },
  {
    id: 'amex_biz_gold',
    name: 'Business Gold Card®',
    issuer: Issuer.AMEX,
    annualFee: 375,
    baseMultiplier: 1,
    pointValuation: 2.0,
    multipliers: [
      { category: 'advertising', rate: 4, description: '4x Top 2 Cats (Ads/Gas/Tech/Dining)' },
      { category: 'gas', rate: 4, description: '4x Top 2 Cats' },
      { category: 'dining', rate: 4, description: '4x Top 2 Cats' },
      { category: 'tech', rate: 4, description: '4x Top 2 Cats' },
    ],
    credits: ['$240 Flexible Business Credit (FedEx/Grubhub/Office Supply)'],
    perks: ['Cell Phone Protection'],
    usageStrategy: 'Flexible Business Spend. Automatically earns 4x on where you spend most.',
    rewardName: 'Membership Rewards'
  },
  {
    id: 'amex_bbp',
    name: 'Blue Business® Plus',
    issuer: Issuer.AMEX,
    annualFee: 0,
    baseMultiplier: 2,
    pointValuation: 2.0,
    multipliers: [],
    credits: [],
    perks: ['Expanded Buying Power'],
    usageStrategy: 'The Catch-All King. 2x MR on everything (up to $50k) is unbeatable.',
    rewardName: 'Membership Rewards'
  },

  // ==========================================
  // AMEX - CO-BRANDED
  // ==========================================
  {
    id: 'hilton_aspire',
    name: 'Hilton Honors Aspire®',
    issuer: Issuer.AMEX,
    annualFee: 550,
    baseMultiplier: 3,
    pointValuation: 0.6,
    multipliers: [
      { category: 'hotel_hilton', rate: 14, description: '14x Hilton' },
      { category: 'travel_air', rate: 7, description: '7x Flights' },
      { category: 'dining', rate: 7, description: '7x Dining' },
    ],
    credits: ['$400 Hilton Resort Credit', '$200 Flight Credit', 'Free Night Award'],
    perks: ['Diamond Status', 'National Emerald Club'],
    usageStrategy: 'Hilton Loyalists. Diamond status and free night provide immense value.',
    rewardName: 'Hilton Honors Points'
  },
  {
    id: 'hilton_surpass',
    name: 'Hilton Honors Surpass®',
    issuer: Issuer.AMEX,
    annualFee: 150,
    baseMultiplier: 3,
    pointValuation: 0.6,
    multipliers: [
      { category: 'hotel_hilton', rate: 12, description: '12x Hilton' },
      { category: 'grocery', rate: 6, description: '6x Grocery' },
      { category: 'gas', rate: 6, description: '6x Gas' },
      { category: 'dining', rate: 6, description: '6x Dining' },
    ],
    credits: ['$200 Hilton Credit ($50/qtr)'],
    perks: ['Gold Status', 'Free Night Award (w/ $15k spend)'],
    usageStrategy: 'Hilton Mid-Tier. Gold status and strong multipliers for everyday spend.',
    rewardName: 'Hilton Honors Points'
  },
  {
    id: 'hilton_noaf',
    name: 'Hilton Honors Card',
    issuer: Issuer.AMEX,
    annualFee: 0,
    baseMultiplier: 3,
    pointValuation: 0.6,
    multipliers: [
      { category: 'hotel_hilton', rate: 7, description: '7x Hilton' },
      { category: 'grocery', rate: 5, description: '5x Grocery' },
      { category: 'dining', rate: 5, description: '5x Dining' },
      { category: 'gas', rate: 5, description: '5x Gas' },
    ],
    credits: [],
    perks: ['Silver Status', 'No FX Fees'],
    usageStrategy: 'No Fee Hilton. Good entry point for Hilton points.',
    rewardName: 'Hilton Honors Points'
  },
  {
    id: 'marriott_brilliant',
    name: 'Marriott Bonvoy Brilliant®',
    issuer: Issuer.AMEX,
    annualFee: 650,
    baseMultiplier: 2,
    pointValuation: 0.84,
    multipliers: [
      { category: 'hotel_marriott', rate: 6, description: '6x Marriott' },
      { category: 'dining', rate: 3, description: '3x Dining' },
      { category: 'travel_air', rate: 3, description: '3x Flights' },
    ],
    credits: ['$300 Dining Credit', 'Free Night Award (85k)'],
    perks: ['Platinum Elite Status', 'Priority Pass'],
    usageStrategy: 'Instant Status. Platinum status is a game changer for Marriott stays.',
    rewardName: 'Marriott Bonvoy Points'
  },
  {
    id: 'delta_reserve',
    name: 'Delta SkyMiles® Reserve',
    issuer: Issuer.AMEX,
    annualFee: 650,
    baseMultiplier: 1,
    pointValuation: 1.15,
    multipliers: [
      { category: 'travel_air', rate: 3, description: '3x Delta' },
    ],
    credits: ['Companion Certificate (First/Comf+)', '$240 Resy Credit', '$120 Rideshare'],
    perks: ['Delta Sky Club Access', 'Centurion Lounge Access', 'Upgrade Priority', 'Free Bags'],
    usageStrategy: 'Delta Loyalists. Lounge access and upgrade priority are the main draws.',
    rewardName: 'Delta SkyMiles'
  },
  {
    id: 'delta_plat',
    name: 'Delta SkyMiles® Platinum',
    issuer: Issuer.AMEX,
    annualFee: 350,
    baseMultiplier: 1,
    pointValuation: 1.15,
    multipliers: [
      { category: 'travel_air', rate: 3, description: '3x Delta' },
      { category: 'hotel', rate: 3, description: '3x Hotels' },
    ],
    credits: ['Companion Certificate (Main)', '$150 Delta Stays', '$120 Resy', '$120 Rideshare'],
    perks: ['Free Bag', 'Priority Boarding'],
    usageStrategy: 'Companion Pass. The annual certificate usually covers the fee.',
    rewardName: 'Delta SkyMiles'
  },
  {
    id: 'delta_gold',
    name: 'Delta SkyMiles® Gold',
    issuer: Issuer.AMEX,
    annualFee: 150, // Waived year 1 often
    baseMultiplier: 1,
    pointValuation: 1.15,
    multipliers: [
      { category: 'travel_air', rate: 2, description: '2x Delta' },
      { category: 'dining', rate: 2, description: '2x Dining' },
      { category: 'grocery', rate: 2, description: '2x Grocery' },
    ],
    credits: ['$100 Delta Stays Credit'],
    perks: ['Free Checked Bag', 'Priority Boarding', 'TakeOff 15 (15% off awards)'],
    usageStrategy: 'Occasional Flyer. Free bag and award discount make it worth it.',
    rewardName: 'Delta SkyMiles'
  },

  // ==========================================
  // CITI
  // ==========================================
  {
    id: 'citi_strata_premier',
    name: 'Citi Strata Premier℠',
    issuer: Issuer.CITI,
    annualFee: 95,
    baseMultiplier: 1,
    pointValuation: 1.6,
    multipliers: [
      { category: 'travel_portal', rate: 10, description: '10x Hotels/Car via Citi' },
      { category: 'travel_air', rate: 3, description: '3x Air Travel' },
      { category: 'dining', rate: 3, description: '3x Dining' },
      { category: 'grocery', rate: 3, description: '3x Supermarkets' },
      { category: 'gas', rate: 3, description: '3x Gas' },
    ],
    credits: ['$100 Hotel Credit (via Portal)'],
    perks: ['No FX Fees', 'Transfer Partners'],
    usageStrategy: 'The All-Rounder. 3x on Gas, Grocery, Dining, and Travel is rare.',
    rewardName: 'ThankYou Points',
    transferPartners: ['Avianca', 'Flying Blue', 'Virgin Atlantic', 'Singapore', 'JetBlue', 'Turkish']
  },
  {
    id: 'citi_double_cash',
    name: 'Citi Double Cash®',
    issuer: Issuer.CITI,
    annualFee: 0,
    baseMultiplier: 2,
    pointValuation: 1.6,
    multipliers: [],
    credits: [],
    perks: ['Convert cash to ThankYou Points'],
    usageStrategy: 'Flat Rate King. 2% on everything (1% buy + 1% pay).',
    rewardName: 'ThankYou Points (via Cash)'
  },
  {
    id: 'citi_custom_cash',
    name: 'Citi Custom Cash℠',
    issuer: Issuer.CITI,
    annualFee: 0,
    baseMultiplier: 1,
    pointValuation: 1.6,
    multipliers: [
      { category: 'dining', rate: 5, description: '5x Top Category ($500 cap)' },
      { category: 'grocery', rate: 5, description: '5x Top Category ($500 cap)' },
      { category: 'gas', rate: 5, description: '5x Top Category ($500 cap)' },
    ],
    credits: [],
    perks: [],
    usageStrategy: 'Sniper Card. Use for ONE category (e.g. only Gas) to get 5x.',
    rewardName: 'ThankYou Points'
  },
  {
    id: 'citi_rewards_plus',
    name: 'Citi Rewards+®',
    issuer: Issuer.CITI,
    annualFee: 0,
    baseMultiplier: 1,
    pointValuation: 1.6,
    multipliers: [
      { category: 'grocery', rate: 2, description: '2x Grocery ($6k cap)' },
      { category: 'gas', rate: 2, description: '2x Gas ($6k cap)' },
    ],
    credits: [],
    perks: ['Round up to nearest 10 pts', '10% Points Rebate (Redemptions)'],
    usageStrategy: 'Small Purchases. Buying a $2 gum earns 10 points (5x return).',
    rewardName: 'ThankYou Points'
  },
  {
    id: 'citi_aa_plat',
    name: 'Citi® / AAdvantage® Platinum Select',
    issuer: Issuer.CITI,
    annualFee: 99,
    baseMultiplier: 1,
    pointValuation: 1.5,
    multipliers: [
      { category: 'travel_air', rate: 2, description: '2x AA' },
      { category: 'gas', rate: 2, description: '2x Gas' },
      { category: 'dining', rate: 2, description: '2x Dining' },
    ],
    credits: ['$125 Flight Discount (after $20k spend)'],
    perks: ['Free Checked Bag', 'Preferred Boarding'],
    usageStrategy: 'AA Flyer. Pays for itself if you check bags often.',
    rewardName: 'AAdvantage Miles'
  },
  {
    id: 'citi_aa_exec',
    name: 'Citi® / AAdvantage® Executive',
    issuer: Issuer.CITI,
    annualFee: 595,
    baseMultiplier: 1,
    pointValuation: 1.5,
    multipliers: [
      { category: 'travel_air', rate: 4, description: '4x AA' },
      { category: 'hotel', rate: 10, description: '10x Hotels (Portal)' },
    ],
    credits: ['$120 Lyft Credit', '$120 Grubhub Credit'],
    perks: ['Admirals Club Membership', 'Free Checked Bag', 'Priority Check-in'],
    usageStrategy: 'Lounge Access. Full Admirals Club membership for primary + authorized users.',
    rewardName: 'AAdvantage Miles'
  },

  // ==========================================
  // BANK OF AMERICA
  // ==========================================
  {
    id: 'boa_customized',
    name: 'BoA Customized Cash Rewards®',
    issuer: Issuer.BOA,
    annualFee: 0,
    baseMultiplier: 1,
    pointValuation: 1.0,
    multipliers: [
      { category: 'retail_online', rate: 3, description: '3% Choice Category (Default)' },
      { category: 'gas', rate: 3, description: '3% Choice (Option)' },
      { category: 'dining', rate: 3, description: '3% Choice (Option)' },
      { category: 'travel_general', rate: 3, description: '3% Choice (Option)' },
      { category: 'grocery', rate: 2, description: '2% Grocery' },
    ],
    credits: [],
    perks: ['Preferred Rewards Bonus (25%-75%)'],
    usageStrategy: 'Online Shopper. Set to "Online Shopping" for 3% (up to 5.25% w/ Preferred Rewards).',
    rewardName: 'Cash Back'
  },
  {
    id: 'boa_unlimited',
    name: 'BoA Unlimited Cash Rewards®',
    issuer: Issuer.BOA,
    annualFee: 0,
    baseMultiplier: 1.5,
    pointValuation: 1.0,
    multipliers: [],
    credits: [],
    perks: ['Preferred Rewards Bonus (up to 2.62% total)'],
    usageStrategy: 'BoA Catch-All. Great if you have Platinum Honors status (2.62% back).',
    rewardName: 'Cash Back'
  },
  {
    id: 'boa_premium',
    name: 'BoA Premium Rewards®',
    issuer: Issuer.BOA,
    annualFee: 95,
    baseMultiplier: 1.5,
    pointValuation: 1.0,
    multipliers: [
      { category: 'travel_general', rate: 2, description: '2x Travel' },
      { category: 'dining', rate: 2, description: '2x Dining' },
    ],
    credits: ['$100 Airline Incidental Credit', '$100 TSA/Global Entry'],
    perks: ['Preferred Rewards Bonus (up to 3.5x Travel / 2.62x Base)'],
    usageStrategy: 'Preferred Rewards Powerhouse. With Platinum Honors, earns 3.5% on travel/dining and 2.62% everywhere.',
    rewardName: 'Points (Cash Eq.)'
  },
  {
    id: 'boa_premium_elite',
    name: 'BoA Premium Rewards® Elite',
    issuer: Issuer.BOA,
    annualFee: 550,
    baseMultiplier: 1.5,
    pointValuation: 1.0,
    multipliers: [
      { category: 'travel_general', rate: 2, description: '2x Travel' },
      { category: 'dining', rate: 2, description: '2x Dining' },
    ],
    credits: ['$300 Airline Incidental Credit', '$150 Lifestyle Credit', '$100 TSA/Global Entry'],
    perks: ['Priority Pass Select', 'Preferred Rewards Bonus', '20% Airfare Redemption Bonus'],
    usageStrategy: 'High Roller BoA. Massive credits and multipliers for Preferred Rewards members.',
    rewardName: 'Points'
  },
  {
    id: 'boa_alaska',
    name: 'Alaska Airlines Visa®',
    issuer: Issuer.BOA,
    annualFee: 95,
    baseMultiplier: 1,
    pointValuation: 1.5,
    multipliers: [
      { category: 'travel_air', rate: 3, description: '3x Alaska' },
      { category: 'gas', rate: 2, description: '2x Gas' },
      { category: 'transit', rate: 2, description: '2x Transit' },
    ],
    credits: ['Companion Fare (Annually)'],
    perks: ['Free Checked Bag', 'Priority Boarding', '10% Bonus on Miles (w/ BoA account)'],
    usageStrategy: 'Alaska Companion Fare. One of the most valuable airline perks remaining.',
    rewardName: 'Alaska Mileage Plan'
  },
  {
    id: 'boa_alaska_biz',
    name: 'Alaska Airlines Business',
    issuer: Issuer.BOA,
    annualFee: 70, // Per cardholder
    baseMultiplier: 1,
    pointValuation: 1.5,
    multipliers: [
      { category: 'travel_air', rate: 3, description: '3x Alaska' },
      { category: 'gas', rate: 2, description: '2x Gas' },
      { category: 'shipping', rate: 2, description: '2x Shipping' },
    ],
    credits: ['Companion Fare (Annually)'],
    perks: ['Free Checked Bag'],
    usageStrategy: 'Business Companion. Cheap AF for a valuable companion ticket.',
    rewardName: 'Alaska Mileage Plan'
  },

  // ==========================================
  // CAPITAL ONE
  // ==========================================
  {
    id: 'capone_venture_x',
    name: 'Capital One Venture X',
    issuer: Issuer.CAPITAL_ONE,
    annualFee: 395,
    baseMultiplier: 2,
    pointValuation: 1.85,
    multipliers: [
      { category: 'travel_portal_hotel', rate: 10, description: '10x Hotels (Portal)' },
      { category: 'travel_portal_flight', rate: 5, description: '5x Flights (Portal)' },
    ],
    credits: ['$300 Annual Travel Credit', '10,000 Anniversary Miles'],
    perks: ['Capital One Lounge Access', 'Priority Pass', 'Hertz President\'s Circle', 'Cell Phone Protection'],
    usageStrategy: 'Negative Effective Fee. $300 credit + 10k miles ($100) > $395 fee. Keeper.',
    rewardName: 'Capital One Miles',
    transferPartners: ['Avianca', 'British Airways', 'Turkish', 'Wyndham', 'Flying Blue', 'Aeroplan']
  },
  {
    id: 'capone_venture',
    name: 'Capital One Venture Rewards',
    issuer: Issuer.CAPITAL_ONE,
    annualFee: 95,
    baseMultiplier: 2,
    pointValuation: 1.85,
    multipliers: [
      { category: 'travel_portal_hotel', rate: 5, description: '5x Hotels (Portal)' },
    ],
    credits: ['$100 TSA PreCheck/Global Entry'],
    perks: ['2 Free Lounge Visits (Select)', 'No FX Fees'],
    usageStrategy: 'Simple Travel. 2x miles everywhere makes it easy for non-optimizers.',
    rewardName: 'Capital One Miles',
    transferPartners: ['Avianca', 'British Airways', 'Turkish', 'Wyndham', 'Flying Blue', 'Aeroplan']
  },
  {
    id: 'capone_venture_one',
    name: 'Capital One VentureOne',
    issuer: Issuer.CAPITAL_ONE,
    annualFee: 0,
    baseMultiplier: 1.25,
    pointValuation: 1.85,
    multipliers: [
      { category: 'travel_portal_hotel', rate: 5, description: '5x Hotels (Portal)' },
    ],
    credits: [],
    perks: ['No FX Fees', 'Transfer Partners'],
    usageStrategy: 'No Fee Travel. Good entry into Capital One transfer partners.',
    rewardName: 'Capital One Miles',
    transferPartners: ['Avianca', 'British Airways', 'Turkish', 'Wyndham', 'Flying Blue', 'Aeroplan']
  },
  {
    id: 'capone_savor',
    name: 'Capital One Savor Cash Rewards',
    issuer: Issuer.CAPITAL_ONE,
    annualFee: 0,
    baseMultiplier: 1,
    pointValuation: 1.0,
    multipliers: [
      { category: 'dining', rate: 3, description: '3% Dining' },
      { category: 'grocery', rate: 3, description: '3% Grocery' },
      { category: 'streaming', rate: 3, description: '3% Streaming' },
      { category: 'entertainment', rate: 3, description: '3% Entertainment' },
      { category: 'travel_portal_hotel', rate: 5, description: '5% Hotels (Portal)' },
    ],
    credits: [],
    perks: ['No FX Fees', '8% Capital One Entertainment'],
    usageStrategy: 'Entertainment & Food. Unbeatable no-fee card for nights out.',
    rewardName: 'Cash Back'
  },
  {
    id: 'capone_quicksilver',
    name: 'Capital One Quicksilver',
    issuer: Issuer.CAPITAL_ONE,
    annualFee: 0,
    baseMultiplier: 1.5,
    pointValuation: 1.0,
    multipliers: [
      { category: 'travel_portal_hotel', rate: 5, description: '5% Hotels (Portal)' },
    ],
    credits: [],
    perks: ['No FX Fees', '0% Intro APR (Check Offer)'],
    usageStrategy: 'Simple Cash. 1.5% everywhere for people who hate points.',
    rewardName: 'Cash Back'
  },
  {
    id: 'capone_spark_miles',
    name: 'Spark Miles for Business',
    issuer: Issuer.CAPITAL_ONE,
    annualFee: 95, // $0 intro
    baseMultiplier: 2,
    pointValuation: 1.85,
    multipliers: [
       { category: 'travel_portal_hotel', rate: 5, description: '5x Hotels (Portal)' },
    ],
    credits: ['$100 TSA PreCheck/Global Entry'],
    perks: ['Free Employee Cards', 'No FX Fees'],
    usageStrategy: 'Business Travel. 2x miles on all business expenses.',
    rewardName: 'Capital One Miles'
  },
  {
    id: 'capone_venture_x_biz',
    name: 'Capital One Venture X Business',
    issuer: Issuer.CAPITAL_ONE,
    annualFee: 395,
    baseMultiplier: 2,
    pointValuation: 1.85,
    multipliers: [
      { category: 'travel_portal_hotel', rate: 10, description: '10x Hotels (Portal)' },
      { category: 'travel_portal_flight', rate: 5, description: '5x Flights (Portal)' },
    ],
    credits: ['$300 Annual Travel Credit', '10,000 Anniversary Miles'],
    perks: ['Lounge Access', 'No Preset Spending Limit'],
    usageStrategy: 'Big Business Travel. Same perks as personal VX but for business spend.',
    rewardName: 'Capital One Miles'
  },
  {
    id: 'capone_spark_cash',
    name: 'Spark Cash Plus',
    issuer: Issuer.CAPITAL_ONE,
    annualFee: 150,
    baseMultiplier: 2,
    pointValuation: 1.0,
    multipliers: [],
    credits: ['$200 Bonus after $200k spend'],
    perks: ['No Preset Spending Limit', 'Charge Card (Pay in Full)'],
    usageStrategy: 'High Spend Business. Unlimited 2% cash back for big spenders.',
    rewardName: 'Cash Back'
  },

  // ==========================================
  // BARCLAYS
  // ==========================================
  {
    id: 'jetblue_plus',
    name: 'JetBlue Plus Card',
    issuer: Issuer.BARCLAYS,
    annualFee: 99,
    baseMultiplier: 1,
    pointValuation: 1.3,
    multipliers: [
      { category: 'travel_air', rate: 6, description: '6x JetBlue' },
      { category: 'dining', rate: 2, description: '2x Dining' },
      { category: 'grocery', rate: 2, description: '2x Grocery' }
    ],
    credits: ['5,000 Anniversary Points', '$100 Statement Credit (Vacations)'],
    perks: ['Free Checked Bag', '10% Point Redemption Rebate'],
    usageStrategy: 'JetBlue Flyer. The free bag and anniversary points cover the fee.',
    rewardName: 'TrueBlue Points'
  },
  {
    id: 'jetblue_card',
    name: 'JetBlue Card',
    issuer: Issuer.BARCLAYS,
    annualFee: 0,
    baseMultiplier: 1,
    pointValuation: 1.3,
    multipliers: [
      { category: 'travel_air', rate: 3, description: '3x JetBlue' },
      { category: 'dining', rate: 2, description: '2x Dining' },
      { category: 'grocery', rate: 2, description: '2x Grocery' }
    ],
    credits: [],
    perks: ['50% Inflight Savings'],
    usageStrategy: 'No Fee JetBlue. Good for earning points without commitment.',
    rewardName: 'TrueBlue Points'
  },
  {
    id: 'frontier_world',
    name: 'Frontier Airlines World Mastercard®',
    issuer: Issuer.BARCLAYS,
    annualFee: 99,
    baseMultiplier: 1,
    pointValuation: 1.1,
    multipliers: [
      { category: 'travel_air', rate: 5, description: '5x Frontier' },
      { category: 'dining', rate: 3, description: '3x Dining' }
    ],
    credits: ['$100 Flight Voucher (Anniversary w/ spend)'],
    perks: ['2 Free Checked Bags', 'Zone 2 Boarding'],
    usageStrategy: 'Frontier Loyalists. The free bags are essential for Frontier.',
    rewardName: 'Frontier Miles'
  },
  {
    id: 'wyndham_earner_plus',
    name: 'Wyndham Rewards Earner® Plus',
    issuer: Issuer.BARCLAYS,
    annualFee: 75,
    baseMultiplier: 1,
    pointValuation: 1.1,
    multipliers: [
      { category: 'hotel', rate: 6, description: '6x Wyndham' },
      { category: 'gas', rate: 4, description: '4x Gas' },
      { category: 'dining', rate: 4, description: '4x Dining' }
    ],
    credits: ['7,500 Anniversary Points'],
    perks: ['Platinum Status', 'Cardholder Rate Discount'],
    usageStrategy: 'Gas & Hotels. 4x on gas and Platinum status is strong value.',
    rewardName: 'Wyndham Rewards'
  },
  {
    id: 'wyndham_earner',
    name: 'Wyndham Rewards Earner®',
    issuer: Issuer.BARCLAYS,
    annualFee: 0,
    baseMultiplier: 1,
    pointValuation: 1.1,
    multipliers: [
      { category: 'hotel', rate: 5, description: '5x Wyndham' },
      { category: 'gas', rate: 5, description: '5x Gas' },
      { category: 'grocery', rate: 2, description: '2x Grocery' }
    ],
    credits: [],
    perks: ['Gold Status', 'Cardholder Rate Discount'],
    usageStrategy: 'Best Gas Card? 5x Wyndham on Gas with no AF is a sleeper hit.',
    rewardName: 'Wyndham Rewards'
  },
  {
    id: 'hawaiian_mc',
    name: 'Hawaiian Airlines® World Elite',
    issuer: Issuer.BARCLAYS,
    annualFee: 99,
    baseMultiplier: 1,
    pointValuation: 1.0,
    multipliers: [
      { category: 'travel_air', rate: 3, description: '3x Hawaiian' },
      { category: 'gas', rate: 2, description: '2x Gas' },
      { category: 'dining', rate: 2, description: '2x Dining' },
      { category: 'grocery', rate: 2, description: '2x Grocery' },
    ],
    credits: ['50% Off Companion Discount'],
    perks: ['Free Checked Bag'],
    usageStrategy: 'Hawaii Travel. Good for frequent Hawaiian airlines flyers.',
    rewardName: 'HawaiianMiles'
  },

  // ==========================================
  // US BANK
  // ==========================================
  {
    id: 'usb_cash_plus',
    name: 'U.S. Bank Cash+®',
    issuer: Issuer.US_BANK,
    annualFee: 0,
    baseMultiplier: 1,
    pointValuation: 1.0,
    multipliers: [
      { category: 'utilities', rate: 5, description: '5% Choice (e.g. Utilities)' },
      { category: 'tech', rate: 5, description: '5% Choice (e.g. Electronics)' },
      { category: 'phone', rate: 5, description: '5% Choice (e.g. Phone)' },
      { category: 'dining', rate: 2, description: '2% Choice (e.g. Dining)' },
      { category: 'grocery', rate: 2, description: '2% Choice (e.g. Grocery)' }
    ],
    credits: [],
    perks: ['Select 2 Categories for 5%'],
    usageStrategy: 'Utility Bill Master. Use for Utilities and Internet/Phone bills.',
    rewardName: 'Cash Back'
  },
  {
    id: 'usb_altitude_connect',
    name: 'U.S. Bank Altitude® Connect',
    issuer: Issuer.US_BANK,
    annualFee: 0, // Removed fee recently
    baseMultiplier: 1,
    pointValuation: 1.0,
    multipliers: [
      { category: 'travel_portal_hotel', rate: 5, description: '5x Hotels/Car (Portal)' },
      { category: 'travel_general', rate: 4, description: '4x Travel' },
      { category: 'gas', rate: 4, description: '4x Gas' }
    ],
    credits: [],
    perks: ['Priority Pass (Limited Visits)', 'Global Entry/TSA Credit'],
    usageStrategy: 'No Fee Travel. 4x on Gas and Travel with no annual fee is excellent.',
    rewardName: 'Go Points'
  },
  {
    id: 'usb_smartly',
    name: 'U.S. Bank Smartly™',
    issuer: Issuer.US_BANK,
    annualFee: 0,
    baseMultiplier: 2,
    pointValuation: 1.0,
    multipliers: [],
    credits: [],
    perks: ['Yield-based boosting (Up to 4% back)'],
    usageStrategy: 'Flat Rate Booster. 2% base, but scales up if you bank with US Bank.',
    rewardName: 'Cash Back'
  },

  // ==========================================
  // WELLS FARGO
  // ==========================================
  {
    id: 'wf_active_cash',
    name: 'Wells Fargo Active Cash®',
    issuer: Issuer.WELLS_FARGO,
    annualFee: 0,
    baseMultiplier: 2,
    pointValuation: 1.0,
    multipliers: [],
    credits: [],
    perks: ['Cell Phone Protection'],
    usageStrategy: 'Simple 2%. One of the best flat-rate cards on the market.',
    rewardName: 'Cash Rewards'
  },
  {
    id: 'wf_autograph_journey',
    name: 'Wells Fargo Autograph Journey℠',
    issuer: Issuer.WELLS_FARGO,
    annualFee: 95,
    baseMultiplier: 1,
    pointValuation: 1.0,
    multipliers: [
      { category: 'hotel', rate: 5, description: '5x Hotels' },
      { category: 'travel_air', rate: 4, description: '4x Airlines' },
      { category: 'dining', rate: 3, description: '3x Dining' }
    ],
    credits: ['$50 Annual Flight Credit'],
    perks: ['Transfer Partners', 'No FX Fees'],
    usageStrategy: 'Travel Earner. Strong multipliers for direct hotel/air bookings.',
    rewardName: 'Wells Fargo Rewards'
  },
  {
    id: 'wf_autograph',
    name: 'Wells Fargo Autograph℠',
    issuer: Issuer.WELLS_FARGO,
    annualFee: 0,
    baseMultiplier: 1,
    pointValuation: 1.0,
    multipliers: [
      { category: 'dining', rate: 3, description: '3x Dining' },
      { category: 'travel_general', rate: 3, description: '3x Travel' },
      { category: 'gas', rate: 3, description: '3x Gas' },
      { category: 'transit', rate: 3, description: '3x Transit' },
      { category: 'streaming', rate: 3, description: '3x Streaming' },
      { category: 'phone', rate: 3, description: '3x Phone Plans' },
    ],
    credits: [],
    perks: ['Cell Phone Protection', 'No FX Fees'],
    usageStrategy: 'The No-Fee Swiss Army Knife. 3x in almost every common category.',
    rewardName: 'Wells Fargo Rewards'
  },

  // ==========================================
  // DISCOVER
  // ==========================================
  {
    id: 'discover_it',
    name: 'Discover it® Cash Back',
    issuer: Issuer.DISCOVER,
    annualFee: 0,
    baseMultiplier: 1,
    pointValuation: 1.0,
    multipliers: [
      { category: 'rotating', rate: 5, description: '5% Rotating Categories' },
    ],
    credits: [],
    perks: ['Cashback Match (Year 1)'],
    usageStrategy: 'Rotator. Use only for the 5% category of the quarter.',
    rewardName: 'Cash Back'
  },
  {
    id: 'discover_chrome',
    name: 'Discover it® Chrome',
    issuer: Issuer.DISCOVER,
    annualFee: 0,
    baseMultiplier: 1,
    pointValuation: 1.0,
    multipliers: [
      { category: 'gas', rate: 2, description: '2% Gas ($1k cap/qtr)' },
      { category: 'dining', rate: 2, description: '2% Dining ($1k cap/qtr)' }
    ],
    credits: [],
    perks: ['Cashback Match (Year 1)'],
    usageStrategy: 'Starter Gas/Dining. Good for building credit with decent rewards.',
    rewardName: 'Cash Back'
  },
  {
    id: 'discover_miles',
    name: 'Discover it® Miles',
    issuer: Issuer.DISCOVER,
    annualFee: 0,
    baseMultiplier: 1.5,
    pointValuation: 1.0,
    multipliers: [],
    credits: [],
    perks: ['Cashback Match (Year 1 = 3% total)'],
    usageStrategy: 'Year 1 Hero. Effectively 3% back on everything for the first year.',
    rewardName: 'Miles (Cash Back)'
  },
  {
    id: 'discover_student',
    name: 'Discover it® Student Cash Back',
    issuer: Issuer.DISCOVER,
    annualFee: 0,
    baseMultiplier: 1,
    pointValuation: 1.0,
    multipliers: [
      { category: 'rotating', rate: 5, description: '5% Rotating Categories' }
    ],
    credits: ['$20 Good Grades Statement Credit'],
    perks: ['Cashback Match (Year 1)'],
    usageStrategy: 'Student Starter. Best first card for students.',
    rewardName: 'Cash Back'
  },

  // ==========================================
  // BILT
  // ==========================================
  {
    id: 'bilt',
    name: 'Bilt Mastercard®',
    issuer: Issuer.BILT,
    annualFee: 0,
    baseMultiplier: 1,
    pointValuation: 2.05,
    multipliers: [
      { category: 'rent', rate: 1, description: '1x Rent (No Fees)' },
      { category: 'travel_general', rate: 2, description: '2x Travel' },
      { category: 'dining', rate: 3, description: '3x Dining' },
    ],
    credits: ['Rent Day Double Points'],
    perks: ['Cell Phone Protection', 'Trip Delay Protection', 'No FX Fees'],
    usageStrategy: 'The Rent Card. The only way to pay rent without fees. Also great for Dining.',
    rewardName: 'Bilt Points',
    transferPartners: ['Hyatt', 'United', 'Alaska', 'American Airlines', 'Air Canada', 'Flying Blue']
  },
];
