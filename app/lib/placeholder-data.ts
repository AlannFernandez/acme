// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6441a',
    name: 'User',
    email: 'admin@nextmail.com',
    password: '123456',
  },
  {
    id: '410544b2-4001-4271-9855-fec4b6a6443a',
    name: 'Comercio 1',
    email: 'local1@nextmail.com',
    password: '123456',
  },
  {
    id: '410544b2-4001-4271-9855-fec4b6a6443b',
    name: 'Comercio 2',
    email: 'local2@nextmail.com',
    password: '123456',
  },
];

const customers = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/customers/lee-robinson.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/customers/michael-novotny.png',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: '/customers/amy-burns.png',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/customers/balazs-orban.png',
  },
];

const invoices = [
  {
    customer_id: customers[0].id,
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    customer_id: customers[1].id,
    amount: 20348,
    status: 'pending',
    date: '2022-11-14',
  },
  {
    customer_id: customers[4].id,
    amount: 3040,
    status: 'paid',
    date: '2022-10-29',
  },
  {
    customer_id: customers[3].id,
    amount: 44800,
    status: 'paid',
    date: '2023-09-10',
  },
  {
    customer_id: customers[5].id,
    amount: 34577,
    status: 'pending',
    date: '2023-08-05',
  },
  {
    customer_id: customers[2].id,
    amount: 54246,
    status: 'pending',
    date: '2023-07-16',
  },
  {
    customer_id: customers[0].id,
    amount: 666,
    status: 'pending',
    date: '2023-06-27',
  },
  {
    customer_id: customers[3].id,
    amount: 32545,
    status: 'paid',
    date: '2023-06-09',
  },
  {
    customer_id: customers[4].id,
    amount: 1250,
    status: 'paid',
    date: '2023-06-17',
  },
  {
    customer_id: customers[5].id,
    amount: 8546,
    status: 'paid',
    date: '2023-06-07',
  },
  {
    customer_id: customers[1].id,
    amount: 500,
    status: 'paid',
    date: '2023-08-19',
  },
  {
    customer_id: customers[5].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-03',
  },
  {
    customer_id: customers[2].id,
    amount: 1000,
    status: 'paid',
    date: '2022-06-05',
  },
];

const revenue = [
  { month: 'Ene', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Abr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Ago', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dic', revenue: 4800 },
];


const products = [
  {id: 'e1e8b1a4-d0c8-4d98-a2f5-0b1e5c911e68', name: 'Detergente Limon Multi 1,4 Lt Magistral Deterg / Lavavajilla', price: '9024', stock: 100 , codeBar: "7890123456789"},
  {id: '4c9347b6-69d4-4b95-a501-5faee2f2c693', name: 'Fideos Tallarín Don Vicente 500g', price: '2007', stock: 50 , codeBar: "3456789012345"},
  {id: 'c60fbd62-1946-48d2-8723-6c1dcd6e3671', name: 'Leche Cindor chocolatada 1L cacao serenisima s/tacc', price: '3916', stock: 50 , codeBar: "6789012345678"},
  {id: '9f5c1fbb-7926-4f2b-bdad-6c5e928a03d1', name: 'Cañuelas aceite girasol botellon 5 litros', price: '11199', stock: 5 , codeBar: "9876543210987"},
  {id: 'a77cb0a3-7e05-47b8-9e0b-4b3b8e5ed34f', name: 'Cerveza Imperial Extra Lager Lata 473ml', price: '8424', stock: 15 , codeBar: "1357913579135"},
];



const sales = [
  {
    id: '2a07a7f5-1d59-4df6-9d9a-07a19305e49e',
    value: "$779",
    date: "2024-10-20",
    payment_method: "Tarjeta de crédito",
    client_id: '1234',
    seller: "Juan Pérez",
    shop_id: "Comercio 1"
  },
  {
    id: 'fc5f9a0c-9bce-4695-9e4e-e8e528db7a93',
    value: "$2910",
    date: "2024-10-19",
    payment_method: "Efectivo",
    client_id: '5678',
    seller: "María García",
    shop_id: "Comercio 1"
  },
  {
    id: 'c82e6f15-4071-48c4-b688-82c55dbf8d86',
    value: "$3900",
    date: "2024-10-18",
    payment_method: "Débito",
    client_id: '91011',
    seller: "Carlos López",
    shop_id: "Comercio 2"
  },
  {
    id: '0f0db7e2-2c68-43ec-922e-e56c2f6ecbba',
    value: "$2300",
    date: "2024-10-17",
    payment_method: "Mercado Pago",
    client_id: '121314',
    seller: "Andrea Martínez",
    shop_id: "Comercio 1"
  },
  {
    id: 'd8073d53-bb6d-4665-bf84-6c6881a2d37c',
    value: "$3450",
    date: "2024-10-16",
    payment_method: "Tarjeta de débito",
    client_id: '151617',
    seller: "Lucía Gómez",
    shop_id: "Comercio 2"
  }
];


export { users, customers, invoices, revenue , products, sales};
