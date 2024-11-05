export interface Column<T> {
    header: string;
    accessor: keyof T;
    width?: string;
    render?: (value: T[keyof T], item: T) => React.ReactNode;
  }
  
  export interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
    footerContent?: React.ReactNode;
    maxHeight?: string;
    className?: string;
    onRowClick?: (item: T) => void;
    isLoading?: boolean;
    emptyMessage?: string;
  }