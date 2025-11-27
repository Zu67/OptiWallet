import React, { useMemo } from 'react';
import { Card, Issuer } from '../types';
import { CheckCircle2, Circle, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

interface CreditsTrackerProps {
  cards: Card[];
  usage: Record<string, boolean>;
  onToggle: (cardId: string, credit: string) => void;
}

const CreditsTracker: React.FC<CreditsTrackerProps> = ({ cards, usage, onToggle }) => {
  
  // Helper to extract dollar value from credit string (e.g. "$300 Travel Credit" -> 300)
  const extractValue = (credit: string): number => {
    const match = credit.match(/\$([\d,]+)/);
    if (match && match[1]) {
      return parseInt(match[1].replace(/,/g, ''), 10);
    }
    return 0;
  };

  // Compute stats
  const stats = useMemo(() => {
    let totalPotential = 0;
    let totalRealized = 0;
    let totalCreditsCount = 0;
    let usedCreditsCount = 0;

    const cardsWithCredits = cards.filter(c => c.credits && c.credits.length > 0);

    const cardStats = cardsWithCredits.map(card => {
      let cardPotential = 0;
      let cardRealized = 0;

      card.credits?.forEach(credit => {
        const val = extractValue(credit);
        const key = `${card.id}-${credit}`;
        const isUsed = usage[key];

        cardPotential += val;
        if (isUsed) cardRealized += val;
        
        totalCreditsCount++;
        if (isUsed) usedCreditsCount++;
      });

      return {
        ...card,
        cardPotential,
        cardRealized,
        progress: cardPotential > 0 ? (cardRealized / cardPotential) * 100 : 0
      };
    });

    totalPotential = cardStats.reduce((acc, c) => acc + c.cardPotential, 0);
    totalRealized = cardStats.reduce((acc, c) => acc + c.cardRealized, 0);

    return { totalPotential, totalRealized, totalCreditsCount, usedCreditsCount, cardStats };
  }, [cards, usage]);

  // Helper for card gradient border/accent
  const getIssuerColor = (issuer: Issuer) => {
    switch (issuer) {
      case Issuer.AMEX: return 'text-yellow-600 dark:text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800';
      case Issuer.CHASE: return 'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      case Issuer.CAPITAL_ONE: return 'text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700';
      default: return 'text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700';
    }
  };

  if (stats.cardStats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 text-center">
         <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full mb-4">
            <DollarSign className="w-8 h-8 text-slate-400" />
         </div>
         <h3 className="text-xl font-bold text-slate-900 dark:text-white">No Credits Available</h3>
         <p className="text-slate-500 dark:text-slate-400 max-w-sm mt-2">
           None of your active cards have annual credits associated with them. Add premium cards like Sapphire Reserve or Amex Platinum to track credits.
         </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-3xl p-6 text-white shadow-xl shadow-blue-500/20">
          <h3 className="text-blue-100 text-sm font-bold uppercase tracking-wider mb-2">Total Value Extracted</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold">${stats.totalRealized}</span>
            <span className="text-blue-200 font-medium">/ ${stats.totalPotential}</span>
          </div>
          <div className="mt-4 w-full bg-blue-900/30 rounded-full h-2">
            <div 
              className="bg-white rounded-full h-2 transition-all duration-500" 
              style={{ width: `${stats.totalPotential > 0 ? (stats.totalRealized / stats.totalPotential) * 100 : 0}%` }}
            ></div>
          </div>
          <p className="text-xs text-blue-200 mt-2 text-right">
             {stats.totalPotential > 0 ? Math.round((stats.totalRealized / stats.totalPotential) * 100) : 0}% Realized
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-center">
           <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
                <CheckCircle2 size={20} />
              </div>
              <span className="text-slate-500 dark:text-slate-400 font-medium text-sm">Credits Used</span>
           </div>
           <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.usedCreditsCount}</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 flex flex-col justify-center">
           <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg text-amber-600 dark:text-amber-400">
                <AlertCircle size={20} />
              </div>
              <span className="text-slate-500 dark:text-slate-400 font-medium text-sm">Credits Remaining</span>
           </div>
           <p className="text-3xl font-bold text-slate-900 dark:text-white">{stats.totalCreditsCount - stats.usedCreditsCount}</p>
        </div>
      </div>

      {/* Credit List */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white pl-1">Available Credits</h2>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {stats.cardStats.map(card => (
            <div key={card.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
               {/* Card Header */}
               <div className={`px-6 py-4 border-b ${getIssuerColor(card.issuer)} flex justify-between items-center`}>
                  <div className="flex items-center gap-3">
                     <span className="font-bold">{card.name}</span>
                  </div>
                  <div className="text-xs font-bold px-2 py-1 bg-white/50 dark:bg-black/20 rounded-lg">
                    ${card.cardRealized} / ${card.cardPotential}
                  </div>
               </div>
               
               {/* Credits List */}
               <div className="p-2">
                 {card.credits?.map((credit, idx) => {
                   const key = `${card.id}-${credit}`;
                   const isUsed = usage[key];
                   const value = extractValue(credit);
                   
                   return (
                     <div 
                       key={key} 
                       onClick={() => onToggle(card.id, credit)}
                       className={`
                         flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all duration-200 group
                         ${isUsed 
                            ? 'bg-slate-50 dark:bg-slate-900 opacity-60' 
                            : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                         }
                       `}
                     >
                       <div className="flex items-center gap-4">
                          <button 
                            className={`
                              w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200
                              ${isUsed 
                                ? 'bg-green-500 text-white scale-100' 
                                : 'border-2 border-slate-300 dark:border-slate-600 text-transparent group-hover:border-blue-400'
                              }
                            `}
                          >
                            <CheckCircle2 size={16} />
                          </button>
                          <span className={`text-sm font-medium ${isUsed ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-200'}`}>
                            {credit}
                          </span>
                       </div>
                       
                       {value > 0 && (
                         <span className={`text-sm font-bold ${isUsed ? 'text-slate-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                           ${value}
                         </span>
                       )}
                     </div>
                   );
                 })}
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreditsTracker;
