import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Card } from '../types';

interface DashboardStatsProps {
  cards: Card[];
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ cards }) => {
  const totalAnnualFee = cards.reduce((acc, card) => acc + card.annualFee, 0);
  const totalCards = cards.length;
  
  const avgValuation = cards.length > 0 
    ? (cards.reduce((acc, card) => acc + card.pointValuation, 0) / cards.length).toFixed(2)
    : 0;

  const issuerCounts: {[key: string]: number} = {};
  cards.forEach(c => {
    issuerCounts[c.issuer] = (issuerCounts[c.issuer] || 0) + 1;
  });
  
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#64748b'];
  
  const issuerData = Object.keys(issuerCounts).map((issuer, index) => ({
    name: issuer,
    value: issuerCounts[issuer],
    color: COLORS[index % COLORS.length]
  }));

  const feeData = cards
    .filter(c => c.annualFee > 0)
    .sort((a, b) => b.annualFee - a.annualFee)
    .map(c => ({
      name: c.name.split('®')[0].replace('Credit Card', '').trim(), 
      fee: c.annualFee,
    }));

  return (
    <div className="space-y-6">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 transition-colors">
          <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Annual Fees</h3>
          <p className="mt-2 text-4xl font-black text-slate-900 dark:text-white">${totalAnnualFee}</p>
          <p className="text-xs text-slate-400 mt-2 font-medium">Across {totalCards} active cards</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 transition-colors">
          <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Wallet Size</h3>
          <p className="mt-2 text-4xl font-black text-slate-900 dark:text-white">{totalCards}</p>
          <p className="text-xs text-slate-400 mt-2 font-medium">Active Accounts</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 transition-colors">
          <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Avg Point Value</h3>
          <p className="mt-2 text-4xl font-black text-emerald-500">{avgValuation}¢</p>
          <p className="text-xs text-slate-400 mt-2 font-medium">Based on Expert Estimates</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Fee Distribution */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 h-96 flex flex-col transition-colors">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Annual Fee Breakdown</h3>
          {feeData.length > 0 ? (
            <div className="flex-grow">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={feeData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" opacity={0.3} />
                  <XAxis type="number" hide />
                  <YAxis dataKey="name" type="category" width={100} tick={{fontSize: 11, fill: '#94a3b8'}} />
                  <Tooltip 
                    cursor={{fill: 'transparent'}}
                    formatter={(value: number) => [`$${value}`, 'Annual Fee']}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', backgroundColor: '#1e293b', color: '#fff' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="fee" fill="#3b82f6" radius={[0, 6, 6, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
             <div className="h-full flex items-center justify-center text-slate-400 text-sm font-medium">No annual fees to display</div>
          )}
        </div>

        {/* Issuer Distribution */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 h-96 flex flex-col transition-colors">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Wallet Composition</h3>
          <div className="flex-grow">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={issuerData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {issuerData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', backgroundColor: '#1e293b', color: '#fff' }}
                   itemStyle={{ color: '#fff' }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{paddingTop: '20px'}}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;