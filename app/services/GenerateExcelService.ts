
import * as XLSX from "xlsx";

// Actualmente espera un objeto con la propiedad 'data', lo cambiamos para aceptar directamente un array
export function DownloadExcelService(data: []) {
    console.log("hoa{");
    
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Ventas");
  
    // Genera un archivo Excel y fuerza la descarga
    XLSX.writeFile(workbook, "ventas_supermercado.xlsx");
  }
  