// Products.tsx
import { Plus, Search, Edit, Trash2, Filter, Grid, List, Package, Eye } from 'lucide-react';

const Products = () => {
  const products = [
    { id: 1, name: 'buah pine cone', category: 'tester', price: 'Rp 15,000,000', stock: 25, status: 'active', image: 'https://picsum.photos/seed/laptop1/100/100.jpg' },
    { id: 2, name: 'car', category: 'kendaraan', price: 'Rp 18,000,000', stock: 15, status: 'active', image: 'https://picsum.photos/seed/phone1/100/100.jpg' },
    { id: 3, name: 'Samsung Galaxy S23', category: 'Electronics', price: 'Rp 12,000,000', stock: 30, status: 'active', image: 'https://picsum.photos/seed/phone2/100/100.jpg' },
    { id: 4, name: 'MacBook Air M2', category: 'Electronics', price: 'Rp 17,500,000', stock: 10, status: 'active', image: 'https://picsum.photos/seed/laptop2/100/100.jpg' },
    { id: 5, name: 'Sony WH-1000XM5', category: 'Audio', price: 'Rp 5,500,000', stock: 40, status: 'active', image: 'https://picsum.photos/seed/headphone1/100/100.jpg' },
    { id: 6, name: 'iPad Pro 11"', category: 'Tablets', price: 'Rp 13,000,000', stock: 20, status: 'inactive', image: 'https://picsum.photos/seed/tablet1/100/100.jpg' },
    { id: 7, name: 'AirPods Pro', category: 'Audio', price: 'Rp 3,500,000', stock: 50, status: 'active', image: 'https://picsum.photos/seed/airpods1/100/100.jpg' },
    { id: 8, name: 'Samsung Galaxy Tab S8', category: 'Tablets', price: 'Rp 10,000,000', stock: 18, status: 'active', image: 'https://picsum.photos/seed/tablet2/100/100.jpg' },
  ];

  const categories = ['All', 'Electronics', 'Audio', 'Tablets'];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Products Management</h1>
            <p className="text-gray-600 mt-1">Manage your product inventory and details</p>
          </div>
          <button className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm">
            <Plus size={20} />
            Add Product
          </button>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-gray-900 focus:outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                <Filter size={18} />
                Filter
              </button>
              <div className="flex bg-gray-50 border border-gray-300 rounded-lg">
                <button className="p-2 text-blue-600">
                  <Grid size={18} />
                </button>
                <button className="p-2 text-gray-400">
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Category Tabs */}
          <div className="flex gap-2 mt-4 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                  category === 'All'
                    ? 'bg-blue-100 text-blue-600 border border-blue-200'
                    : 'bg-gray-50 text-gray-600 border border-gray-300 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
                <span className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium ${
                  product.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {product.status}
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-gray-900">{product.name}</h3>
                  <span className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-600">{product.category}</span>
                </div>
                <p className="text-lg font-semibold text-gray-900 mb-2">{product.price}</p>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    <Package size={16} className="text-gray-400" />
                    <span className={`text-sm font-medium ${
                      product.stock > 20 ? 'text-green-600' : product.stock > 10 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {product.stock} units
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-1 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                    <Eye size={16} />
                    View
                  </button>
                  <button className="p-2 bg-gray-50 border border-gray-300 rounded-lg text-blue-600 hover:bg-gray-100 transition-colors">
                    <Edit size={16} />
                  </button>
                  <button className="p-2 bg-gray-50 border border-gray-300 rounded-lg text-red-600 hover:bg-gray-100 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">Showing 1-8 of 24 products</p>
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

export default Products;