// StockUpdate.tsx
import { useState } from 'react';
import { Plus, Minus, Save, Search, Check, AlertCircle } from 'lucide-react';

interface Product {
  id: number;
  sku: string;
  name: string;
  currentStock: number;
  minStock: number;
  location: string;
}

interface StockUpdate {
  [key: number]: {
    add?: number;
    remove?: number;
    note?: string;
  };
}

const StockUpdate = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [updates, setUpdates] = useState<StockUpdate>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const products: Product[] = [
    { id: 1, sku: 'ELEC-001', name: 'Laptop Dell XPS 13', currentStock: 25, minStock: 10, location: 'A1' },
    { id: 2, sku: 'ELEC-002', name: 'iPhone 14 Pro', currentStock: 5, minStock: 10, location: 'A2' },
    { id: 3, sku: 'ELEC-003', name: 'Samsung Galaxy S23', currentStock: 30, minStock: 20, location: 'A3' },
    { id: 4, sku: 'ELEC-004', name: 'MacBook Air M2', currentStock: 3, minStock: 8, location: 'A4' },
    { id: 5, sku: 'AUDI-001', name: 'Sony WH-1000XM5', currentStock: 7, minStock: 15, location: 'B1' },
    { id: 6, sku: 'TABL-001', name: 'iPad Pro 11"', currentStock: 20, minStock: 10, location: 'C1' },
  ];

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    product.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddStock = (productId: number, quantity: string) => {
    const qty = parseInt(quantity);
    if (!qty || qty <= 0) return;
    
    setUpdates(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        add: (prev[productId]?.add || 0) + qty
      }
    }));
  };

  const handleRemoveStock = (productId: number, quantity: string) => {
    const qty = parseInt(quantity);
    if (!qty || qty <= 0) return;
    
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const currentRemove = updates[productId]?.remove || 0;
    const newTotal = currentRemove + qty;
    
    if (newTotal <= product.currentStock) {
      setUpdates(prev => ({
        ...prev,
        [productId]: {
          ...prev[productId],
          remove: newTotal
        }
      }));
    }
  };

  const handleNoteChange = (productId: number, note: string) => {
    setUpdates(prev => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        note
      }
    }));
  };

  const calculateNewStock = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (!product) return 0;
    
    const add = updates[productId]?.add || 0;
    const remove = updates[productId]?.remove || 0;
    return product.currentStock + add - remove;
  };

  const handleSaveAll = () => {
    // In a real app, this would save to backend
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    setUpdates({});
  };

  const hasUpdates = Object.keys(updates).length > 0;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Stock Update</h1>
            <p className="text-gray-600 mt-1">Add or remove stock quantities</p>
          </div>
          <div className="mt-4 md:mt-0">
            <button
              onClick={handleSaveAll}
              disabled={!hasUpdates}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                hasUpdates 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Save size={20} />
              Save All Changes
            </button>
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
            <Check size={20} className="text-green-600" />
            <span className="text-green-800">Stock updates have been saved successfully!</span>
          </div>
        )}

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search product by name or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-gray-900 focus:outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Update Forms */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProducts.map((product) => {
            const update = updates[product.id] || {};
            const newStock = calculateNewStock(product.id);
            const isLow = newStock < product.minStock;
            
            return (
              <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                    <p className="text-gray-500 text-sm font-mono">{product.sku}</p>
                  </div>
                  {isLow && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-yellow-100 rounded-lg">
                      <AlertCircle size={16} className="text-yellow-600" />
                      <span className="text-xs font-medium text-yellow-800">Low Stock</span>
                    </div>
                  )}
                </div>
                
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">Current Stock:</span>
                    <span className="text-gray-900 font-semibold">{product.currentStock} units</span>
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-gray-600 text-sm">Minimum Stock:</span>
                    <span className="text-gray-900">{product.minStock} units</span>
                  </div>
                  <div className="flex justify-between items-center mt-1 pt-2 border-t border-gray-200">
                    <span className="text-gray-600 text-sm">New Stock:</span>
                    <span className={`font-semibold ${isLow ? 'text-red-600' : 'text-green-600'}`}>
                      {newStock} units
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Add Stock */}
                  <div className="bg-green-50 rounded-lg p-4">
                    <label className="text-green-800 text-sm font-medium mb-2 flex items-center gap-2">
                      <Plus size={16} />
                      Add Stock
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="0"
                        min="0"
                        className="flex-1 bg-white border border-green-200 rounded px-3 py-2 text-gray-900 focus:outline-none focus:border-green-500"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const target = e.target as HTMLInputElement;
                            handleAddStock(product.id, target.value);
                            target.value = '';
                          }
                        }}
                      />
                      <button
                        onClick={(e) => {
                          const input = (e.currentTarget.previousElementSibling as HTMLInputElement);
                          handleAddStock(product.id, input.value);
                          input.value = '';
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors"
                      >
                        Add
                      </button>
                    </div>
                    {update.add && update.add > 0 && (
                      <div className="mt-2 text-sm text-green-700">
                        Adding {update.add} units
                      </div>
                    )}
                  </div>

                  {/* Remove Stock */}
                  <div className="bg-red-50 rounded-lg p-4">
                    <label className="text-red-800 text-sm font-medium mb-2 flex items-center gap-2">
                      <Minus size={16} />
                      Remove Stock
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="0"
                        min="0"
                        max={product.currentStock - (update.remove || 0)}
                        className="flex-1 bg-white border border-red-200 rounded px-3 py-2 text-gray-900 focus:outline-none focus:border-red-500"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const target = e.target as HTMLInputElement;
                            handleRemoveStock(product.id, target.value);
                            target.value = '';
                          }
                        }}
                      />
                      <button
                        onClick={(e) => {
                          const input = (e.currentTarget.previousElementSibling as HTMLInputElement);
                          handleRemoveStock(product.id, input.value);
                          input.value = '';
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                    {update.remove && update.remove > 0 && (
                      <div className="mt-2 text-sm text-red-700">
                        Removing {update.remove} units
                      </div>
                    )}
                  </div>

                  {/* Notes */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <label className="text-gray-700 text-sm font-medium mb-2 block">
                      Notes (Optional)
                    </label>
                    <textarea
                      placeholder="Add notes about this update..."
                      rows={2}
                      value={update.note || ''}
                      onChange={(e) => handleNoteChange(product.id, e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-gray-900 text-sm focus:outline-none focus:border-blue-500 resize-none"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StockUpdate;