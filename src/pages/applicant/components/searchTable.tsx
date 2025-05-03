import {
  ColumnDef,
  CellContext,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useContext } from "react";
import { MoreHorizontal } from "lucide-react";
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

  const columns: ColumnDef<any>[] = [
    { accessorKey: "id", header: "ID" },
    { accessorKey: "firstName", header: "First Name" },
    { accessorKey: "applicationStatus", header: "Application Status" },
    { accessorKey: "lastName", header: "Last Name" },
    { accessorKey: "middleName", header: "Middle Name" },
    { accessorKey: "birthDate", header: "Birth Date" },
    { accessorKey: "city", header: "City" },
    { accessorKey: "province", header: "Province" },
    { accessorKey: "civilstatus", header: "Civil Status" },
    { accessorKey: "trainingStatus", header: "Training Status" },
    { accessorKey: "desiredPosition", header: "Desired Position" },
    { accessorKey: "height", header: "Height" },
    { accessorKey: "highSchoolGraduate", header: "Highschool Graduate" },
    { accessorKey: "collegeGraduate", header: "College Graduate" },
  ];

  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
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
  );
}
