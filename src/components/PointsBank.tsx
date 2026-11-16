import React, { useState, useMemo } from 'react';
import { Card } from '../types';
import { Coins, ArrowRightLeft, TrendingUp, Plane, Wallet } from 'lucide-react';

interface PointsBankProps {
  cards: Card[];
  balances: Record<string, number>;
  onUpdateBalance: (id: string, amount: number) => void;
}

interface PointGroup {
  cards: Card[];
  totalPoints: number;
  totalValue: number;
  partners: string[];
  valuation: number;
}

const PointsBank: React.FC<PointsBankProps> = ({ cards, balances, onUpdateBalance }) => {
  // Group cards by Reward Program (e.g. "Ultimate Rewards" or "Membership Rewards")
  const groupedPoints = useMemo<Record<string, PointGroup>>(() => {
    const groups: Record<string, PointGroup> = {};
    
    cards.forEach(card => {
      // Use rewardName or fallback to card name if unique currency
      const currency = card.rewardName || card.name;
      
      if (!groups[currency]) {
        groups[currency] = {
          cards: [],
          totalPoints: 0,
          totalValue: 0,
          partners: card.transferPartners || [],
          valuation: card.pointValuation
        };
      }
      
      const balance = balances[card.id] || 0;
      groups[currency].cards.push(card);
      groups[currency].totalPoints += balance;
      groups[currency].totalValue += (balance * card.pointValuation) / 100;
    });

    return groups;
  }, [cards, balances]);

  const grandTotalValue = (Object.values(groupedPoints) as PointGroup[]).reduce((acc, group) => acc + group.totalValue, 0);

  // Helper to format currency to avoid toLocaleString TS issues if environment is older
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(val);
  };
  
  // Helper for number formatting
  const formatNumber = (val: number) => {
     return new Intl.NumberFormat('en-US').format(val);
  };

  return (
    <div className="space-y-8">
      {/* Total Portfolio Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 rounded-3xl p-8 text-white shadow-xl shadow-emerald-500/20 relative overflow-hidden">
         <div className="absolute top-0 right-0 opacity-10 transform translate-x-10 -translate-y-10">
            <Coins size={300} />
         </div>
         <div className="relative z-10">
            <h2 className="text-xl font-medium text-emerald-100 mb-2">Total Points Value</h2>
            <div className="text-5xl font-bold tracking-tight">
               ${formatCurrency(grandTotalValue)}
            </div>
            <p className="mt-4 text-emerald-100 text-sm max-w-xl">
               This is an estimated value based on expert valuations (e.g., 2.05¢ for Chase/Bilt, 2.0¢ for Amex). 
               Real redemption value may vary.
            </p>
         </div>
      </div>

      {/* Currency Groups */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         {(Object.entries(groupedPoints) as [string, PointGroup][]).map(([currency, data]) => (
            <div key={currency} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
               {/* Header */}
               <div className="p-6 bg-slate-50 dark:bg-slate-950/50 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between items-start mb-2">
                     <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Wallet className="w-5 h-5 text-blue-500" />
                        {currency}
                     </h3>
                     <span className="text-xs font-bold px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full">
                        ~{data.valuation}¢ / pt
                     </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                     <span className="text-3xl font-black text-slate-800 dark:text-slate-100">
                        {formatNumber(data.totalPoints)}
                     </span>
                     <span className="text-sm font-medium text-slate-400">pts</span>
                  </div>
                  <div className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                     ≈ ${formatCurrency(data.totalValue)} value
                  </div>
               </div>

               {/* Card Inputs */}
               <div className="p-6 space-y-4 flex-grow">
                  {data.cards.map(card => (
                     <div key={card.id} className="flex items-center gap-4">
                        <div className="flex-grow min-w-0">
                           <p className="text-sm font-bold text-slate-700 dark:text-slate-300 truncate">{card.name}</p>
                           <p className="text-xs text-slate-400">Enter balance</p>
                        </div>
                        <div className="relative w-32">
                           <input
                              type="number"
                              value={balances[card.id] || ''}
                              onChange={(e) => onUpdateBalance(card.id, parseInt(e.target.value) || 0)}
                              placeholder="0"
                              className="w-full pl-3 pr-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-right text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                           />
                        </div>
                     </div>
                  ))}
               </div>

               {/* Transfer Partners */}
               {data.partners.length > 0 && (
                  <div className="bg-slate-50 dark:bg-slate-800/30 p-5 border-t border-slate-100 dark:border-slate-800">
                     <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        <ArrowRightLeft size={12} /> Transfer Partners
                     </h4>
                     <div className="flex flex-wrap gap-2">
                        {data.partners.map(partner => (
                           <span key={partner} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                              {partner}
                           </span>
                        ))}
                     </div>
                  </div>
               )}
            </div>
         ))}
      </div>
    </div>
  );
};

export default PointsBank;