"use client";

import { ColumnDef } from "@tanstack/react-table";

export type User = {
  id: string;
  firstName: string;
  password: string;
};

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "firstName",
    header: "FirstName",
  },
];
