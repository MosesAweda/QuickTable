import { useState, useMemo } from 'react';

export const useFilter = (data: any[], defaultColumn: string = 'name') => {
  const [filter, setFilter] = useState('');
  const [filterColumn, setFilterColumn] = useState<string>(defaultColumn);

  const filteredData = useMemo(() => {
    if (!filter) return data;
    return data.filter((item) => {
      const value = item[filterColumn];

      if (typeof value === 'string') {
        return value.toLowerCase().includes(filter.toLowerCase());
      } else if (typeof value === 'number') {
        return value.toString().includes(filter);
      }
      return false;
    });
  }, [data, filterColumn, filter]);

  const applyFilter = (query: string) => {
    setFilter(query);
  };

  const setColumn = (column: string) => {
    setFilterColumn(column);
    setFilter(''); 
  };

  return { 
    filteredData, 
    filter, 
    filterColumn, 
    applyFilter, 
    setFilterColumn: setColumn 
  };
};