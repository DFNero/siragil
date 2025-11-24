// Users.tsx
import { Plus, Search, Edit, Trash2, UserCheck, Filter, Mail, Shield, UserX } from 'lucide-react';

const Users = () => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@siragil.com', role: 'admin', status: 'active', avatar: 'https://picsum.photos/seed/user1/100/100.jpg', lastLogin: '2024-01-30 14:22' },
    { id: 2, name: 'Jane Smith', email: 'jane@siragil.com', role: 'kasir', status: 'active', avatar: 'https://picsum.photos/seed/user2/100/100.jpg', lastLogin: '2024-01-30 10:15' },
    { id: 3, name: 'Bob Wilson', email: 'bob@siragil.com', role: 'operator', status: 'active', avatar: 'https://picsum.photos/seed/user3/100/100.jpg', lastLogin: '2024-01-29 16:45' },
    { id: 4, name: 'Alice Brown', email: 'alice@siragil.com', role: 'kasir', status: 'inactive', avatar: 'https://picsum.photos/seed/user4/100/100.jpg', lastLogin: '2024-01-25 09:30' },
    { id: 5, name: 'Charlie Davis', email: 'charlie@siragil.com', role: 'operator', status: 'active', avatar: 'https://picsum.photos/seed/user5/100/100.jpg', lastLogin: '2024-01-30 11:20' },
    { id: 6, name: 'Eva Johnson', email: 'eva@siragil.com', role: 'kasir', status: 'active', avatar: 'https://picsum.photos/seed/user6/100/100.jpg', lastLogin: '2024-01-29 13:10' },
    { id: 7, name: 'Frank Miller', email: 'frank@siragil.com', role: 'operator', status: 'inactive', avatar: 'https://picsum.photos/seed/user7/100/100.jpg', lastLogin: '2024-01-20 15:45' },
    { id: 8, name: 'Grace Lee', email: 'grace@siragil.com', role: 'kasir', status: 'active', avatar: 'https://picsum.photos/seed/user8/100/100.jpg', lastLogin: '2024-01-30 12:05' },
  ];

  const roles = ['All', 'admin', 'kasir', 'operator'];

  const getRoleColor = (role: string) => {
    switch(role) {
      case 'admin': return 'bg-purple-100 text-purple-600';
      case 'kasir': return 'bg-blue-100 text-blue-600';
      case 'operator': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getRoleIcon = (role: string) => {
    switch(role) {
      case 'admin': return Shield;
      case 'kasir': return UserCheck;
      case 'operator': return UserCheck;
      default: return UserCheck;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
            <p className="text-gray-600 mt-1">Manage user accounts and permissions</p>
          </div>
          <button className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm">
            <Plus size={20} />
            Add User
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search users..."
                className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-gray-900 focus:outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
              <Filter size={18} />
              Filter
            </button>
          </div>
          
          {/* Role Tabs */}
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {roles.map((role) => (
              <button
                key={role}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                  role === 'All'
                    ? 'bg-blue-100 text-blue-600 border border-blue-200'
                    : 'bg-gray-50 text-gray-600 border border-gray-300 hover:bg-gray-100'
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {users.map((user) => {
            const RoleIcon = getRoleIcon(user.role);
            return (
              <div key={user.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="relative">
                      <img src={user.avatar} alt={user.name} className="w-16 h-16 rounded-full object-cover" />
                      <span className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                        user.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                      }`}></span>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-900 text-lg mb-1">{user.name}</h3>
                  <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                    <Mail size={14} />
                    <span className="truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                      <RoleIcon size={14} />
                      <span className="capitalize">{user.role}</span>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      user.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {user.status}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mb-4">
                    Last login: {user.lastLogin}
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 flex items-center justify-center gap-1 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                      <Edit size={16} />
                      Edit
                    </button>
                    <button className="p-2 bg-gray-50 border border-gray-300 rounded-lg text-red-600 hover:bg-gray-100 transition-colors">
                      {user.status === 'active' ? <UserX size={16} /> : <UserCheck size={16} />}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">Showing 1-8 of 24 users</p>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200">Previous</button>
            <button className="px-3 py-1 rounded bg-blue-600 text-white">1</button>
            <button className="px-3 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200">2</button>
            <button className="px-3 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200">3</button>
            <button className="px-3 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;