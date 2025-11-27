import React, { useState, useMemo } from 'react';
import { MASTER_CARDS_LIST } from '../constants';
import { Issuer, Card } from '../types';
import { Plus, Check, Search, ChevronDown, ChevronRight, CreditCard, Briefcase, User, Filter } from 'lucide-react';

interface CardCatalogProps {
  selectedCardIds: string[];
  onToggleCard: (id: string) => void;
}

type CategoryFilter = 'all' | 'personal' | 'business';

const CardCatalog: React.FC<CardCatalogProps> = ({ selectedCardIds, onToggleCard }) => {
  const [searchTerm, setSearchTerm] = useState('');
  // Default all sections to CLOSED ({})
  const [openSections, setOpenSections] = useState<{[key: string]: boolean}>({});
  // Default filter to 'Personal' to reduce initial noise, or 'All' if preferred
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('personal');

  const toggleSection = (issuer: string) => {
    setOpenSections(prev => ({...prev, [issuer]: !prev[issuer]}));
  };

  // Helper to determine if a card is business-focused based on naming conventions
  const isBusinessCard = (card: Card) => {
    const name = card.name.toLowerCase();
    const issuer = card.issuer.toLowerCase();
    return name.includes('business') || 
           name.includes('ink') || 
           name.includes('spark') || 
           name.includes('corporate') ||
           name.includes('biz');
  };

  const groupedCards = useMemo(() => {
    const groups: {[key: string]: Card[]} = {};
    
    MASTER_CARDS_LIST.forEach(card => {
      // 1. Search Filter
      const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            card.issuer.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (!matchesSearch) return;

      // 2. Category Filter
      const isBiz = isBusinessCard(card);
      if (categoryFilter === 'personal' && isBiz) return;
      if (categoryFilter === 'business' && !isBiz) return;

      // 3. Grouping
      if (!groups[card.issuer]) groups[card.issuer] = [];
      groups[card.issuer].push(card);
    });
    
    return groups;
  }, [searchTerm, categoryFilter]);

  const issuers = Object.values(Issuer);
  const activeGroupCount = Object.keys(groupedCards).length;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header & Controls */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Card Catalog</h2>
            <p className="text-slate-500 dark:text-slate-400">
              Select cards to add to your wallet.
            </p>
          </div>

          {/* Type Toggles */}
          <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-xl flex items-center self-start md:self-auto">
            <button
              onClick={() => setCategoryFilter('personal')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                categoryFilter === 'personal'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
              }`}
            >
              <User size={16} /> Personal
            </button>
            <button
              onClick={() => setCategoryFilter('business')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                categoryFilter === 'business'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
              }`}
            >
              <Briefcase size={16} /> Business
            </button>
            <button
              onClick={() => setCategoryFilter('all')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                categoryFilter === 'all'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
              }`}
            >
              <Filter size={16} /> All
            </button>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search by card name or bank..."
            className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Issuers List */}
      <div className="space-y-4">
        {activeGroupCount === 0 ? (
           <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-700">
             <CreditCard className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
             <h3 className="text-lg font-bold text-slate-900 dark:text-white">No cards found</h3>
             <p className="text-slate-500 dark:text-slate-400">Try adjusting your search or filters.</p>
           </div>
        ) : (
          issuers.map(issuer => {
            const cards = groupedCards[issuer];
            if (!cards || cards.length === 0) return null;
            
            const isOpen = openSections[issuer];
            const addedCount = cards.filter(c => selectedCardIds.includes(c.id)).length;

            return (
              <div key={issuer} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all duration-300">
                <button 
                  onClick={() => toggleSection(issuer)}
                  className={`w-full flex items-center justify-between p-5 transition-colors ${
                    isOpen ? 'bg-slate-50 dark:bg-slate-800/50' : 'hover:bg-slate-50 dark:hover:bg-slate-800/30'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {/* Issuer Logo Placeholder or Icon */}
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold text-white shadow-sm ${
                      issuer === Issuer.AMEX ? 'bg-blue-500' :
                      issuer === Issuer.CHASE ? 'bg-indigo-600' :
                      issuer === Issuer.CITI ? 'bg-blue-400' :
                      'bg-slate-600'
                    }`}>
                      {issuer.charAt(0)}
                    </div>
                    
                    <div className="text-left">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">{issuer}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                        {cards.length} cards available {addedCount > 0 && `• ${addedCount} added`}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {addedCount > 0 && !isOpen && (
                      <span className="flex items-center gap-1.5 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-full">
                        <Check size={12} /> {addedCount} Added
                      </span>
                    )}
                    <div className={`p-2 rounded-full transition-all ${isOpen ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200' : 'text-slate-400'}`}>
                      {isOpen ? <ChevronDown size={20}/> : <ChevronRight size={20}/>}
                    </div>
                  </div>
                </button>

                {isOpen && (
                  <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 border-t border-slate-100 dark:border-slate-800 animate-in fade-in slide-in-from-top-1 duration-200">
                    {cards.map(card => {
                      const isSelected = selectedCardIds.includes(card.id);
                      return (
                        <div 
                          key={card.id} 
                          onClick={() => onToggleCard(card.id)}
                          className={`
                            relative flex flex-col p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 text-left
                            ${isSelected 
                              ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500 shadow-md' 
                              : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-blue-300 dark:hover:border-slate-600 hover:shadow-md'
                            }
                          `}
                        >
                          <div className="flex justify-between items-start mb-3">
                            <h4 className={`font-bold text-sm leading-tight pr-2 ${isSelected ? 'text-blue-900 dark:text-blue-100' : 'text-slate-900 dark:text-white'}`}>
                              {card.name}
                            </h4>
                            <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                              isSelected 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-300 dark:text-slate-600'
                            }`}>
                              {isSelected ? <Check size={12} /> : <Plus size={12} />}
                            </div>
                          </div>

                          <div className="mt-auto space-y-2">
                             <div className="flex items-center justify-between text-xs">
                               <span className="text-slate-500 dark:text-slate-400">Annual Fee</span>
                               <span className={`font-bold ${card.annualFee > 0 ? 'text-slate-700 dark:text-slate-200' : 'text-green-600 dark:text-green-400'}`}>
                                 {card.annualFee === 0 ? 'Free' : `$${card.annualFee}`}
                               </span>
                             </div>
                             {/* Mini Multiplier Preview */}
                             {card.multipliers.length > 0 && (
                               <div className="flex flex-wrap gap-1 pt-1">
                                 {card.multipliers.slice(0,2).map((m, i) => (
                                   <span key={i} className="inline-block px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold rounded">
                                     {m.rate}x {m.category.replace(/_/g, ' ')}
                                   </span>
                                 ))}
                               </div>
                             )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CardCatalog;