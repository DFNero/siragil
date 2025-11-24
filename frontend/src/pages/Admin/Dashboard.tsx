// Dashboard.tsx
import { Package, Users, ShoppingCart, TrendingUp, Activity, Clock, ArrowUp, ArrowDown } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { 
      label: 'Total Products', 
      value: '1,234', 
      icon: Package, 
      change: '+12%', 
      color: 'bg-blue-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    { 
      label: 'Total Users', 
      value: '89', 
      icon: Users, 
      change: '+5%', 
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600'
    },
    { 
      label: 'Transactions', 
      value: '2,456', 
      icon: ShoppingCart, 
      change: '+18%', 
      color: 'bg-purple-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    { 
      label: 'Revenue', 
      value: 'Rp 45.2M', 
      icon: TrendingUp, 
      change: '+23%', 
      color: 'bg-orange-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-600'
    },
  ];

  const recentActivity = [
    { id: 1, action: 'New product added', user: 'Admin User', time: '5 minutes ago', icon: Package },
    { id: 2, action: 'User account created', user: 'John Doe', time: '15 minutes ago', icon: Users },
    { id: 3, action: 'Transaction completed', user: 'Jane Smith', time: '1 hour ago', icon: ShoppingCart },
    { id: 4, action: 'Report generated', user: 'Admin User', time: '2 hours ago', icon: TrendingUp },
    { id: 5, action: 'Product updated', user: 'Admin User', time: '3 hours ago', icon: Package },
    { id: 6, action: 'New user registered', user: 'Bob Wilson', time: '5 hours ago', icon: Users },
  ];

  const salesData = [
    { month: 'Jan', sales: 12000 },
    { month: 'Feb', sales: 15000 },
    { month: 'Mar', sales: 18000 },
    { month: 'Apr', sales: 14000 },
    { month: 'May', sales: 22000 },
    { month: 'Jun', sales: 25000 },
  ];

  const topProducts = [
    { id: 1, name: 'Laptop Dell XPS 13', sales: 45, revenue: 'Rp 675M' },
    { id: 2, name: 'iPhone 14 Pro', sales: 38, revenue: 'Rp 684M' },
    { id: 3, name: 'MacBook Air M2', sales: 32, revenue: 'Rp 560M' },
    { id: 4, name: 'Samsung Galaxy S23', sales: 28, revenue: 'Rp 336M' },
    { id: 5, name: 'iPad Pro 11"', sales: 22, revenue: 'Rp 286M' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your store today.</p>
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
                <span className="flex items-center text-green-500 text-sm font-medium">
                  <ArrowUp size={14} className="mr-1" />
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Activity size={20} className="text-gray-600" />
              Sales Overview
            </h3>
            <div className="h-64 flex items-end justify-between gap-2">
              {salesData.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-blue-500 rounded-t" style={{ height: `${(item.sales / 25000) * 100}%` }}></div>
                  <span className="text-xs text-gray-500">{item.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Products</h3>
            <div className="space-y-3">
              {topProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between pb-3 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.sales} sold</p>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{product.revenue}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Activity size={20} className="text-gray-600" />
            Recent Activity
          </h3>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 pb-3 border-b border-gray-100 last:border-0">
                <div className="bg-gray-100 p-2 rounded-full">
                  <activity.icon size={16} className="text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-gray-900 font-medium">{activity.action}</p>
                  <p className="text-gray-500 text-sm">by {activity.user}</p>
                </div>
                <span className="text-gray-400 text-xs whitespace-nowrap">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;