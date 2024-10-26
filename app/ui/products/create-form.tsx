'use client';

import { CategoryField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,ClipboardDocumentListIcon, PencilIcon, QrCodeIcon
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createInvoice, State } from '@/app/lib/actions';
import { useActionState } from 'react';


export default function Form({ categories }: { categories: CategoryField[] }) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createInvoice, initialState);

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Elige una categoría
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="customer-error"
            >
              <option value="" disabled>
                Selecciona la categoría
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          <div id="customer-error" aria-live="polite" aria-atomic="true">
            {state.errors?.customerId &&
              state.errors.customerId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="mb-2 block text-sm font-medium">
            Descripción
          </label>
          <div className="relative">
          <div className="relative">
              <input
                id="description"
                name="description"
                type="text"
                // step="0.01"
                placeholder="Descripción"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />              
            </div>
            <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>                    
        </div>

        {/* Invoice Amount */}
        <div className="mb-4">
          <label htmlFor="cost" className="mb-2 block text-sm font-medium">
            Costo
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="cost"
                name="cost"
                type="number"
                step="0.01"
                placeholder="Precio de costo"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>         
        </div>
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Precio venta
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                placeholder="Precio de venta"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>  
        </div>


        <div className="mb-4">
          <label htmlFor="stock" className="mb-2 block text-sm font-medium">
            Stock
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="stock"
                name="stock"
                type="number"
                // step="0.01"
                placeholder="Stock"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <ClipboardDocumentListIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        
        </div>


        <div className="mb-4">
          <label htmlFor="qr-code" className="mb-2 block text-sm font-medium">
            Codigo de barras
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="qr-code"
                name="qr-code"
                type="text"
                // step="0.01"
                placeholder="Codigo de barra"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              />
              <QrCodeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        
        </div>


        <div className="mb-4">
          <label htmlFor="shops" className="mb-2 block text-sm font-medium">
            Seleccione los comercios
          </label>
          <div className="relative">
            <select
              id="shops"
              name="shopsId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="shops-error"
            >                     
              <option value="" disabled>
                Selecciona los comercios
              </option>
                <option  value={2}>
                  Local 1
                </option>
                <option  value={3}>
                  Local 2
                </option>
                <option  value={4}>
                  Todos los comercios
                </option>
              
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
       
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancelar
        </Link>
        <Button type="submit">Crear Product</Button>
      </div>
    </form>
  );
}
