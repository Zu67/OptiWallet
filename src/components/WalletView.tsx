import React from 'react';
import { Card, Issuer } from '../types';
import { CheckCircle2, DollarSign, ShieldCheck, Wifi } from 'lucide-react';

interface WalletViewProps {
  cards: Card[];
}

const WalletView: React.FC<WalletViewProps> = ({ cards }) => {
  // Helper for card styles (Shared with Strategy, could be refactored to utils)
  const getCardStyle = (issuer: Issuer) => {
    const base = "relative overflow-hidden p-6 flex flex-col justify-between h-56 rounded-2xl shadow-xl transition-transform hover:scale-[1.01] ";
    switch (issuer) {
      case Issuer.AMEX: return base + 'bg-gradient-to-br from-yellow-100 via-yellow-300 to-yellow-500 text-yellow-900';
      case Issuer.CHASE: return base + 'bg-gradient-to-br from-blue-700 via-blue-800 to-blue-950 text-white';
      case Issuer.CAPITAL_ONE: return base + 'bg-gradient-to-br from-slate-600 to-slate-900 text-white';
      case Issuer.CITI: return base + 'bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 text-slate-800';
      case Issuer.DISCOVER: return base + 'bg-gradient-to-br from-orange-400 to-orange-600 text-white';
      case Issuer.WELLS_FARGO: return base + 'bg-gradient-to-br from-red-600 to-red-800 text-white';
      case Issuer.BILT: return base + 'bg-gradient-to-br from-stone-800 to-stone-950 text-white border border-stone-600';
      default: return base + 'bg-gradient-to-br from-slate-600 to-slate-800 text-white';
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-slate-200 dark:border-slate-800 pb-6 gap-4">
        <div>
           <h2 className="text-3xl font-bold text-slate-900 dark:text-white">My Wallet</h2>
           <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">
             You have <span className="font-bold text-slate-900 dark:text-white">{cards.length} cards</span>. Here is your benefits breakdown.
           </p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {cards.map(card => (
          <div key={card.id} className="bg-white dark:bg-slate-900 rounded-3xl p-2 shadow-sm border border-slate-200 dark:border-slate-800">
            {/* Visual Card Header */}
            <div className={`${getCardStyle(card.issuer)} mb-2`}>
               {/* Decorative background elements */}
               <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-white opacity-10 blur-3xl rounded-full pointer-events-none"></div>
               
               <div className="flex justify-between items-start z-10">
                 <span className="font-bold tracking-widest uppercase opacity-75 text-sm">{card.issuer}</span>
                 <Wifi size={24} className="opacity-75 rotate-90" />
               </div>
               
               <div className="z-10 mt-auto">
                 <div className="w-12 h-9 bg-yellow-400/80 rounded mb-4 shadow-sm"></div>
                 <h3 className="text-2xl font-bold leading-tight drop-shadow-md">{card.name}</h3>
                 <div className="flex justify-between items-end mt-4 opacity-90">
                   <span className="font-mono text-sm tracking-wider">•••• •••• •••• 1234</span>
                   <span className="text-xs font-bold">{card.annualFee > 0 ? `$${card.annualFee}/yr` : 'NO FEE'}</span>
                 </div>
               </div>
            </div>

            {/* Details Body */}
            <div className="p-6 space-y-8">
              
              {/* Credits Section (If applicable) */}
              {card.credits && card.credits.length > 0 && (
                <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-xl p-4 border border-emerald-100 dark:border-emerald-900/30">
                  <h4 className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <DollarSign size={14} /> Annual Value & Credits
                  </h4>
                  <div className="space-y-2">
                    {card.credits.map((credit, i) => (
                      <div key={i} className="flex items-start gap-2 text-sm text-emerald-900 dark:text-emerald-100">
                        <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                        <span className="font-medium">{credit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Multipliers */}
              <div>
                <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4">
                   Earning Power
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                   <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-3 text-center border border-slate-100 dark:border-slate-700">
                      <span className="block text-xl font-black text-slate-900 dark:text-white">{card.baseMultiplier}×</span>
                      <span className="text-[10px] uppercase font-bold text-slate-400">Base</span>
                   </div>
                   {card.multipliers.slice(0, 5).map((m, idx) => (
                     <div key={idx} className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 text-center border border-blue-100 dark:border-blue-900/30">
                        <span className="block text-xl font-black text-blue-600 dark:text-blue-400">{m.rate}×</span>
                        <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 truncate w-full block">{m.category.replace('_', ' ')}</span>
                     </div>
                   ))}
                </div>
              </div>

              {/* Benefits Grid */}
              <div>
                 <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                   <ShieldCheck size={14} /> Key Protections & Perks
                 </h4>
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                   {card.perks.map((perk, i) => (
                     <div key={i} className="text-sm text-slate-700 dark:text-slate-300 flex items-start gap-2.5">
                       <div className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"></div>
                       <span className="leading-snug">{perk}</span>
                     </div>
                   ))}
                 </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WalletView;