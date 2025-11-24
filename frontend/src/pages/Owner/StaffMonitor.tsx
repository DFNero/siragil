// StaffMonitor.tsx
import { Users, Clock, Activity, Award, Filter, Search, MoreVertical } from 'lucide-react';

const StaffMonitor = () => {
  const staffStats = [
    { label: 'Total Staff', value: '89', icon: Users, color: 'bg-blue-500', bgColor: 'bg-blue-50', textColor: 'text-blue-600' },
    { label: 'Active Now', value: '42', icon: Activity, color: 'bg-green-500', bgColor: 'bg-green-50', textColor: 'text-green-600' },
    { label: 'Avg Hours/Day', value: '8.5h', icon: Clock, color: 'bg-purple-500', bgColor: 'bg-purple-50', textColor: 'text-purple-600' },
    { label: 'Top Performers', value: '12', icon: Award, color: 'bg-orange-500', bgColor: 'bg-orange-50', textColor: 'text-orange-600' },
  ];

  const staffActivity = [
    { id: 1, name: 'Sarah Johnson', role: 'Kasir', status: 'active', hours: '8.5h', performance: '98%', lastActive: 'Now', avatar: 'SJ' },
    { id: 2, name: 'Michael Chen', role: 'Admin', status: 'active', hours: '7.2h', performance: '95%', lastActive: '2 mins ago', avatar: 'MC' },
    { id: 3, name: 'Emily Rodriguez', role: 'Operator', status: 'active', hours: '8.1h', performance: '97%', lastActive: '5 mins ago', avatar: 'ER' },
    { id: 4, name: 'David Kim', role: 'Kasir', status: 'break', hours: '6.5h', performance: '92%', lastActive: '15 mins ago', avatar: 'DK' },
    { id: 5, name: 'Lisa Wang', role: 'Admin', status: 'active', hours: '7.8h', performance: '96%', lastActive: 'Now', avatar: 'LW' },
    { id: 6, name: 'James Brown', role: 'Operator', status: 'offline', hours: '8.0h', performance: '94%', lastActive: '1 hour ago', avatar: 'JB' },
  ];

  const performanceMetrics = [
    { name: 'Sarah Johnson', role: 'Kasir', metric: 'Transactions', value: 342, rating: 5, avatar: 'SJ' },
    { name: 'Emily Rodriguez', role: 'Operator', metric: 'Stock Updates', value: 892, rating: 5, avatar: 'ER' },
    { name: 'Michael Chen', role: 'Admin', metric: 'Tasks Completed', value: 156, rating: 5, avatar: 'MC' },
    { name: 'Lisa Wang', role: 'Admin', metric: 'Response Time', value: '2.5m', rating: 4, avatar: 'LW' },
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'break': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPerformanceColor = (performance: string) => {
    const perf = parseInt(performance);
    if (perf >= 95) return 'bg-green-100 text-green-800';
    if (perf >= 90) return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Staff Monitor</h1>
            <p className="text-gray-600 mt-1">Real-time staff activity and performance tracking</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search staff..."
                className="pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
              <Filter size={18} />
              Filter
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {staffStats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className={`${stat.bgColor} p-3 rounded-lg w-fit mb-4`}>
                <stat.icon size={24} className={stat.textColor} />
              </div>
              <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Staff Activity Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Staff Activity</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hours Today</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {staffActivity.map((staff) => (
                  <tr key={staff.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold mr-3">
                          {staff.avatar}
                        </div>
                        <div className="font-medium text-gray-900">{staff.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800 capitalize">
                        {staff.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${
                          staff.status === 'active' ? 'bg-green-400' :
                          staff.status === 'break' ? 'bg-yellow-400' : 'bg-gray-400'
                        }`} />
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(staff.status)}`}>
                          {staff.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">{staff.hours}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPerformanceColor(staff.performance)}`}>
                        {staff.performance}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500 text-sm">{staff.lastActive}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performers This Week</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {performanceMetrics.map((performer, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold mr-3">
                      {performer.avatar}
                    </div>
                    <div>
                      <h4 className="text-gray-900 font-medium">{performer.name}</h4>
                      <p className="text-gray-500 text-sm capitalize">{performer.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`text-lg ${
                          i < performer.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm">{performer.metric}</span>
                  <span className="text-gray-900 font-semibold">{performer.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffMonitor;