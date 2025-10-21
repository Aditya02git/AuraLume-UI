import React, { useState, useMemo, useEffect, useRef } from 'react';
import './DataTable.css';

const DataTable = ({
  data = [],
  columns = [],
  sortable = true,
  searchable = false,
  className = '',
  rowsPerPage = 10,
  pagination = false,
  onRowClick = null,
  loading = false,
  emptyMessage = 'No data available',
  theme = 'datatable-light', // 'datatable-light', 'datatable-dark'
  color = '#3b82f6',
  ...props
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const containerRef = useRef(null);

  // Function to convert hex to RGB
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  // Function to lighten/darken color
  const adjustColor = (hex, percent) => {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
    
    const adjust = (value) => {
      const adjusted = value + (255 - value) * (percent / 100);
      return Math.min(255, Math.max(0, Math.round(adjusted)));
    };
    
    if (percent > 0) {
      return `#${adjust(rgb.r).toString(16).padStart(2, '0')}${adjust(rgb.g).toString(16).padStart(2, '0')}${adjust(rgb.b).toString(16).padStart(2, '0')}`;
    } else {
      const darken = (value) => {
        const darkened = value * (1 + percent / 100);
        return Math.min(255, Math.max(0, Math.round(darkened)));
      };
      return `#${darken(rgb.r).toString(16).padStart(2, '0')}${darken(rgb.g).toString(16).padStart(2, '0')}${darken(rgb.b).toString(16).padStart(2, '0')}`;
    }
  };

  // Generate color variants
  useEffect(() => {
    if (!containerRef.current) return;
    
    const rgb = hexToRgb(color);
    
    // Set CSS custom properties on the container
    containerRef.current.style.setProperty('--dt-primary', color);
    containerRef.current.style.setProperty('--dt-primary-hover', adjustColor(color, -15));
    containerRef.current.style.setProperty('--dt-primary-light', `rgba(${rgb?.r || 0}, ${rgb?.g || 0}, ${rgb?.b || 0}, 0.1)`);
  }, [color]);

  // Helper function to get nested object values (MUST be before useMemo calls)
  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((value, key) => value?.[key], obj);
  };

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      const aValue = getNestedValue(a, sortConfig.key);
      const bValue = getNestedValue(b, sortConfig.key);

      // Handle different data types
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      if (aValue instanceof Date && bValue instanceof Date) {
        return sortConfig.direction === 'asc' 
          ? aValue.getTime() - bValue.getTime() 
          : bValue.getTime() - aValue.getTime();
      }

      // String comparison
      const aStr = String(aValue || '').toLowerCase();
      const bStr = String(bValue || '').toLowerCase();
      
      if (sortConfig.direction === 'asc') {
        return aStr.localeCompare(bStr);
      } else {
        return bStr.localeCompare(aStr);
      }
    });
  }, [data, sortConfig]);

  // Filter data based on search
  const filteredData = useMemo(() => {
    if (!searchTerm) return sortedData;

    return sortedData.filter(row =>
      columns.some(column => {
        const value = getNestedValue(row, column.key);
        return String(value || '').toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [sortedData, searchTerm, columns]);

  // Paginate data
  const paginatedData = useMemo(() => {
    if (!pagination) return filteredData;

    const startIndex = (currentPage - 1) * rowsPerPage;
    return filteredData.slice(startIndex, startIndex + rowsPerPage);
  }, [filteredData, currentPage, rowsPerPage, pagination]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  // Handle sorting
  const handleSort = (key) => {
    if (!sortable) return;

    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  // Render cell content
  const renderCellContent = (row, column) => {
    const value = getNestedValue(row, column.key);
    
    if (column.render && typeof column.render === 'function') {
      return column.render(value, row);
    }

    if (column.type === 'date' && value instanceof Date) {
      return value.toLocaleDateString();
    }

    if (column.type === 'currency' && typeof value === 'number') {
      return new Intl.NumberFormat('en-US', { 
        style: 'currency', 
        currency: 'USD' 
      }).format(value);
    }

    if (column.type === 'number' && typeof value === 'number') {
      return value.toLocaleString();
    }

    return value || '';
  };

  // Get sort icon (UPDATED - Unicode version)
  const getSortIcon = (columnKey) => {
    if (!sortable || sortConfig.key !== columnKey) {
      return <span className="datatable__sort-icon datatable__sort-icon--inactive">
        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 20V7m0 13-4-4m4 4 4-4m4-12v13m0-13 4 4m-4-4-4 4"/>
        </svg>
      </span>;
    }

    return sortConfig.direction === 'asc' 
      ? <span className="datatable__sort-icon datatable__sort-icon--active">
        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v13m0-13 4 4m-4-4-4 4"/>
        </svg>
      </span>
      : <span className="datatable__sort-icon datatable__sort-icon--active">
        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19V5m0 14-4-4m4 4 4-4"/>
        </svg>
      </span>;
  };

  if (loading) {
    return (
      <div ref={containerRef} className={`datatable ${theme} ${className}`} {...props}>
        <div className="datatable__loading">
          <span className="datatable__spinner">⟳</span>
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`datatable ${theme} ${className}`} {...props}>
      {searchable && (
        <div className="datatable__search">
          <div className="datatable__search-input">
            <span className="datatable__search-icon">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="18" 
                  height="18" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  viewBox="0 0 24 24" 
                  aria-hidden="true"
                  className={className}
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </span>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="datatable__input"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="datatable__search-clear"
                type="button"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}

      <div className="datatable__container">
        <table className="datatable__table" role="grid">
          <thead className="datatable__head">
            <tr className="datatable__row datatable__row--header" role="row">
              {columns.map((column, index) => (
                <th
                  key={column.key || index}
                  className={`datatable__header ${sortable && column.sortable !== false ? 'datatable__header--sortable' : ''}`}
                  onClick={() => column.sortable !== false && handleSort(column.key)}
                  role="columnheader"
                  aria-sort={
                    sortConfig.key === column.key 
                      ? sortConfig.direction === 'asc' ? 'ascending' : 'descending'
                      : 'none'
                  }
                >
                  <div className="datatable__header-content">
                    <span>{column.label || column.key}</span>
                    {sortable && column.sortable !== false && getSortIcon(column.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="datatable__body">
            {paginatedData.length === 0 ? (
              <tr className="datatable__row datatable__row--empty" role="row">
                <td 
                  className="datatable__cell datatable__cell--empty" 
                  colSpan={columns.length}
                  role="gridcell"
                >
                  <div className="datatable__empty">
                    <span className="datatable__empty-icon">📭</span>
                    <span>{emptyMessage}</span>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <tr
                  key={row.id || rowIndex}
                  className={`datatable__row datatable__row--data ${onRowClick ? 'datatable__row--clickable' : ''}`}
                  onClick={() => onRowClick && onRowClick(row, rowIndex)}
                  role="row"
                >
                  {columns.map((column, colIndex) => (
                    <td
                      key={`${column.key}-${colIndex}`}
                      className="datatable__cell"
                      role="gridcell"
                    >
                      {renderCellContent(row, column)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination && totalPages > 1 && (
        <div className="datatable__pagination">
          <div className="datatable__pagination-info">
            Showing {((currentPage - 1) * rowsPerPage) + 1} to {Math.min(currentPage * rowsPerPage, filteredData.length)} of {filteredData.length} entries
          </div>
          
          <div className="datatable__pagination-controls">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="datatable__pagination-btn datatable__pagination-btn--first"
              type="button"
            >
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m17 16-4-4 4-4m-6 8-4-4 4-4"/>
              </svg>
            </button>
            
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="datatable__pagination-btn datatable__pagination-btn--prev"
              type="button"
            >
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m15 19-7-7 7-7"/>
              </svg>
            </button>

            <div className="datatable__pagination-pages">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNumber;
                if (totalPages <= 5) {
                  pageNumber = i + 1;
                } else if (currentPage <= 3) {
                  pageNumber = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i;
                } else {
                  pageNumber = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`datatable__pagination-btn datatable__pagination-btn--page ${
                      currentPage === pageNumber ? 'datatable__pagination-btn--active' : ''
                    }`}
                    type="button"
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="datatable__pagination-btn datatable__pagination-btn--next"
              type="button"
            >
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m9 5 7 7-7 7"/>
              </svg>
            </button>
            
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="datatable__pagination-btn datatable__pagination-btn--last"
              type="button"
            >
              <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m7 16 4-4-4-4m6 8 4-4-4-4"/>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataTable;