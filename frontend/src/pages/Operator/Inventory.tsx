// Inventory.tsx
import { useState } from 'react';
import { Search, Eye, Package, Filter, Download } from 'lucide-react';

interface InventoryItem {
  id: number;
  sku: string;
  name: string;
  category: string;
  stock: number;
  min: number;
  location: string;
  lastUpdated: string;
}

const Inventory = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);

  const inventory: InventoryItem[] = [
    { id: 1, sku: 'ELEC-001', name: 'Laptop Dell XPS 13', category: 'Electronics', stock: 25, min: 10, location: 'A1', lastUpdated: '2024-01-30' },
    { id: 2, sku: 'ELEC-002', name: 'iPhone 14 Pro', category: 'Electronics', stock: 5, min: 10, location: 'A2', lastUpdated: '2024-01-28' },
    { id: 3, sku: 'ELEC-003', name: 'Samsung Galaxy S23', category: 'Electronics', stock: 30, min: 20, location: 'A3', lastUpdated: '2024-01-29' },
    { id: 4, sku: 'ELEC-004', name: 'MacBook Air M2', category: 'Electronics', stock: 3, min: 8, location: 'A4', lastUpdated: '2024-01-27' },
    { id: 5, sku: 'AUDI-001', name: 'Sony WH-1000XM5', category: 'Audio', stock: 7, min: 15, location: 'B1', lastUpdated: '2024-01-30' },
    { id: 6, sku: 'TABL-001', name: 'iPad Pro 11"', category: 'Tablets', stock: 20, min: 10, location: 'C1', lastUpdated: '2024-01-29' },
    { id: 7, sku: 'AUDI-002', name: 'AirPods Pro', category: 'Audio', stock: 50, min: 25, location: 'B2', lastUpdated: '2024-01-30' },
    { id: 8, sku: 'TABL-002', name: 'Samsung Galaxy Tab S8', category: 'Tablets', stock: 15, min: 12, location: 'C2', lastUpdated: '2024-01-28' },
  ];

  const categories = ['All', 'Electronics', 'Audio', 'Tablets'];
  const statuses = ['All', 'In Stock', 'Low Stock', 'Out of Stock'];

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || 
                          (statusFilter === 'In Stock' && item.stock >= item.min) ||
                          (statusFilter === 'Low Stock' && item.stock < item.min && item.stock > 0) ||
                          (statusFilter === 'Out of Stock' && item.stock === 0);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (stock: number, min: number) => {
    if (stock === 0) return 'bg-red-100 text-red-800';
    if (stock < min) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const getStatusText = (stock: number, min: number) => {
    if (stock === 0) return 'Out of Stock';
    if (stock < min) return 'Low Stock';
    return 'In Stock';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
            <p className="text-gray-600 mt-1">Track and manage your inventory items</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg">
              <Package size={16} className="text-gray-500" />
              <span className="text-gray-700 text-sm">Total: {inventory.length} items</span>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              <Download size={18} />
              Export
            </button>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search inventory..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-gray-900 focus:outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <Filter size={18} />
                Filters
              </button>
            </div>
          </div>
          
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInventory.map((item) => {
                  const isLow = item.stock < item.min;
                  return (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-900">{item.sku}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-xs text-gray-500">Updated: {item.lastUpdated}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-semibold ${isLow ? 'text-red-600' : 'text-gray-900'}`}>
                          {item.stock} units
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.min} units</td>
                      <td className="px-6 py-4 whitespace-nowrap font-mono text-sm text-gray-900">{item.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.stock, item.min)}`}>
                          {getStatusText(item.stock, item.min)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => setSelectedItem(item)}
                          className="text-blue-600 hover:text-blue-900 mr-3"
                        >
                          <Eye size={16} />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Item Details Modal */}
        {selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Item Details</h3>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">SKU</span>
                  <span className="font-medium text-gray-900">{selectedItem.sku}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Product Name</span>
                  <span className="font-medium text-gray-900">{selectedItem.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Category</span>
                  <span className="font-medium text-gray-900">{selectedItem.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Current Stock</span>
                  <span className={`font-medium ${selectedItem.stock < selectedItem.min ? 'text-red-600' : 'text-gray-900'}`}>
                    {selectedItem.stock} units
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Minimum Stock</span>
                  <span className="font-medium text-gray-900">{selectedItem.min} units</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Location</span>
                  <span className="font-medium text-gray-900">{selectedItem.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Status</span>
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedItem.stock, selectedItem.min)}`}>
                    {getStatusText(selectedItem.stock, selectedItem.min)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Last Updated</span>
                  <span className="font-medium text-gray-900">{selectedItem.lastUpdated}</span>
                </div>
              </div>
              <div className="mt-6 flex gap-2">
                <button
                  onClick={() => setSelectedItem(null)}
                  className="flex-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-lg transition-colors"
                >
                  Close
                </button>
                <button className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
                  Update Stock
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Inventory;