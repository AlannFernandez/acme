"use-client"

import { formatDateToLocal } from '@/app/lib/utils';
import { fetchSales } from '@/app/lib/data';

export default async function salesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  
  const sales = fetchSales(query, currentPage);

  
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
        
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Id
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Importe
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Fecha de venta
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Tipo de pago
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Cajero
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Comercio
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Editar</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {sales?.map((sale) => (
                <tr
                  key={sale.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >                 
                  <td className="whitespace-nowrap px-3 py-3">
                    {sale.id}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {sale.importe_total}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(sale.fecha_venta)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {sale.tipo_pago}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {sale.nombre_cajero}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {sale.sucursal}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
               
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
