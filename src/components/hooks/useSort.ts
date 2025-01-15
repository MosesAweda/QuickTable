import { useState, useMemo } from 'react';

export const useSort = (data: any[], sortBy: string | null, sortDirection: 'asc' | 'desc') => {
  const [sorting, setSorting] = useState({ column: sortBy, direction: sortDirection });

  const sortedData = useMemo(() => {
    if (!sorting.column) return data;
    return [...data].sort((a, b) => {
      const aVal = sorting.column ? a[sorting.column] : null;
      const bVal = sorting.column ? b[sorting.column] : null;
      if (aVal < bVal) return sorting.direction === 'asc' ? -1 : 1;
      if (aVal > bVal) return sorting.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [data, sorting]);

  const sort = (column: string) => {
    setSorting((prev) => ({
      column,
      direction: prev.column === column && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  return { sortedData, sorting, sort };
};
