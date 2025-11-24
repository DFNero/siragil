// Dashboard.tsx
import { DollarSign, TrendingUp, Users, ShoppingCart, ArrowUp, ArrowDown, Activity, Award, Calendar } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    { label: 'Total Revenue', value: 'Rp 125.4M', change: '+23%', trending: 'up', icon: DollarSign, color: 'bg-green-500', bgColor: 'bg-green-50', textColor: 'text-green-600' },
    { label: 'Monthly Growth', value: '+18.2%', change: '+5%', trending: 'up', icon: TrendingUp, color: 'bg-blue-500', bgColor: 'bg-blue-50', textColor: 'text-blue-600' },
    { label: 'Active Staff', value: '89', change: '+12', trending: 'up', icon: Users, color: 'bg-purple-500', bgColor: 'bg-purple-50', textColor: 'text-purple-600' },
    { label: 'Total Orders', value: '12,456', change: '-3%', trending: 'down', icon: ShoppingCart, color: 'bg-orange-500', bgColor: 'bg-orange-50', textColor: 'text-orange-600' },
  ];

  const branchPerformance = [
    { branch: 'Surabaya Center', revenue: 'Rp 45.2M', growth: '+25%', orders: 4521 },
    { branch: 'Jakarta HQ', revenue: 'Rp 38.7M', growth: '+18%', orders: 3890 },
    { branch: 'Bandung', revenue: 'Rp 28.5M', growth: '+15%', orders: 2845 },
    { branch: 'Bali', revenue: 'Rp 13.0M', growth: '+12%', orders: 1200 },
  ];

  const topPerformers = [
    { name: 'Sarah Johnson', role: 'Kasir', transactions: 342, revenue: 'Rp 12.5M' },
    { name: 'Michael Chen', role: 'Admin', efficiency: '98%', tasks: 156 },
    { name: 'Emily Rodriguez', role: 'Operator', updates: 892, accuracy: '99.5%' },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 45000000 },
    { month: 'Feb', revenue: 38000000 },
    { month: 'Mar', revenue: 42000000 },
    { month: 'Apr', revenue: 50000000 },
    { month: 'May', revenue: 48000000 },
    { month: 'Jun', revenue: 55000000 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Owner Dashboard</h1>
            <p className="text-gray-600 mt-1">Overview of business performance</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-2 text-sm text-gray-500">
            <Calendar size={16} />
            <span>Last updated: {new Date().toLocaleString()}</span>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <stat.icon size={24} className={stat.textColor} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-medium ${
                  stat.trending === 'up' ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.trending === 'up' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                  {stat.change}
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Activity size={20} className="text-gray-600" />
              Revenue Trend
            </h3>
            <div className="h-64 flex items-end justify-between gap-2">
              {revenueData.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-blue-500 rounded-t" style={{ height: `${(item.revenue / 55000000) * 100}%` }}></div>
                  <span className="text-xs text-gray-500">{item.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-gray-600 text-sm">Total Branches</span>
                <span className="font-semibold text-gray-900">4</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-gray-600 text-sm">Total Staff</span>
                <span className="font-semibold text-gray-900">89</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-gray-600 text-sm">Avg Order Value</span>
                <span className="font-semibold text-gray-900">Rp 10,067</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-sm">Profit Margin</span>
                <span className="font-semibold text-green-600">32%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Branch Performance */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Branch Performance</h3>
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">View All</button>
            </div>
            <div className="space-y-4">
              {branchPerformance.map((branch, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="text-gray-900 font-medium">{branch.branch}</h4>
                      <p className="text-gray-500 text-sm">{branch.orders} orders</p>
                    </div>
                    <span className="px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800">
                      {branch.growth}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm">Revenue</span>
                    <span className="text-green-600 font-semibold">{branch.revenue}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performers */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Top Performers</h3>
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">View All</button>
            </div>
            <div className="space-y-4">
              {topPerformers.map((performer, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="text-gray-900 font-medium">{performer.name}</h4>
                      <p className="text-gray-500 text-sm capitalize">{performer.role}</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-semibold">
                      #{index + 1}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {performer.role === 'Kasir' && (
                      <>
                        <div>
                          <p className="text-gray-600">Transactions</p>
                          <p className="text-gray-900 font-semibold">{performer.transactions}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Revenue</p>
                          <p className="text-green-600 font-semibold">{performer.revenue}</p>
                        </div>
                      </>
                    )}
                    {performer.role === 'Admin' && (
                      <>
                        <div>
                          <p className="text-gray-600">Tasks</p>
                          <p className="text-gray-900 font-semibold">{performer.tasks}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Efficiency</p>
                          <p className="text-green-600 font-semibold">{performer.efficiency}</p>
                        </div>
                      </>
                    )}
                    {performer.role === 'Operator' && (
                      <>
                        <div>
                          <p className="text-gray-600">Updates</p>
                          <p className="text-gray-900 font-semibold">{performer.updates}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Accuracy</p>
                          <p className="text-green-600 font-semibold">{performer.accuracy}</p>
                        </div>
                      </>
                    )}
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