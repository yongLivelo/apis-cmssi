import { Button, Group, Modal, Paper, Stack, Text } from "@mantine/core";
import { useState } from "react";
import { DataTable, type DataTableColumn } from "mantine-datatable";
import { Link } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import {
  deleteApplicant,
  deleteApplicantImage,
} from "@/services/applicantService";
import { exportToCsv, exportToPdf } from "@/utils/export";

const columns: DataTableColumn<any>[] = [
  { accessor: "lastName", title: "Last Name" },
  { accessor: "firstName", title: "First Name" },
  { accessor: "middleName", title: "Middle Name" },
  { accessor: "age", title: "Age" },
  { accessor: "birthDate", title: "Birth Date" },
  { accessor: "religion", title: "Religion" },
  { accessor: "applicationId", title: "Application Id" },
  { accessor: "status", title: "Status" },
  { accessor: "applicationDate", title: "Application Date" },
  { accessor: "trainingStatus", title: "Training Status" },
  { accessor: "desiredPosition", title: "Desired Position" },
  { accessor: "city", title: "City/Municipality" },
  { accessor: "province", title: "Metro Manila/Province" },
  { accessor: "height", title: "Height" },
  { accessor: "isHighschoolGraduate", title: "Highschool Graduate" },
  { accessor: "isCollegeGraduate", title: "College Graduate" },
];

interface TableProps {
  records: any[];
  setRecords: (records: any[]) => void;
  fetching: boolean;
  setFetching: (fetching: boolean) => void;
}

function DeleteModal({
  opened,
  close,
  applicationId,
  onConfirm,
}: {
  opened: boolean;
  close: () => void;
  applicationId: string;
  onConfirm: () => void;
}) {
  return (
    <Modal
      opened={opened}
      onClose={close}
      title={
        <Text fw={700}>
          Are you sure you want to delete Applicant {applicationId}?
        </Text>
      }
    >
      <Group justify="flex-end" mt="md">
        <Button variant="default" onClick={close}>
          No
        </Button>
        <Button color="red" onClick={onConfirm}>
          Yes
        </Button>
      </Group>
    </Modal>
  );
}

function Table({ records, setRecords, fetching, setFetching }: TableProps) {
  const [selectedRecord, setSelectedRecord] = useState<any[]>([]);
  const [opened, { open, close }] = useDisclosure(false);

  const handleDelete = async () => {
    try {
      setFetching(true);
      if (selectedRecord[0]?.id) {
        await deleteApplicantImage(selectedRecord[0].id);
      }
      await deleteApplicant(selectedRecord[0]?.id);
      setRecords(records.filter((r) => r.id !== selectedRecord[0]?.id));
      setSelectedRecord([]);
      close();
    } catch {
      close();
    } finally {
      setFetching(false);
    }
  };

  return (
    <Paper p="xl" bg="dark">
      <Stack>
        <Group>
          <Button
            disabled={records.length === 0}
            onClick={() =>
              exportToPdf(
                records,
                columns as { accessor: string | number; title: any }[],
                "applicants.pdf",
              )
            }
          >
            PDF
          </Button>
          <Button
            disabled={records.length === 0}
            onClick={() =>
              exportToCsv(
                records,
                columns as { accessor: string | number; title: any }[],
                "applicants.csv",
              )
            }
          >
            CSV
          </Button>
        </Group>
        <Group>
          <Button
            color="red"
            disabled={selectedRecord.length === 0}
            onClick={open}
          >
            Delete
          </Button>
          <Button
            color="yellow"
            disabled={selectedRecord.length === 0}
            component={Link}
            to={`/applicants/edit/${selectedRecord[0]?.id}/`}
          >
            Edit
          </Button>
          <Button color="green" component={Link} to="/applicants/add/">
            Add
          </Button>
        </Group>

        <DataTable
          fetching={fetching}
          records={records}
          selectedRecords={selectedRecord}
          onSelectedRecordsChange={(records) => {
            setSelectedRecord(records.slice(-1));
          }}
          columns={columns}
        />

        <DeleteModal
          opened={opened}
          close={close}
          applicationId={selectedRecord[0]?.applicationId}
          onConfirm={handleDelete}
        />
      </Stack>
    </Paper>
  );
}

export default Table;
