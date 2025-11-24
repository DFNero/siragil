// Reports.tsx
import { Download, Calendar, TrendingUp, TrendingDown, FileText, BarChart3, PieChart, Filter, Package, Users} from 'lucide-react';

const Reports = () => {
  const reports = [
    { id: 1, title: 'Monthly Sales Report', date: '2024-01-31', type: 'Sales', trend: 'up', value: '+15%', icon: BarChart3 },
    { id: 2, title: 'Inventory Status', date: '2024-01-30', type: 'Inventory', trend: 'down', value: '-5%', icon: Package },
    { id: 3, title: 'User Activity Report', date: '2024-01-29', type: 'Activity', trend: 'up', value: '+8%', icon: Users },
    { id: 4, title: 'Product Performance', date: '2024-01-28', type: 'Products', trend: 'up', value: '+12%', icon: TrendingUp },
    { id: 5, title: 'Revenue Analysis', date: '2024-01-27', type: 'Financial', trend: 'up', value: '+20%', icon: PieChart },
    { id: 6, title: 'Customer Satisfaction', date: '2024-01-26', type: 'Customer', trend: 'up', value: '+5%', icon: Users },
  ];

  const summaryStats = [
    { label: 'Total Revenue', value: 'Rp 45.2M', change: '+23%', bgColor: 'bg-blue-50', textColor: 'text-blue-600' },
    { label: 'Total Orders', value: '2,456', change: '+18%', bgColor: 'bg-green-50', textColor: 'text-green-600' },
    { label: 'Avg Order Value', value: 'Rp 18,400', change: '+5%', bgColor: 'bg-purple-50', textColor: 'text-purple-600' },
    { label: 'Active Users', value: '89', change: '+12%', bgColor: 'bg-orange-50', textColor: 'text-orange-600' },
  ];

  const revenueData = [
    { month: 'Jan', revenue: 12000000 },
    { month: 'Feb', revenue: 15000000 },
    { month: 'Mar', revenue: 18000000 },
    { month: 'Apr', revenue: 14000000 },
    { month: 'May', revenue: 22000000 },
    { month: 'Jun', revenue: 25000000 },
  ];

  const topCategories = [
    { name: 'Electronics', value: 45, color: 'bg-blue-500' },
    { name: 'Audio', value: 25, color: 'bg-green-500' },
    { name: 'Tablets', value: 20, color: 'bg-purple-500' },
    { name: 'Accessories', value: 10, color: 'bg-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
            <p className="text-gray-600 mt-1">Analyze your business performance and metrics</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
              <Filter size={18} />
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm">
              <Download size={18} />
              Export All
            </button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {summaryStats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <span className="flex items-center text-green-500 text-sm font-medium">
                  <TrendingUp size={14} className="mr-1" />
                  {stat.change}
                </span>
              </div>
              <div className={`mt-3 h-1 rounded-full ${stat.bgColor}`}></div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BarChart3 size={20} className="text-gray-600" />
              Revenue Trend
            </h3>
            <div className="h-64 flex items-end justify-between gap-2">
              {revenueData.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-blue-500 rounded-t" style={{ height: `${(item.revenue / 25000000) * 100}%` }}></div>
                  <span className="text-xs text-gray-500">{item.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Category Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <PieChart size={20} className="text-gray-600" />
              Sales by Category
            </h3>
            <div className="space-y-3">
              {topCategories.map((category) => (
                <div key={category.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                    <span className="text-sm text-gray-700">{category.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{category.value}%</span>
                </div>
              ))}
            </div>
            <div className="mt-4 h-2 rounded-full bg-gray-100 overflow-hidden">
              <div className="h-full flex">
                {topCategories.map((category) => (
                  <div key={category.name} className={`${category.color}`} style={{ width: `${category.value}%` }}></div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reports List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Reports</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Report Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-gray-100 rounded-lg">
                          <report.icon size={18} className="text-gray-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{report.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        {report.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar size={16} className="text-gray-400" />
                        {report.date}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1">
                        {report.trend === 'up' ? (
                          <TrendingUp size={16} className="text-green-500" />
                        ) : (
                          <TrendingDown size={16} className="text-red-500" />
                        )}
                        <span className={`text-sm font-medium ${report.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                          {report.value}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="flex items-center gap-1 text-blue-600 hover:text-blue-900">
                        <Download size={16} />
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;