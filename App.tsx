import React, { useState, useEffect } from 'react';
import DashboardStats from './components/DashboardStats';
import StrategyView from './components/StrategyView';
import WalletView from './components/WalletView';
import CardCatalog from './components/CardCatalog';
import PointsBank from './components/PointsBank';
import CreditsTracker from './components/CreditsTracker';
import { MASTER_CARDS_LIST } from './constants';
import { LayoutDashboard, Wallet, Zap, Menu, X, PlusCircle, Moon, Sun, Coins, DollarSign } from 'lucide-react';

enum Tab {
  DASHBOARD = 'dashboard',
  STRATEGY = 'strategy',
  WALLET = 'wallet',
  POINTS = 'points',
  CREDITS = 'credits',
  CATALOG = 'catalog'
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.DASHBOARD);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  const [myCardIds, setMyCardIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('optiWallet_cards');
    return saved ? JSON.parse(saved) : [];
  });

  const [pointBalances, setPointBalances] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem('optiWallet_balances');
    return saved ? JSON.parse(saved) : {};
  });

  const [creditUsage, setCreditUsage] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('optiWallet_creditUsage');
    return saved ? JSON.parse(saved) : {};
  });

  // Handle Dark Mode Class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('optiWallet_cards', JSON.stringify(myCardIds));
  }, [myCardIds]);

  useEffect(() => {
    localStorage.setItem('optiWallet_balances', JSON.stringify(pointBalances));
  }, [pointBalances]);

  useEffect(() => {
    localStorage.setItem('optiWallet_creditUsage', JSON.stringify(creditUsage));
  }, [creditUsage]);

  const toggleCard = (id: string) => {
    setMyCardIds(prev => 
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const updateBalance = (id: string, amount: number) => {
    setPointBalances(prev => ({
      ...prev,
      [id]: amount
    }));
  };

  const toggleCreditUsage = (cardId: string, credit: string) => {
    const key = `${cardId}-${credit}`;
    setCreditUsage(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const myCards = MASTER_CARDS_LIST.filter(c => myCardIds.includes(c.id));

  // If no cards, force catalog view
  useEffect(() => {
    if (myCards.length === 0 && activeTab !== Tab.CATALOG) {
      setActiveTab(Tab.CATALOG);
    }
  }, [myCards.length]);

  const renderContent = () => {
    // Empty state handling
    if (myCards.length === 0 && activeTab !== Tab.CATALOG) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
          <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full mb-6">
            <Wallet className="w-12 h-12 text-blue-600 dark:text-blue-400" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Your wallet is empty</h2>
          <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-md text-lg">
            Start by adding cards from the catalog to unlock your personalized financial dashboard.
          </p>
          <button 
            onClick={() => setActiveTab(Tab.CATALOG)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition-all transform hover:scale-105"
          >
            Browse Catalog
          </button>
        </div>
      );
    }

    switch (activeTab) {
      case Tab.DASHBOARD:
        return <DashboardStats cards={myCards} />;
      case Tab.STRATEGY:
        return <StrategyView cards={myCards} />;
      case Tab.WALLET:
        return <WalletView cards={myCards} />;
      case Tab.POINTS:
        return <PointsBank cards={myCards} balances={pointBalances} onUpdateBalance={updateBalance} />;
      case Tab.CREDITS:
        return <CreditsTracker cards={myCards} usage={creditUsage} onToggle={toggleCreditUsage} />;
      case Tab.CATALOG:
        return <CardCatalog selectedCardIds={myCardIds} onToggleCard={toggleCard} />;
      default:
        return <DashboardStats cards={myCards} />;
    }
  };

  const NavItem = ({ tab, label, icon: Icon }: { tab: Tab; label: string; icon: any }) => (
    <button
      onClick={() => {
        setActiveTab(tab);
        setMobileMenuOpen(false);
      }}
      className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 font-medium ${
        activeTab === tab
          ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
      }`}
    >
      <Icon size={18} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white font-sans transition-colors duration-300">
      {/* Header / Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => setActiveTab(Tab.DASHBOARD)}>
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                <Wallet className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300">
                OptiWallet
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-1">
              <NavItem tab={Tab.DASHBOARD} label="Overview" icon={LayoutDashboard} />
              <NavItem tab={Tab.STRATEGY} label="Strategy" icon={Zap} />
              <NavItem tab={Tab.WALLET} label="My Wallet" icon={Wallet} />
              <NavItem tab={Tab.POINTS} label="Points" icon={Coins} />
              <NavItem tab={Tab.CREDITS} label="Credits" icon={DollarSign} />
              <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-3"></div>
              <NavItem tab={Tab.CATALOG} label="Add Cards" icon={PlusCircle} />
              
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="ml-4 p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </nav>

            {/* Mobile Actions */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 shadow-xl p-4 space-y-2 animate-in slide-in-from-top-2">
            <NavItem tab={Tab.DASHBOARD} label="Overview" icon={LayoutDashboard} />
            <NavItem tab={Tab.STRATEGY} label="Strategy" icon={Zap} />
            <NavItem tab={Tab.WALLET} label="My Wallet" icon={Wallet} />
            <NavItem tab={Tab.POINTS} label="Points" icon={Coins} />
            <NavItem tab={Tab.CREDITS} label="Credits" icon={DollarSign} />
            <div className="h-px bg-slate-100 dark:bg-slate-800 my-2"></div>
            <NavItem tab={Tab.CATALOG} label="Add Cards" icon={PlusCircle} />
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 min-h-screen">
        <div className="animate-in fade-in duration-500 slide-in-from-bottom-2">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;