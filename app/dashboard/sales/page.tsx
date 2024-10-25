import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/sales/table';

import { lusitana } from '@/app/ui/fonts';
import { Suspense } from 'react';
import {  CardsSkeleton, InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { fetchInvoicesPages } from '@/app/lib/data';
import { Metadata } from 'next';

import { Card } from '@/app/ui/dashboard/cards';
export const metadata: Metadata = {
  title: 'Ventas',
};


export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await fetchInvoicesPages(query);
 
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Ventas</h1>
      </div>
  
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <Suspense fallback={<CardsSkeleton />}>
      <Card title="Acreditadas" value={"$ 10,400.00"} type="collected" />
      <Card title="Pendientes" value={"$ 2,000"} type="collected" />
      <Card title="Devoluciones" value={"$ 1,000"} type="collected" />
      <Card title="Total" value={"$ 13.339,00"} type="collected" />
      </Suspense>
       
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Buscar venta..." />
        
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}