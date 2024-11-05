"use client"
import React, { useState, useMemo } from 'react';
// import { ShoppingCart } from 'lucide-react';

import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import SearchBar from '@/app/components/product/searchTable';
import ProductList from '@/app/components/product/productList';
import Cart from '@/app/components/product/cart';
import { products } from '@/app/lib/products';
import { Product, CartItem } from '@/app/ui/products/product';


function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const filteredProducts = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        product.barcode.includes(term)
    );
  }, [searchTerm]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      ).filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCompleteSale = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Nueva venta</h1>
          <div className="flex items-center space-x-2">
            <ShoppingCartIcon className="h-6 w-6 text-blue-600" />
            <span className="text-lg font-medium">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)} producto/s
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
            <ProductList
              products={filteredProducts}
              onAddToCart={handleAddToCart}
            />
          </div>
          
          <div>
            <Cart
              items={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onCompleteSale={handleCompleteSale}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;