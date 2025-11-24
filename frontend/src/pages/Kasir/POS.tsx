// POS.tsx (removed unused Tag import)
import { useState } from 'react';
import { Search, Plus, Minus, Trash2, ShoppingCart, Package } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
}

const POS = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const products: Product[] = [
    { id: 1, name: 'Laptop Dell XPS 13', price: 15000000, stock: 25, category: 'Electronics' },
    { id: 2, name: 'iPhone 14 Pro', price: 18000000, stock: 15, category: 'Electronics' },
    { id: 3, name: 'Samsung Galaxy S23', price: 12000000, stock: 30, category: 'Electronics' },
    { id: 4, name: 'MacBook Air M2', price: 17500000, stock: 10, category: 'Electronics' },
    { id: 5, name: 'Sony WH-1000XM5', price: 5500000, stock: 40, category: 'Audio' },
    { id: 6, name: 'iPad Pro 11"', price: 13000000, stock: 20, category: 'Tablets' },
    { id: 7, name: 'AirPods Pro', price: 3500000, stock: 50, category: 'Audio' },
    { id: 8, name: 'Samsung Galaxy Tab S8', price: 10000000, stock: 18, category: 'Tablets' },
  ];

  const categories = ['All', 'Electronics', 'Audio', 'Tablets'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id: number, change: number) => {
    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
    ));
  };

  const removeFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = total * 0.1; // 10% tax
  const grandTotal = total + tax;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Point of Sale</h1>
            <p className="text-gray-600 mt-1">Process sales and manage transactions</p>
          </div>
          <div className="mt-4 md:mt-0 text-sm text-gray-500">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Products List */}
          <div className="lg:col-span-2 space-y-4">
            {/* Search and Filter */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-gray-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500 focus:bg-white"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{product.name}</h4>
                      <span className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-600">{product.category}</span>
                    </div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-green-600 font-semibold">
                        Rp {product.price.toLocaleString('id-ID')}
                      </span>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Package size={14} />
                        <span>Stock: {product.stock}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <Plus size={16} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-fit sticky top-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <ShoppingCart size={20} className="text-gray-600" />
                <h3 className="text-lg font-semibold text-gray-900">Cart ({cart.length})</h3>
              </div>
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1"
                >
                  <Trash2 size={16} />
                  Clear
                </button>
              )}
            </div>

            <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart size={48} className="text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">Cart is empty</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-gray-900 font-medium text-sm">{item.name}</p>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="bg-white hover:bg-gray-200 p-1 rounded border border-gray-300"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="text-gray-900 w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="bg-white hover:bg-gray-200 p-1 rounded border border-gray-300"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="text-green-600 font-semibold text-sm">
                        Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-gray-900">Rp {total.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">Tax (10%)</span>
                <span className="text-gray-900">Rp {tax.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-xl font-bold text-gray-900">
                  Rp {grandTotal.toLocaleString('id-ID')}
                </span>
              </div>
              <button
                disabled={cart.length === 0}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart size={18} />
                Process Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POS;