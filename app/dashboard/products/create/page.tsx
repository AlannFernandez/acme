import Form from '@/app/ui/products/create-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchCategories } from '@/app/lib/data';
 
export default async function Page() {
  const categories =  fetchCategories();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Producto', href: '/dashboard/products' },
          {
            label: 'Nuevo producto',
            href: '/dashboard/products/create',
            active: true,
          },
        ]}
      />
      <Form categories={categories} />
    </main>
  );
}