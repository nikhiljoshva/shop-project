import React, { useState } from 'react';
import { ActivityMetric } from '../../types';
import { 
  Wallet, 
  Sparkles, 
  Leaf, 
  Truck, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  CheckCircle,
  PackageCheck,
  TrendingUp,
  CreditCard
} from 'lucide-react';

interface ActivityScreenProps {
  metrics: ActivityMetric[];
  onShowToast: (message: string) => void;
}

export const ActivityScreen: React.FC<ActivityScreenProps> = ({
  metrics,
  onShowToast,
}) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(4);

  const daysData = [
    { day: 'Mon', amount: 45, height: '35%' },
    { day: 'Tue', amount: 120, height: '65%' },
    { day: 'Wed', amount: 85, height: '50%' },
    { day: 'Thu', amount: 210, height: '90%' },
    { day: 'Fri', amount: 160, height: '75%' },
    { day: 'Sat', amount: 95, height: '55%' },
    { day: 'Sun', amount: 30, height: '25%' },
  ];

  const recentTransactions = [
    {
      id: 'tx-1',
      title: 'Acoustic Horizon ANC Headset',
      merchant: 'Sönder Labs Audio',
      date: 'Today, 2:15 PM',
      amount: '-$349.00',
      status: 'In Transit',
      category: 'Audio Equipment',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=150&q=80',
    },
    {
      id: 'tx-2',
      title: 'Quarterly VIP Cashback Bonus',
      merchant: 'ScreenCraft Rewards',
      date: 'Yesterday, 9:00 AM',
      amount: '+$84.50',
      status: 'Credited',
      category: 'Dividend',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=150&q=80',
    },
    {
      id: 'tx-3',
      title: 'Aerolight Runner V2 Footwear',
      merchant: 'Kinetic Studio Flagship',
      date: 'Oct 26, 4:40 PM',
      amount: '-$195.00',
      status: 'Delivered',
      category: 'Athletic Gear',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=150&q=80',
    },
    {
      id: 'tx-4',
      title: 'Artisan Geisha Roast Order',
      merchant: 'Kurasu Coffee Roasters',
      date: 'Oct 24, 11:15 AM',
      amount: '-$28.00',
      status: 'Completed',
      category: 'Gourmet',
      image: 'https://images.unsplash.com/photo-1509785307050-d4066910ec1e?auto=format&fit=crop&w=150&q=80',
    },
  ];

  const getMetricIcon = (name: string) => {
    switch (name) {
      case 'Wallet':
        return <Wallet className="w-4 h-4 text-indigo-400" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4 text-amber-400" />;
      case 'Leaf':
        return <Leaf className="w-4 h-4 text-emerald-400" />;
      case 'Truck':
      default:
        return <Truck className="w-4 h-4 text-sky-400" />;
    }
  };

  return (
    <div className="w-full flex-1 flex flex-col px-4 pt-3 pb-8 space-y-6">
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400">
            Insights & Ledger
          </span>
          <h2 className="text-xl font-extrabold tracking-tight">Account Activity</h2>
        </div>
        <button
          onClick={() => onShowToast('Digital ledger exported to CSV')}
          className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white transition"
          title="Export statement"
        >
          <CreditCard className="w-4 h-4" />
        </button>
      </div>

      {/* Hero Financial Balance Card */}
      <div className="relative rounded-3xl p-5 bg-gradient-to-br from-indigo-900/80 via-neutral-900 to-neutral-950 border border-indigo-500/30 shadow-2xl overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex justify-between items-start">
          <div>
            <p className="text-xs text-indigo-200/80 font-medium">ScreenCraft Vault Balance</p>
            <h3 className="text-2xl font-black text-white mt-1 font-mono tracking-tight">$4,850.25</h3>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" /> +12.8%
          </span>
        </div>

        <div className="relative z-10 mt-5 pt-4 border-t border-indigo-500/20 flex justify-between items-center text-xs text-neutral-300">
          <div>
            <span className="text-[10px] text-neutral-400 block">CARD NUMBER</span>
            <span className="font-mono text-white">•••• 9842</span>
          </div>
          <div>
            <span className="text-[10px] text-neutral-400 block">TIER LEVEL</span>
            <span className="font-semibold text-indigo-300">Black Diamond</span>
          </div>
          <div>
            <span className="text-[10px] text-neutral-400 block">EXPIRATION</span>
            <span className="font-mono text-white">10/28</span>
          </div>
        </div>
      </div>

      {/* Metrics 2x2 Grid */}
      <div className="grid grid-cols-2 gap-3">
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className="p-3.5 rounded-2xl bg-neutral-900/80 border border-neutral-800 space-y-1.5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium text-neutral-400">{metric.title}</span>
              <div className="p-1.5 rounded-lg bg-neutral-800/80">
                {getMetricIcon(metric.iconName)}
              </div>
            </div>
            <p className="text-base font-bold text-white font-mono">{metric.value}</p>
            <p className="text-[10px] font-medium text-emerald-400 flex items-center gap-0.5">
              {metric.change}
            </p>
          </div>
        ))}
      </div>

      {/* Weekly Spending Bar Visualizer */}
      <div className="p-4 rounded-3xl bg-neutral-900/80 border border-neutral-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-indigo-400" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Weekly Volume</h4>
          </div>
          {selectedDay !== null && (
            <span className="text-xs font-mono font-bold text-indigo-400">
              {daysData[selectedDay].day}: ${daysData[selectedDay].amount}.00
            </span>
          )}
        </div>

        <div className="h-28 flex items-end justify-between gap-2 pt-4 px-1">
          {daysData.map((d, index) => (
            <button
              key={d.day}
              onClick={() => setSelectedDay(index)}
              className="flex-1 flex flex-col items-center gap-2 group h-full justify-end"
            >
              <div className="w-full bg-neutral-800 rounded-lg overflow-hidden flex flex-col justify-end h-20 relative">
                <div
                  style={{ height: d.height }}
                  className={`w-full rounded-lg transition-all duration-300 ${
                    selectedDay === index
                      ? 'bg-gradient-to-t from-indigo-600 to-indigo-400 shadow-lg shadow-indigo-500/40'
                      : 'bg-neutral-700 hover:bg-neutral-600'
                  }`}
                />
              </div>
              <span
                className={`text-[10px] font-medium ${
                  selectedDay === index ? 'text-indigo-400 font-bold' : 'text-neutral-500'
                }`}
              >
                {d.day}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Transactions List with Hotlink Images */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            Recent Orders & Hotlink History
          </h4>
          <span className="text-[11px] text-indigo-400 cursor-pointer hover:underline">
            View All
          </span>
        </div>

        <div className="space-y-2">
          {recentTransactions.map((tx) => (
            <div
              key={tx.id}
              className="p-3 rounded-2xl bg-neutral-900/70 border border-neutral-800/80 flex items-center justify-between gap-3 hover:border-neutral-700 transition"
            >
              <div className="flex items-center gap-3">
                <img
                  src={tx.image}
                  alt={tx.title}
                  className="w-11 h-11 rounded-xl object-cover border border-neutral-800"
                />
                <div>
                  <h5 className="text-xs font-bold text-white line-clamp-1">{tx.title}</h5>
                  <p className="text-[10px] text-neutral-400">{tx.merchant} · {tx.date}</p>
                </div>
              </div>
              <div className="text-right">
                <span
                  className={`text-xs font-bold font-mono ${
                    tx.amount.startsWith('+') ? 'text-emerald-400' : 'text-white'
                  }`}
                >
                  {tx.amount}
                </span>
                <span className="block text-[9px] text-neutral-400 mt-0.5">{tx.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
