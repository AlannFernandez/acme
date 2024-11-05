import React, { useState } from 'react';
// import { Trash2, MinusCircle, PlusCircle } from 'lucide-react';
// import { CartItem } from '../types/Product';
// import PaymentModal from './PaymentModal';

import PaymentModal from './paymentModal';
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { CartItem } from '@/app/ui/products/product';
interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: string, newQuantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCompleteSale: () => void;
}

export default function Cart({ items, onUpdateQuantity, onRemoveItem, onCompleteSale }: CartProps) {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePaymentComplete = (paymentDetails: {
    method: 'card' | 'cash';
    amountPaid?: number;
    change?: number;
  }) => {
    // Here you could send the payment details to your backend
    alert(
      paymentDetails.method === 'card'
        ? 'Card payment processed successfully!'
        : `Payment received: $${paymentDetails.amountPaid}\nChange: $${paymentDetails.change?.toFixed(2)}`
    );
    setShowPaymentModal(false);
    onCompleteSale();
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Detalle</h2>
      
      <div className="space-y-4 mb-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-100">
            <div className="flex-1">
              <h3 className="font-medium text-gray-900">{item.name}</h3>
              <p className="text-sm text-gray-500">${item.price.toFixed(2)} c/u</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                className="text-gray-400 hover:text-blue-600 transition-colors"
              >
                <MinusIcon className="h-5 w-5" />
              </button>
              
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              
              <button
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                className="text-gray-400 hover:text-blue-600 transition-colors"
              >
                <PlusIcon className="h-5 w-5" />
              </button>
              
              <button
                onClick={() => onRemoveItem(item.id)}
                className="text-gray-400 hover:text-red-600 transition-colors ml-2"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between items-center text-lg font-semibold mb-4">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>

        <button
          onClick={() => setShowPaymentModal(true)}
          disabled={items.length === 0}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Finalizar
        </button>
      </div>

      {showPaymentModal && (
        <PaymentModal
          total={total}
          onClose={() => setShowPaymentModal(false)}
          onComplete={handlePaymentComplete}
        />
      )}
    </div>
  );
}