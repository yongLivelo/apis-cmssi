"use client";

import * as React from "react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { deleteApplicant } from "@/services/applicantService";

interface Identifiable {
  id: string | number;
}

interface DataTableProps<TData extends Identifiable, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  showValues: boolean;
}

export function DataTable<TData extends Identifiable, TValue>({
  columns,
  data,
  showValues,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [tableData, setTableData] = React.useState<TData[]>(data);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    state: {
      sorting,
      rowSelection,
    },
  });

  // Export data to CSV
  /*  const exportToCSV = () => {
    const rows = table.getRowModel().rows.map((row) =>
      row.getVisibleCells().reduce(
        (acc, cell) => {
          const value = cell.getContext().getValue();
          acc[cell.column.id] = value !== undefined ? String(value) : "";
          return acc;
        },
        {} as Record<string, string>
      )
    );

    const csvContent = [
      columns.map((col) => col.id || col.accessorKey).join(","),
      ...rows.map((row) =>
        Object.values(row)
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "table_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }; */

  const handleBulkDelete = async () => {
    const selectedRows = table.getSelectedRowModel().rows;
    const confirmed = window.confirm(
      `Are you sure you want to delete ${selectedRows.length} user(s)?`
    );
    if (!confirmed) return;

    const selectedIds = selectedRows.map((row) => row.original.id);

    try {
      await Promise.all(
        selectedIds.map((id) => deleteApplicant(id.toString()))
      );

      const updatedData = tableData.filter(
        (row) => !selectedIds.includes(row.id)
      );
      setTableData(updatedData);
      setRowSelection({});
    } catch (error) {
      console.error("Bulk delete failed:", error);
    }
  };

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {showValues && table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {showValues ? "No results." : "No results"}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
