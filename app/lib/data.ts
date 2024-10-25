import { sql } from '@vercel/postgres';
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';

export async function fetchRevenue() {
  try {
    // Artificially delay a response for demo purposes.
    // Don't do this in production :)

    // console.log('Fetching revenue data...');
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue>`SELECT * FROM revenue`;

    // console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = await sql<LatestInvoiceRaw>`
      SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    const latestInvoices = data.rows.map((invoice) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}

export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    const numberOfInvoices = Number(data[0].rows[0].count ?? '0');
    const numberOfCustomers = Number(data[1].rows[0].count ?? '0');
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? '0');
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? '0');

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return invoices.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoices.');
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of invoices.');
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    return invoice[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch invoice.');
  }
}

export async function fetchCustomers() {
  try {
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    const customers = data.rows;
    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch customer table.');
  }
}

export function fetchProducts() {
  return [
    {"id":1,"name":"Tomate","price":90,"category":"Frutería/Verdulería","code_bar":"30142-236","date":"2024-03-20"},
    {"id":2,"name":"Papel higiénico","price":250,"category":"Higiene Personal","code_bar":"17089-417","date":"2024-05-04"},
    {"id":3,"name":"Queso Cremoso","price":599,"category":"Lácteos","code_bar":"52959-031","date":"2024-06-22"},
    {"id":4,"name":"Cerveza Rubia","price":410,"category":"Bebidas Alcohólicas","code_bar":"63533-221","date":"2024-07-17"},
    {"id":5,"name":"Vino Tinto","price":750,"category":"Bebidas Alcohólicas","code_bar":"64679-972","date":"2024-08-19"},
    {"id":6,"name":"Fideos Spaghetti","price":120,"category":"Almacén","code_bar":"0268-1357","date":"2024-10-22"},
    {"id":7,"name":"Pan Francés","price":150,"category":"Panadería","code_bar":"0378-1134","date":"2024-10-06"},
    {"id":8,"name":"Milanesa de Carne","price":850,"category":"Carnicería","code_bar":"49999-108","date":"2024-01-23"},
    {"id":9,"name":"Jabón de Tocador","price":200,"category":"Limpieza","code_bar":"27854-101","date":"2024-04-28"},
    {"id":10,"name":"Galletitas Diversión","price":120,"category":"Almacén","code_bar":"68012-052","date":"2023-12-02"}
  ];
}


export function fetchCategories() {
  return [
    {"id": 1, "name": "Frutería/Verdulería", "estado": "activo"},
    {"id": 2, "name": "Higiene Personal", "estado": "activo"},
    {"id": 3, "name": "Lácteos", "estado": "activo"},
    {"id": 4, "name": "Bebidas Alcohólicas", "estado": "activo"},
    {"id": 5, "name": "Almacén", "estado": "activo"},
    {"id": 6, "name": "Panadería", "estado": "activo"},
    {"id": 7, "name": "Carnicería", "estado": "activo"},
    {"id": 8, "name": "Limpieza", "estado": "activo"}
  ];
}




export function fetchSales(
  query: string,
  currentPage: number,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  return [
    {
      "id": 1,
      "productos": [
        {"nombre": "Tomate", "cantidad": 2, "precio_unitario": 90},
        {"nombre": "Queso Cremoso", "cantidad": 1, "precio_unitario": 599}
      ],
      "importe_total": "$779",
      "fecha_venta": "2024-10-20",
      "tipo_pago": "Tarjeta de crédito",
      "cliente_id": 1234,
      "nombre_cajero": "Juan Pérez",
      "sucursal": "Comercio 1"
    },
    {
      "id": 2,
      "productos": [
        {"nombre": "Cerveza Rubia", "cantidad": 6, "precio_unitario": 410},
        {"nombre": "Pan Francés", "cantidad": 3, "precio_unitario": 150}
      ],
      "importe_total": "$2910",
      "fecha_venta": "2024-10-19",
      "tipo_pago": "Efectivo",
      "cliente_id": 5678,
      "nombre_cajero": "María García",
      "sucursal": "Comercio 1"
    },
    {
      "id": 3,
      "productos": [
        {"nombre": "Papel higiénico", "cantidad": 12, "precio_unitario": 250},
        {"nombre": "Fideos Spaghetti", "cantidad": 5, "precio_unitario": 120}
      ],
      "importe_total": "$3900",
      "fecha_venta": "2024-10-18",
      "tipo_pago": "Débito",
      "cliente_id": 91011,
      "nombre_cajero": "Carlos López",
      "sucursal": "Comercio 2"
    },
    {
      "id": 4,
      "productos": [
        {"nombre": "Vino Tinto", "cantidad": 2, "precio_unitario": 750},
        {"nombre": "Jabón de Tocador", "cantidad": 4, "precio_unitario": 200}
      ],
      "importe_total": "$2300",
      "fecha_venta": "2024-10-17",
      "tipo_pago": "Mercado Pago",
      "cliente_id": 121314,
      "nombre_cajero": "Andrea Martínez",
      "sucursal": "Comercio 1"
    },
    {
      "id": 5,
      "productos": [
        {"nombre": "Milanesa de Carne", "cantidad": 3, "precio_unitario": 850},
        {"nombre": "Galletitas Diversión", "cantidad": 10, "precio_unitario": 120}
      ],
      "importe_total": "$3450",
      "fecha_venta": "2024-10-16",
      "tipo_pago": "Tarjeta de débito",
      "cliente_id": 151617,
      "nombre_cajero": "Lucía Gómez",
      "sucursal": "Comercio 2"
    }
  ];
}
