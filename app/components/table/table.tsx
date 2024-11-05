// import React, { useCallback, useRef, useState, useEffect } from 'react';
// import { TableProps, Column } from './tableTypes';

// export function Table<T extends Record<string, any>>({
//   columns,
//   data,
//   footerContent,
//   maxHeight = '400px',
//   className = '',
//   onRowClick,
//   isLoading = false,
//   emptyMessage = 'No data available'
// }: TableProps<T>) {
//   const [headerWidths, setHeaderWidths] = useState<number[]>([]);
//   const headerRefs = useRef<(HTMLTableCellElement | null)[]>([]);
//   const bodyRefs = useRef<(HTMLTableCellElement | null)[]>([]);

//   // Sync header and body column widths
//   useEffect(() => {
//     const syncColumnWidths = () => {
//       const newHeaderWidths = headerRefs.current.map(
//         (cell) => cell?.getBoundingClientRect().width ?? 0
//       );
//       setHeaderWidths(newHeaderWidths);

//       headerRefs.current.forEach((headerCell, index) => {
//         const bodyCell = bodyRefs.current[index];
//         if (headerCell && bodyCell) {
//           bodyCell.style.width = `${headerCell.getBoundingClientRect().width}px`;
//         }
//       });
//     };

//     syncColumnWidths();
//     window.addEventListener('resize', syncColumnWidths);
//     return () => window.removeEventListener('resize', syncColumnWidths);
//   }, [columns]);

//   const renderCell = useCallback((column: Column<T>, item: T) => {
//     const value = item[column.accessor];
//     if (column.render) {
//       return column.render(value, item);
//     }
//     return value?.toString() ?? '';
//   }, []);

//   return (
//     <div className={`border border-gray-200 rounded-lg overflow-hidden bg-white ${className}`}>
//       {/* Header */}
//       <div className="overflow-hidden">
//         <table className="w-full">
//           <thead className="bg-gray-50">
//             <tr>
//               {columns.map((column, index) => (
//                 <th
//                   key={column.accessor.toString()}
//                   ref={(el) => (headerRefs.current[index] = el)}
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
//                   style={{ width: column.width }}
//                 >
//                   {column.header}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//         </table>
//       </div>

//       {/* Scrollable Body */}
//       <div
//         className="overflow-auto"
//         style={{ maxHeight, position: 'relative' }}
//       >
//         {isLoading ? (
//           <div className="flex items-center justify-center py-8">
//             <span className="loader">Cargando...</span>
//             {/* Spinner utilizando CSS */}
//             <style jsx>{`
//               .loader {
//                 border: 4px solid rgba(0, 0, 0, 0.1);
//                 border-top: 4px solid #007bff; /* Color del spinner */
//                 border-radius: 50%;
//                 width: 24px;
//                 height: 24px;
//                 animation: spin 1s linear infinite;
//                 margin-left: 10px;
//               }
//               @keyframes spin {
//                 0% { transform: rotate(0deg); }
//                 100% { transform: rotate(360deg); }
//               }
//             `}</style>
//           </div>
//         ) : data.length === 0 ? (
//           <div className="flex items-center justify-center py-8 text-gray-500">
//             {emptyMessage}
//           </div>
//         ) : (
//           <table className="w-full">
//             <tbody className="bg-white divide-y divide-gray-200">
//               {data.map((item, rowIndex) => (
//                 <tr
//                   key={rowIndex}
//                   onClick={() => onRowClick?.(item)}
//                   className={`${
//                     onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''
//                   }`}
//                 >
//                   {columns.map((column, colIndex) => (
//                     <td
//                       key={`${rowIndex}-${column.accessor.toString()}`}
//                       ref={(el) => (bodyRefs.current[colIndex] = el)}
//                       className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
//                       style={{ width: headerWidths[colIndex] }}
//                     >
//                       {renderCell(column, item)}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>

//       {/* Footer */}
//       {footerContent && (
//         <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
//           {footerContent}
//         </div>
//       )}
//     </div>
//   );
// }
