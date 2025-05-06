import * as React from "react";
import {
  ColumnDef,
  CellContext,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { SortingState } from "@tanstack/react-table";
import { useContext } from "react";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteApplicant } from "@/services/applicantService.tsx";
import { TableContext } from "../Applicant"; // adjust the path accordingly
import SearchType from "@/types/Applicant.type";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

// Type for the user data
export type User = {
  id: number;
  firstName: string;
  applicationStatus: string;
  lastName: string;
  middleName: string;
  status: string;
  birthDate: string;
  city: string;
  province: string;
  civilstatus: string;
  trainingStatus: string;
  desiredPosition: string;
  height: number;
  highSchoolGraduate: boolean;
  collegeGraduate: boolean;
  actions?: React.ReactNode;
};

interface UserTableProps {
  showValues?: boolean;
}

export default function SearchTable({ showValues = true }: UserTableProps) {
  const { data } = useContext(TableContext)!;
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
        </Button>
      ),
    },
    {
      accessorKey: "firstName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          First Name
        </Button>
      ),
    },
    {
      accessorKey: "applicationStatus",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Application Status
        </Button>
      ),
    },
    {
      accessorKey: "lastName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Name
        </Button>
      ),
    },
    {
      accessorKey: "middleName",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Middle Name
        </Button>
      ),
    },
    {
      accessorKey: "birthDate",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Birth Date
        </Button>
      ),
    },
    {
      accessorKey: "city",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          City
        </Button>
      ),
    },
    {
      accessorKey: "province",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Province
        </Button>
      ),
    },
    {
      accessorKey: "civilstatus",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Civil Status
        </Button>
      ),
    },
    {
      accessorKey: "trainingStatus",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Training Status
        </Button>
      ),
    },
    {
      accessorKey: "desiredPosition",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Desired Position
        </Button>
      ),
    },
    {
      accessorKey: "height",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Height
        </Button>
      ),
    },
    {
      accessorKey: "highSchoolGraduate",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Highschool Graduate
        </Button>
      ),
    },
    {
      accessorKey: "collegeGraduate",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          College Graduate
        </Button>
      ),
    },
  ];

  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div>
      <ScrollArea className="h-96 w-full">
        <div className="overflow-x-auto rounded-md border">
          <Table>
            <ScrollBar orientation="horizontal" />
            <TableHeader className="sticky top-0 w-full">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
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
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
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
                    className="h-24 text-center"
                  >
                    {showValues ? "No results." : "No results"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>

      {/* Pagination Controls */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
