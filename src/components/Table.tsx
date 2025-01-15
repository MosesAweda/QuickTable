import React from "react";
import { useSort } from "./hooks/useSort";
import { useFilter } from "./hooks/useFilter";
import { usePagination } from "./hooks/usePagination";
import Pagination from "./pagination";

interface TableProps {
  data: any[];
  columns: { key: string; label: string }[];
  rowsPerPageOptions?: number[];
}

const Table: React.FC<TableProps> = ({
  data,
  columns,
  rowsPerPageOptions = [10, 25, 50],
}) => {
  const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageOptions[0]);
  const { filter, filteredData, filterColumn, applyFilter, setFilterColumn } =
    useFilter(data, "name");
  const { sortedData, sort, sorting } = useSort(filteredData, null, "asc");
  const { currentPage, paginatedData, totalPages, navigate } = usePagination(
    sortedData,
    rowsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-4">
          <div className="flex gap-4 w-full">
            <input
              type="text"
              className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 dark:bg-gray-700 dark:text-white"
              placeholder={`Search ${
                columns.find((col) => col.key === filterColumn)?.label
              }...`}
              value={filter}
              onChange={(e) => applyFilter(e.target.value)}
            />
            <select
              value={filterColumn}
              onChange={(e) => setFilterColumn(e.target.value)}
              className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 dark:bg-gray-700 dark:text-white"
            >
              {columns.map((col) => (
                <option key={col.key} value={col.key}>
                  Search {col.label}
                </option>
              ))}
            </select>
          </div>
        </div>

       
        <div className="overflow-hidden">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-gray-700 dark:bg-gray-900 text-white">
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    onClick={() => sort(col.key)}
                    className="p-4 text-left font-semibold cursor-pointer hover:bg-gray-600 dark:hover:bg-gray-700 transition-colors relative"
                  >
                    <div className="flex items-center gap-2">
                      {col.label}
                      <span className="text-gray-300 dark:text-gray-500">
                        {sorting.column === col.key ? (
                          sorting.direction === "asc" ? (
                            <span className="inline-block w-3 h-3 ml-1">▲</span>
                          ) : (
                            <span className="inline-block w-3 h-3 ml-1">▼</span>
                          )
                        ) : (
                          <span className="inline-block w-3 h-3 ml-1 opacity-50">
                            ⇅
                          </span>
                        )}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedData.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className="p-4 dark:text-gray-200"
                    >
                      {row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
              {paginatedData.length === 0 && (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="text-center py-8 text-gray-500 dark:text-gray-400"
                  >
                    No data found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pb-4 px-3">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={rowsPerPageOptions}
            onRowsPerPageChange={setRowsPerPage}
            onPageChange={navigate}
          />
        </div>
      </div>
    </div>
  );
};

export default Table;
