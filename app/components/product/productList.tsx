import React from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

import { Product } from '@/app/ui/products/product';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export default function ProductList({ products, onAddToCart }: ProductListProps) {
  return (
    <div className="mt-4 space-y-2">
      {products.map((product) => (
        <div
          key={product.id}
          className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 hover:border-blue-500 transition-all"
        >
          <div>
            <h3 className="font-medium text-gray-900">{product.name}</h3>
            <p className="text-sm text-gray-500">Cod/barras: {product.barcode}</p>
            <p className="text-sm font-medium text-blue-600">${product.price.toFixed(2)}</p>
          </div>
          <button
            onClick={() => onAddToCart(product)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
          >
            <PlusIcon className="h-5 w-5"  />
          </button>
        </div>
      ))}
    </div>
  );
}