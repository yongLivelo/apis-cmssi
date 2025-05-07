import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
} from "@tanstack/react-table";
import { useContext } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TableContext } from "../Applicant";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface UserTableProps {
  showValues?: boolean;
}

export default function SearchTable({ showValues = true }: UserTableProps) {
  const { data } = useContext(TableContext)!;

  const columnHelper = createColumnHelper<any>();

  const columns = [
    columnHelper.accessor("id", {
      header: () => "ID",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("firstName", {
      header: () => "First Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("applicationStatus", {
      header: () => "Application Status",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("lastName", {
      header: () => "Last Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("middleName", {
      header: () => "Middle Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("birthDate", {
      header: () => "Birth Date",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("city", {
      header: () => "City",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("province", {
      header: () => "Province",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("civilstatus", {
      header: () => "Civil Status",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("trainingStatus", {
      header: () => "Training Status",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("desiredPosition", {
      header: () => "Desired Position",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("height", {
      header: () => "Height",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("highSchoolGraduate", {
      header: () => "HS Graduate",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("collegeGraduate", {
      header: () => "College Graduate",
      cell: (info) => info.getValue(),
    }),
  ];

  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <ScrollArea className="w-full overflow-auto rounded-2xl border shadow-sm">
      <div className="min-w-[1200px]">
        <Table className="w-full text-left text-sm">
          <TableHeader className="sticky top-0 z-10 bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="px-4 py-2 font-medium text-gray-700"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
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
                  className="transition-colors hover:bg-gray-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="px-4 py-2 whitespace-nowrap text-gray-900"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="px-4 py-6 text-center text-gray-500"
                >
                  {showValues ? "No results found." : "No results."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
