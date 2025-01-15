import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  rowsPerPageOptions: number[];
  onRowsPerPageChange: (rows: number) => void;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  rowsPerPage,
  rowsPerPageOptions,
  onRowsPerPageChange,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showAround = 1; // Number of pages to show around current page
    
    // Always show first page
    pages.push(1);
    
    if (currentPage > 3) {
      pages.push('...');
    }
    
    // Pages around current page
    for (let i = Math.max(2, currentPage - showAround); 
         i <= Math.min(totalPages - 1, currentPage + showAround); 
         i++) {
      if (i === currentPage - showAround && i > 2) {
        pages.push('...');
      }
      pages.push(i);
      if (i === currentPage + showAround && i < totalPages - 1) {
        pages.push('...');
      }
    }
    
  
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className="flex justify-between items-center mt-4 space-x-4 text-sm text-gray-600">
    
      <div>
        <label className="mr-2">Rows per page:</label>
        <select
          className="border rounded-md px-2 py-1"
          value={rowsPerPage}
          onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
        >
          {rowsPerPageOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <button
          className={`px-2 py-1 rounded-md ${
            currentPage === 1 ? "text-gray-300 cursor-not-allowed" : "hover:bg-gray-100"
          }`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ←
        </button>
        
        {getPageNumbers().map((page, index) => (
          typeof page === 'string' ? (
            <span key={`ellipsis-${index}`} className="px-2">
              {page}
            </span>
          ) : (
            <button
              key={page}
              className={`px-2 py-1 rounded-md ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          )
        ))}
        
        <button
          className={`px-2 py-1 rounded-md ${
            currentPage === totalPages
              ? "text-gray-300 cursor-not-allowed"
              : "hover:bg-gray-100"
          }`}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default Pagination;