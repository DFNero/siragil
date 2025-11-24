// Dashboard.tsx
import { Package, AlertTriangle, TrendingUp, Archive, Activity, Clock, ArrowUp, ArrowDown, RefreshCw } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { 
      label: 'Total Items', 
      value: '1,234', 
      icon: Package, 
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      change: '+5%',
      trend: 'up'
    },
    { 
      label: 'Low Stock', 
      value: '23', 
      icon: AlertTriangle, 
      color: 'bg-red-500',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      change: '+3',
      trend: 'up'
    },
    { 
      label: 'Stock Value', 
      value: 'Rp 125M', 
      icon: TrendingUp, 
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      change: '+12%',
      trend: 'up'
    },
    { 
      label: 'Categories', 
      value: '45', 
      icon: Archive, 
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      change: '+2',
      trend: 'up'
    },
  ];

  const lowStockItems = [
    { name: 'iPhone 14 Pro', current: 5, minimum: 10, category: 'Electronics', sku: 'ELEC-002' },
    { name: 'MacBook Air M2', current: 3, minimum: 8, category: 'Electronics', sku: 'ELEC-004' },
    { name: 'Sony WH-1000XM5', current: 7, minimum: 15, category: 'Audio', sku: 'AUDI-001' },
    { name: 'Samsung Galaxy S23', current: 12, minimum: 20, category: 'Electronics', sku: 'ELEC-003' },
  ];

  const recentUpdates = [
    { item: 'Laptop Dell XPS 13', action: 'Stock Added', quantity: '+50 units', time: '2 hours ago', type: 'add' },
    { item: 'iPad Pro 11"', action: 'Stock Adjusted', quantity: '-5 units', time: '4 hours ago', type: 'adjust' },
    { item: 'AirPods Pro', action: 'Stock Added', quantity: '+100 units', time: '6 hours ago', type: 'add' },
    { item: 'Samsung Galaxy Tab S8', action: 'Stock Removed', quantity: '-2 units', time: '8 hours ago', type: 'remove' },
  ];

  const stockMovement = [
    { day: 'Mon', in: 120, out: 85 },
    { day: 'Tue', in: 95, out: 110 },
    { day: 'Wed', in: 150, out: 90 },
    { day: 'Thu', in: 80, out: 120 },
    { day: 'Fri', in: 200, out: 95 },
    { day: 'Sat', in: 60, out: 40 },
    { day: 'Sun', in: 30, out: 25 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Operator Dashboard</h1>
            <p className="text-gray-600 mt-1">Monitor inventory status and stock movements</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              <RefreshCw size={18} />
              Refresh
            </button>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Clock size={16} />
              <span>Last updated: {new Date().toLocaleString()}</span>
            </div>
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
                  {stat.trend === 'up' ? <ArrowUp size={14} className="mr-1" /> : <ArrowDown size={14} className="mr-1" />}
                  {stat.change}
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Stock Movement Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Activity size={20} className="text-gray-600" />
              Weekly Stock Movement
            </h3>
            <div className="h-64 flex items-end justify-between gap-2">
              {stockMovement.map((day, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex gap-1">
                    <div className="bg-green-500 rounded-t" style={{ height: `${(day.in / 200) * 100}%` }}></div>
                    <div className="bg-red-500 rounded-t" style={{ height: `${(day.out / 200) * 100}%` }}></div>
                  </div>
                  <span className="text-xs text-gray-500">{day.day}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded"></div>
                <span className="text-sm text-gray-600">Stock In</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded"></div>
                <span className="text-sm text-gray-600">Stock Out</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-gray-600 text-sm">Total Stock In (Week)</span>
                <span className="font-semibold text-gray-900">735 units</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-gray-600 text-sm">Total Stock Out (Week)</span>
                <span className="font-semibold text-gray-900">565 units</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-gray-600 text-sm">Net Movement</span>
                <span className="font-semibold text-green-600">+170 units</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-sm">Items Need Reorder</span>
                <span className="font-semibold text-red-600">23 items</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Low Stock Alert */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <AlertTriangle size={20} className="text-red-500" />
                <h3 className="text-lg font-semibold text-gray-900">Low Stock Alert</h3>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">View All</button>
            </div>
            <div className="space-y-3">
              {lowStockItems.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-gray-900 font-medium">{item.name}</p>
                      <p className="text-gray-500 text-xs">{item.category} · {item.sku}</p>
                    </div>
                    <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800">
                      Low Stock
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <span className="text-gray-600">Current: <span className="text-red-600 font-semibold">{item.current}</span></span>
                      <span className="text-gray-600">Min: <span className="text-gray-900">{item.minimum}</span></span>
                    </div>
                    <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">Reorder</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Updates */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Stock Updates</h3>
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">View All</button>
            </div>
            <div className="space-y-3">
              {recentUpdates.map((update, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-gray-900 font-medium">{update.item}</p>
                    <p className="text-gray-500 text-sm">{update.action}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold text-sm ${
                      update.type === 'add' ? 'text-green-600' : 
                      update.type === 'remove' ? 'text-red-600' : 'text-yellow-600'
                    }`}>
                      {update.quantity}
                    </p>
                    <span className="text-gray-500 text-xs">{update.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;