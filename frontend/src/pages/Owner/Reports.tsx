// Reports.tsx
import { Download, Filter, Calendar, TrendingUp, FileText, BarChart3, PieChart, Eye, Printer } from 'lucide-react';

const Reports = () => {
  const financialSummary = [
    { period: 'This Month', revenue: 'Rp 45.2M', expenses: 'Rp 28.5M', profit: 'Rp 16.7M', margin: '37%' },
    { period: 'Last Month', revenue: 'Rp 38.7M', expenses: 'Rp 25.2M', profit: 'Rp 13.5M', margin: '35%' },
    { period: 'This Quarter', revenue: 'Rp 125.4M', expenses: 'Rp 82.1M', profit: 'Rp 43.3M', margin: '35%' },
    { period: 'This Year', revenue: 'Rp 420.8M', expenses: 'Rp 285.6M', profit: 'Rp 135.2M', margin: '32%' },
  ];

  const reportCategories = [
    { name: 'Financial Reports', count: 12, icon: TrendingUp, color: 'text-green-600', bgColor: 'bg-green-50' },
    { name: 'Sales Reports', count: 24, icon: FileText, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { name: 'Inventory Reports', count: 18, icon: BarChart3, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { name: 'Staff Reports', count: 8, icon: FileText, color: 'text-orange-600', bgColor: 'bg-orange-50' },
  ];

  const monthlyRevenue = [
    { month: 'Jan', revenue: 45000000 },
    { month: 'Feb', revenue: 38000000 },
    { month: 'Mar', revenue: 42000000 },
    { month: 'Apr', revenue: 50000000 },
    { month: 'May', revenue: 48000000 },
    { month: 'Jun', revenue: 55000000 },
  ];

  const expenseBreakdown = [
    { category: 'Salaries', amount: 18000000, percentage: 35 },
    { category: 'Inventory', amount: 15000000, percentage: 30 },
    { category: 'Operations', amount: 8000000, percentage: 15 },
    { category: 'Marketing', amount: 5000000, percentage: 10 },
    { category: 'Other', amount: 4000000, percentage: 10 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Business Reports</h1>
            <p className="text-gray-600 mt-1">Comprehensive business analytics and insights</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              <Calendar size={18} />
              Date Range
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              <Download size={18} />
              Export All
            </button>
          </div>
        </div>

        {/* Report Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {reportCategories.map((category) => (
            <div key={category.name} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-3">
                <div className={`${category.bgColor} p-3 rounded-lg`}>
                  <category.icon size={24} className={category.color} />
                </div>
                <span className="text-2xl font-bold text-gray-900">{category.count}</span>
              </div>
              <p className="text-gray-700 font-medium">{category.name}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 size={20} className="text-gray-600" />
              Monthly Revenue
            </h3>
            <div className="h-64 flex items-end justify-between gap-2">
              {monthlyRevenue.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-blue-500 rounded-t" style={{ height: `${(item.revenue / 55000000) * 100}%` }}></div>
                  <span className="text-xs text-gray-500">{item.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Expense Breakdown */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <PieChart size={20} className="text-gray-600" />
              Expense Breakdown
            </h3>
            <div className="space-y-3">
              {expenseBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-sm text-gray-700">{item.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900">Rp {(item.amount / 1000000).toFixed(1)}M</span>
                    <span className="text-xs text-gray-500">({item.percentage}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Filter size={20} className="text-gray-500" />
              <span className="text-gray-700 text-sm font-medium">Filter:</span>
            </div>
            <select className="px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-blue-500">
              <option>All Types</option>
              <option>Financial</option>
              <option>Sales</option>
              <option>Inventory</option>
            </select>
            <div className="flex items-center gap-2 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2">
              <Calendar size={16} className="text-gray-500" />
              <input
                type="date"
                className="bg-transparent text-gray-700 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Financial Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Financial Summary</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expenses</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Profit</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profit Margin</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {financialSummary.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{row.period}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-green-600 font-semibold">{row.revenue}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-red-600">{row.expenses}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-blue-600 font-semibold">{row.profit}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {row.margin}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3">
                        <Eye size={16} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Printer size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Key Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <TrendingUp size={20} className="text-green-600" />
              </div>
              <h4 className="text-gray-900 font-semibold">Best Month</h4>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">June 2024</p>
            <p className="text-green-600 text-sm">Rp 55.0M Revenue</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <FileText size={20} className="text-blue-600" />
              </div>
              <h4 className="text-gray-900 font-semibold">Reports Generated</h4>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">62 Reports</p>
            <p className="text-gray-600 text-sm">This month</p>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <TrendingUp size={20} className="text-purple-600" />
              </div>
              <h4 className="text-gray-900 font-semibold">Growth Rate</h4>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">+23%</p>
            <p className="text-green-600 text-sm">Year over year</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;