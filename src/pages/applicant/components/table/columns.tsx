"use client";

import { ColumnDef, CellContext } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { ReactNode } from "react";

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
  deleteApplicant
} from "@/services/applicantService.tsx";

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

  actions?: ReactNode;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "applicationStatus",
    header: "Application Status",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "middleName",
    header: "Middle Name",
  },
  {
    accessorKey: "birthDate",
    header: "Birth Date",
  },
  {
    accessorKey: "city",
    header: "City",
  },
  {
    accessorKey: "province",
    header: "Province",
  },
  {
    accessorKey: "civilStatus",
    header: "Civil Status",
  },
  {
    accessorKey: "trainingStatus",
    header: "Training Status",
  },
  {
    accessorKey: "desiredPosition",
    header: "Desired Position",
  },
  {
    accessorKey: "height",
    header: "Height",
  },
  {
    accessorKey: "highSchoolGraduate",
    header: "Highschool Graduate",
  },
  {
    accessorKey: "collegeGraduate",
    header: "College Graduate",
  },
  {
    id: "actions",
    cell: ({ row }: CellContext<User, unknown>) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.id.toString())}
            >
              Copy User ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={()=> {
              deleteApplicant(`${user.id}`).then(r => console.log(r))
            }}>Delete</DropdownMenuItem>
            <DropdownMenuItem>View Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
