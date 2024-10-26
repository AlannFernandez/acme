"use client"
import React, { useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  codeBar: string;
  stock: number;
}

interface Sale {
  id: string;
  date: string;
  customer: string;
  product: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

const SalesDetailTable: React.FC = () => {
  const [cashPaid, setCashPaid] = useState<string>('');
  const [change, setChange] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([
    { id: 'e1e8b1a4-d0c8-4d98-a2f5-0b1e5c911e68', name: 'Detergente Limon Multi 1,4 Lt', price: 9024, codeBar: "7890123456789", stock: 100 },
    { id: '4c9347b6-69d4-4b95-a501-5faee2f2c693', name: 'Fideos Tallarín Don Vicente 500g', price: 2007, codeBar: "3456789012345", stock: 50 },
    { id: 'c60fbd62-1946-48d2-8723-6c1dcd6e3671', name: 'Leche Cindor chocolatada 1L', price: 3916, codeBar: "6789012345678", stock: 50 },
    { id: '9f5c1fbb-7926-4f2b-bdad-6c5e928a03d1', name: 'Cañuelas aceite girasol 5 litros', price: 11199, codeBar: "9876543210987", stock: 5 },
    { id: 'a77cb0a3-7e05-47b8-9e0b-4b3b8e5ed34f', name: 'Cerveza Imperial Extra Lager Lata 473ml', price: 8424, codeBar: "1357913579135", stock: 15 },
  ]);
  const [salesData, setSalesData] = useState<Sale[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const totalGeneral = salesData.reduce((acc, item) => acc + item.total, 0);

  const handleCashPayment = () => {
    const cashAmount = parseFloat(cashPaid);
    if (isNaN(cashAmount) || cashAmount < totalGeneral) {
      alert('El monto ingresado no es válido o no es suficiente para cubrir la venta.');
      return;
    }
    setChange(cashAmount - totalGeneral);
    setCashPaid('');
  };

  const handleSearch = () => {
    const product = products.find(p => p.name.includes(searchQuery) || p.codeBar === searchQuery);
    setSelectedProduct(product || null);
  };

  const handleAddProduct = () => {
    if (!selectedProduct) return;
    const newSale: Sale = {
      id: selectedProduct.id,
      date: new Date().toISOString(),
      customer: 'Cliente Desconocido', // Puedes modificar esto para capturar el cliente
      product: selectedProduct.name,
      quantity: quantity,
      unitPrice: selectedProduct.price,
      total: selectedProduct.price * quantity,
    };
    setSalesData([...salesData, newSale]);
    setSelectedProduct(null);
    setQuantity(1);
    setSearchQuery('');
  };

  return (
    <div>
      <div>
        <h2>Buscar Producto</h2>
        <input
          type="text"
          placeholder="Código de Barras o Nombre"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: '10px', marginRight: '10px' }}
        />
        <button onClick={handleSearch} style={{ padding: '10px' }}>
          Buscar
        </button>
        {selectedProduct && (
          <div style={{ marginTop: '10px' }}>
            <h3>Producto Seleccionado: {selectedProduct.name}</h3>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
              style={{ padding: '10px', marginRight: '10px' }}
            />
            <button onClick={handleAddProduct} style={{ padding: '10px' }}>
              Agregar Producto
            </button>
          </div>
        )}
      </div>

      <table style={{ borderCollapse: 'collapse', width: '100%', margin: '20px 0', fontFamily: 'Arial, sans-serif' }}>
        <caption>Detalle de Venta</caption>
        <thead>
          <tr>
            <th style={{ border: '1px solid #000', padding: '10px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>ID de Venta</th>
            <th style={{ border: '1px solid #000', padding: '10px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Fecha</th>
            <th style={{ border: '1px solid #000', padding: '10px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Cliente</th>
            <th style={{ border: '1px solid #000', padding: '10px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Producto</th>
            <th style={{ border: '1px solid #000', padding: '10px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Cantidad</th>
            <th style={{ border: '1px solid #000', padding: '10px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Precio Unitario</th>
            <th style={{ border: '1px solid #000', padding: '10px', textAlign: 'left', backgroundColor: '#f2f2f2' }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {salesData.map((sale) => (
            <tr key={sale.id}>
              <td style={{ border: '1px solid #000', padding: '10px' }}>{sale.id}</td>
              <td style={{ border: '1px solid #000', padding: '10px' }}>{sale.date}</td>
              <td style={{ border: '1px solid #000', padding: '10px' }}>{sale.customer}</td>
              <td style={{ border: '1px solid #000', padding: '10px' }}>{sale.product}</td>
              <td style={{ border: '1px solid #000', padding: '10px' }}>{sale.quantity}</td>
              <td style={{ border: '1px solid #000', padding: '10px' }}>${sale.unitPrice.toFixed(2)}</td>
              <td style={{ border: '1px solid #000', padding: '10px' }}>${sale.total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6} style={{ border: '1px solid #000', padding: '10px', fontWeight: 'bold' }}>Total General</td>
            <td style={{ border: '1px solid #000', padding: '10px', fontWeight: 'bold' }}>${totalGeneral.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
      <div style={{ marginTop: '20px' }}>
        <h2>Método de Pago</h2>
        <input
          type="number"
          placeholder="Ingrese el monto que paga"
          value={cashPaid}
          onChange={(e) => setCashPaid(e.target.value)}
          style={{ padding: '10px', marginRight: '10px' }}
        />
        <button onClick={handleCashPayment} style={{ padding: '10px' }}>
          Cobrar Venta
        </button>
        {change !== null && (
          <div style={{ marginTop: '10px', fontWeight: 'bold' }}>
            Vuelto: ${change.toFixed(2)}
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesDetailTable;
