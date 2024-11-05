import React, { useState } from 'react';
// import { CreditCard, Banknote, X } from 'lucide-react';
import { CreditCardIcon, BanknotesIcon, XCircleIcon } from '@heroicons/react/24/outline';
interface PaymentModalProps {
  total: number;
  onClose: () => void;
  onComplete: (paymentDetails: {
    method: 'card' | 'cash';
    amountPaid?: number;
    change?: number;
  }) => void;
}
import { ToastContainer,  showToast } from '@/app/components/toast/toast';

export default function PaymentModal({ total, onClose, onComplete }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash' | null>(null);
  const [cashAmount, setCashAmount] = useState('');
  const [error, setError] = useState('');

  const handleCashPayment = () => {
    const amount = parseFloat(cashAmount);
    if (amount < total) {
      setError('Monto de pago insuficiente');
      return;
    }
    const change = amount - total;
    onComplete({
      method: 'cash',
      amountPaid: amount,
      change
    })
    saleSuccessToast();
    ;
  };

  const handleCardPayment = () => {
    onComplete({
      method: 'card',
      amountPaid: total
    });
  };
  const saleSuccessToast = ()=>{
    console.log("mostrar toast");
    
    showToast('Venta exitosa', 'success')
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <ToastContainer/>
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Forma de pago</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XCircleIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-lg font-medium mb-4">
            Total: <span className="text-blue-600">${total.toFixed(2)}</span>
          </p>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setPaymentMethod('card')}
              className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-all ${
                paymentMethod === 'card'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <CreditCardIcon className="h-6 w-6" />
              <span>Tarjetas</span>
            </button>

            <button
              onClick={() => setPaymentMethod('cash')}
              className={`p-4 border rounded-lg flex flex-col items-center gap-2 transition-all ${
                paymentMethod === 'cash'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <BanknotesIcon className="h-6 w-6" />
              <span>Efectivo</span>
            </button>
          </div>
        </div>

        {paymentMethod === 'cash' && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ingresa:
            </label>
            <input
              type="number"
              value={cashAmount}
              onChange={(e) => {
                setCashAmount(e.target.value);
                setError('');
              }}
              className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ingresa el monto con que pagaron"
              step="0.01"
            />
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            {parseFloat(cashAmount) > total && (
              <p className="text-green-600 text-sm mt-1">
                Vuelto: ${(parseFloat(cashAmount) - total).toFixed(2)}
              </p>
            )}
          </div>
        )}

        <button
          onClick={paymentMethod === 'cash' ? handleCashPayment : handleCardPayment}
          disabled={!paymentMethod || (paymentMethod === 'cash' && !cashAmount)}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Completar venta
        </button>
      </div>
    </div>
  );
}