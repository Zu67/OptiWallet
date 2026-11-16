import React, { useState } from 'react';
import { SPENDING_CATEGORIES } from '../constants';
import { Card, Issuer } from '../types';
import * as Icons from 'lucide-react';

interface StrategyViewProps {
  cards: Card[];
}

const StrategyView: React.FC<StrategyViewProps> = ({ cards }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('dining');

  // Logic to find the best card for the selected category
  const getBestCards = (categoryId: string) => {
    return cards.map(card => {
      let effectiveMultiplier = card.baseMultiplier;
      let note = 'Base rate';
      let penalty = 0; // Fee penalty in percentage points (e.g. 3.0 for 3%)

      // --- 1. RENT LOGIC ---
      if (categoryId === 'rent') {
        const specific = card.multipliers.find(m => m.category === 'rent');
        if (specific) {
          effectiveMultiplier = specific.rate;
          note = specific.description || 'Waives fees';
          penalty = 0;
        } else {
          effectiveMultiplier = card.baseMultiplier;
          note = 'Incurs ~3% Transaction Fee';
          penalty = 3.0; 
        }
      } 
      // --- 2. HOTEL LOGIC ---
      else if (categoryId === 'hotel_hyatt' || categoryId === 'hotel_marriott') {
        const specific = card.multipliers.find(m => {
           const isPortal = m.category.includes('portal');
           if (isPortal) return false;

           if (categoryId === 'hotel_hyatt') {
             return m.category === 'hotel_hyatt' || m.category === 'hotel' || m.category === 'travel_general';
           }
           if (categoryId === 'hotel_marriott') {
             return m.category === 'hotel_marriott' || m.category === 'hotel' || m.category === 'travel_general';
           }
           return false;
        });

        if (specific) {
          effectiveMultiplier = specific.rate;
          note = specific.description || 'Direct Booking';
        }
      }
      // --- 3. GENERAL LOGIC ---
      else {
        const specific = card.multipliers.find(m => {
          if (categoryId === 'dining') return m.category === 'dining';
          if (categoryId === 'grocery') return m.category === 'grocery' || m.category === 'grocery_online';
          if (categoryId === 'travel_air') return m.category === 'travel_air' || (m.category.includes('travel') && !m.category.includes('portal'));
          if (categoryId === 'travel_general') return m.category.includes('travel');
          if (categoryId === 'gas') return m.category === 'gas' || m.category === 'rotating';
          if (categoryId === 'amazon') return m.category === 'amazon' || m.category === 'grocery'; // Prime card usually
          return false;
        });

        if (specific) {
          effectiveMultiplier = specific.rate;
          note = specific.description || 'Category Bonus';
        }
      }

      const grossReturn = effectiveMultiplier * card.pointValuation;
      const netReturn = grossReturn - penalty;

      return {
        ...card,
        effectiveRate: effectiveMultiplier,
        returnRate: netReturn,
        grossReturn,
        penalty,
        note
      };
    }).sort((a, b) => b.returnRate - a.returnRate);
  };

  const rankedCards = getBestCards(selectedCategory);
  const bestCard = rankedCards[0];
  const runnersUp = rankedCards.slice(1, 4);

  const LucideIcon = ({ name, className }: { name: string, className?: string }) => {
    const Icon = (Icons as any)[name];
    return Icon ? <Icon className={className} /> : <Icons.CreditCard className={className} />;
  };

  // Helper for gradient styles based on issuer (Visual candy)
  const getCardGradient = (issuer: Issuer) => {
    switch (issuer) {
      case Issuer.AMEX: return 'bg-gradient-to-br from-yellow-100 to-yellow-500 text-yellow-900';
      case Issuer.CHASE: return 'bg-gradient-to-br from-blue-700 to-blue-900 text-white';
      case Issuer.CAPITAL_ONE: return 'bg-gradient-to-br from-slate-700 to-slate-900 text-white';
      case Issuer.CITI: return 'bg-gradient-to-br from-gray-200 to-gray-400 text-slate-800';
      case Issuer.DISCOVER: return 'bg-gradient-to-br from-orange-400 to-orange-600 text-white';
      case Issuer.WELLS_FARGO: return 'bg-gradient-to-br from-red-600 to-red-800 text-white';
      case Issuer.BILT: return 'bg-gradient-to-br from-stone-800 to-stone-950 text-white border border-stone-700';
      default: return 'bg-gradient-to-br from-slate-600 to-slate-800 text-white';
    }
  };

  if (!bestCard) return <div>Add cards to see strategy</div>;

  return (
    <div className="space-y-8">
      {/* Category Horizontal Scroll */}
      <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 px-1">
          I am spending on...
        </h3>
        <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar snap-x">
          {SPENDING_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex-shrink-0 snap-start flex flex-col items-center justify-center w-24 h-24 rounded-2xl border transition-all duration-300 ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/30 scale-105'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <LucideIcon name={cat.iconName} className="w-8 h-8 mb-2" />
              <span className="text-xs font-medium text-center leading-tight px-1">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Hero Result Section */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Main Winner Card */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-1 shadow-xl border border-slate-200 dark:border-slate-800 h-full">
            <div className="h-full bg-slate-50 dark:bg-slate-950/50 rounded-[22px] p-6 sm:p-8 flex flex-col items-center text-center">
              
              <span className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide mb-6">
                <Icons.Trophy size={16} /> Best Choice
              </span>

              {/* Visual Credit Card */}
              <div className={`w-full max-w-sm aspect-[1.586/1] rounded-2xl shadow-2xl mb-8 p-6 flex flex-col justify-between relative overflow-hidden transition-transform hover:scale-[1.02] ${getCardGradient(bestCard.issuer)}`}>
                 {/* Shine effect */}
                 <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white opacity-10 blur-3xl rounded-full pointer-events-none"></div>
                 
                 <div className="flex justify-between items-start z-10">
                    <span className="font-bold tracking-widest uppercase opacity-80">{bestCard.issuer}</span>
                    <Icons.Wifi size={24} className="opacity-70 rotate-90" />
                 </div>
                 <div className="z-10 text-left">
                    <div className="w-12 h-9 bg-yellow-400/80 rounded mb-2"></div> {/* Chip */}
                    <h3 className="text-xl sm:text-2xl font-bold leading-tight drop-shadow-md">{bestCard.name}</h3>
                 </div>
              </div>

              <div className="space-y-4 max-w-lg w-full">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Earn Rate</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-slate-900 dark:text-white">{bestCard.effectiveRate}×</span>
                    <span className="text-slate-500 dark:text-slate-400 font-bold">pts</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Est. Return</span>
                  <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                    {bestCard.returnRate.toFixed(2)}%
                  </span>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl text-left flex gap-3">
                  <Icons.Info className="flex-shrink-0 text-blue-600 dark:text-blue-400 mt-1" size={20} />
                  <div>
                    <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">
                      {bestCard.note}
                    </p>
                    {bestCard.penalty > 0 && (
                      <p className="text-xs text-red-600 dark:text-red-400 font-bold mt-1">
                        Warning: -{bestCard.penalty}% fee applied
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Runners Up */}
        <div className="lg:col-span-2 flex flex-col gap-4">
           <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider pl-1">
             Alternative Options
           </h3>
           {runnersUp.map((card, idx) => (
             <div key={card.id} className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 shadow-sm hover:shadow-md transition-all">
                <div className="flex-shrink-0 w-12 h-8 rounded bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600"></div>
                <div className="flex-grow min-w-0">
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm truncate">{card.name}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{card.note}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className={`block font-bold text-sm ${card.returnRate > 0 ? 'text-slate-700 dark:text-slate-300' : 'text-red-500'}`}>
                    {card.returnRate.toFixed(2)}%
                  </span>
                  <span className="text-xs text-slate-400">
                    {card.effectiveRate}×
                  </span>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default StrategyView;