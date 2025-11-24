// Dashboard.tsx
import { DollarSign, ShoppingCart, Receipt, Clock, TrendingUp, TrendingDown, Users } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { 
      label: "Today's Sales", 
      value: 'Rp 3.5M', 
      icon: DollarSign, 
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      change: '+12%',
      trend: 'up'
    },
    { 
      label: 'Transactions', 
      value: '42', 
      icon: ShoppingCart, 
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      change: '+8%',
      trend: 'up'
    },
    { 
      label: 'Avg Transaction', 
      value: 'Rp 83,300', 
      icon: Receipt, 
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      change: '-3%',
      trend: 'down'
    },
    { 
      label: 'Active Hours', 
      value: '8h 30m', 
      icon: Clock, 
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600',
      change: '+0.5h',
      trend: 'up'
    },
  ];

  const recentTransactions = [
    { id: 'TRX001', customer: 'John Doe', amount: 'Rp 150,000', time: '5 mins ago', status: 'completed' },
    { id: 'TRX002', customer: 'Jane Smith', amount: 'Rp 230,000', time: '12 mins ago', status: 'completed' },
    { id: 'TRX003', customer: 'Bob Wilson', amount: 'Rp 95,000', time: '25 mins ago', status: 'completed' },
    { id: 'TRX004', customer: 'Alice Brown', amount: 'Rp 180,000', time: '45 mins ago', status: 'completed' },
  ];

  const salesData = [
    { hour: '09:00', sales: 450000 },
    { hour: '10:00', sales: 780000 },
    { hour: '11:00', sales: 620000 },
    { hour: '12:00', sales: 920000 },
    { hour: '13:00', sales: 510000 },
    { hour: '14:00', sales: 850000 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Kasir Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your sales today.</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-2 text-sm text-gray-500">
            <Clock size={16} />
            <span>Last updated: {new Date().toLocaleString()}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <stat.icon size={24} className={stat.textColor} />
                </div>
                <span className={`flex items-center text-sm font-medium ${
                  stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.trend === 'up' ? <TrendingUp size={14} className="mr-1" /> : <TrendingDown size={14} className="mr-1" />}
                  {stat.change}
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Sales Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Hourly Sales</h3>
            <div className="h-64 flex items-end justify-between gap-2">
              {salesData.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-blue-500 rounded-t" style={{ height: `${(item.sales / 920000) * 100}%` }}></div>
                  <span className="text-xs text-gray-500">{item.hour}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
            <div className="space-y-3">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between pb-3 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-gray-900 font-medium text-sm">{transaction.id}</p>
                    <p className="text-gray-500 text-xs">{transaction.customer} · {transaction.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-600 font-semibold text-sm">{transaction.amount}</p>
                    <span className="text-xs text-gray-500 capitalize">{transaction.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center justify-center p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <ShoppingCart size={24} className="text-blue-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">New Sale</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
              <DollarSign size={24} className="text-green-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">View Reports</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
              <Users size={24} className="text-purple-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Customers</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
              <Receipt size={24} className="text-orange-600 mb-2" />
              <span className="text-sm font-medium text-gray-900">Returns</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;