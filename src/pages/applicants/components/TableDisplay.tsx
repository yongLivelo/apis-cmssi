import { Paper } from "@mantine/core";
import { DataTable } from "mantine-datatable";

function TableDisplay() {
  return (
    <Paper p="xl" bg="blue.1">
      <DataTable columns={[{ accessor: "id", title: "#" }]} />
    </Paper>
  );
}

export default TableDisplay;
