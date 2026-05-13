import { Button, Group, Paper } from "@mantine/core";
import { DataTable } from "mantine-datatable";

function Table() {
  return (
    <Paper p="xl" bg="dark">
      <Group>
        <Button>PDF</Button>
        <Button>CSV</Button>
        <Button>Delete</Button>
        <Button>Edit</Button>
        <Button>View</Button>
      </Group>
      <DataTable columns={[{ accessor: "id", title: "#" }]} />
    </Paper>
  );
}

export default Table;
