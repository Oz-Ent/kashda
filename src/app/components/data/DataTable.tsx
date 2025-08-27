"use client";

import React from "react";

interface Column<T = Record<string, unknown>> {
  key: string;
  title: string;
  render?: (value: unknown, row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T = Record<string, unknown>> {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
  className?: string;
}

const DataTable = <T extends Record<string, unknown>>({
  columns,
  data,
  emptyMessage = "No data available",
  className = "",
}: DataTableProps<T>) => {
  if (data.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-[#a0a0a0]">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full text-left text-[#e0e0e0]">
        <thead>
          <tr className="border-b border-gray-700">
            {columns.map((column) => (
              <th
                key={column.key}
                className={`py-2 px-4 text-sm font-semibold text-[#a0a0a0] ${
                  column.className || ""
                }`}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className="border-b border-gray-700 hover:bg-[#2a004a] transition-colors duration-200"
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className={`py-3 px-4 text-sm ${column.className || ""}`}
                >
                  {column.render
                    ? column.render(row[column.key], row)
                    : String(row[column.key] || "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
