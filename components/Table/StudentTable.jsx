import React, { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  getSortedRowModel,
} from '@tanstack/react-table';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ArrowUpDown } from 'lucide-react';

const StudentTable = ({ data }) => {
  const [sorting, setSorting] = useState([]);
  
  const columns = useMemo(() => [
    { header: 'ID', accessorKey: 'Student_ID' },
    { header: 'Branch', accessorKey: 'Branch' },
    { header: 'Tier', accessorKey: 'College_Tier' },
    { 
      header: 'CGPA', 
      accessorKey: 'CGPA',
      cell: info => <span className="font-medium">{info.getValue()}</span>
    },
    { 
      header: 'Coding', 
      accessorKey: 'Coding_Score' 
    },
    { 
      header: 'Status', 
      accessorKey: 'Placement_Status',
      cell: info => {
        const status = info.getValue();
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${status === 'Placed' ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
            {status === 'Placed' ? '🟢 Placed' : '🔴 Not Placed'}
          </span>
        )
      }
    },
    { 
      header: 'Package (LPA)', 
      accessorKey: 'Salary_Package',
      cell: info => {
        const val = info.getValue();
        return val > 0 ? `₹${val} 🏆` : '-';
      }
    }
  ], []);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: { pageSize: 20 },
    },
  });

  return (
    <div className="glass-card flex flex-col overflow-hidden">
      <div className="p-5 border-b border-border flex justify-between items-center">
        <h3 className="text-lg font-semibold">Student Database</h3>
        <span className="text-sm text-textSecondary bg-surface px-3 py-1 rounded-full border border-border">
          {data.length.toLocaleString()} Records
        </span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-textSecondary">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th 
                    key={header.id} 
                    className="px-6 py-4 font-medium cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-2">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && <ArrowUpDown className="w-3 h-3 opacity-50" />}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="divide-y divide-border">
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map(row => (
                <tr key={row.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-6 py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-textSecondary">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <span className="text-4xl">😕</span>
                    <p className="font-medium">No students found</p>
                    <p className="text-xs">Try changing filters.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="p-4 border-t border-border flex items-center justify-between bg-slate-50/30 dark:bg-slate-900/30">
        <div className="flex items-center gap-2 text-sm text-textSecondary">
          <span>
            Page <span className="font-medium text-text">{table.getState().pagination.pageIndex + 1}</span> of{' '}
            <span className="font-medium text-text">{table.getPageCount()}</span>
          </span>
          <select
            value={table.getState().pagination.pageSize}
            onChange={e => table.setPageSize(Number(e.target.value))}
            className="bg-transparent border border-border rounded px-2 py-1 ml-2 focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {[20, 50, 100].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center gap-1">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="p-2 rounded-lg border border-border disabled:opacity-50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ChevronsLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="p-2 rounded-lg border border-border disabled:opacity-50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="p-2 rounded-lg border border-border disabled:opacity-50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="p-2 rounded-lg border border-border disabled:opacity-50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ChevronsRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentTable;
