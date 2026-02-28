import { Button, Group, Modal } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { deleteApplicant } from "@/services/applicantService.tsx";
import { useDisclosure } from "@mantine/hooks";

function Controls({
  selected = [],
  fetchData,
}: {
  selected: any[];
  fetchData: () => Promise<void>;
}) {
  const navigate = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);

  const handleDelete = async () => {
    try {
      await Promise.all(selected.map((item) => deleteApplicant(item.id)));
      await fetchData();
      close();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={`Are you sure to delete ${selected.length} ${selected.length === 1 ? "applicant" : "applicants"}`}
        centered
      >
        <Group gap="md">
          <Button color="red" onClick={handleDelete}>
            Delete
          </Button>
          <Button onClick={close}>Back</Button>
        </Group>
      </Modal>

      <Group gap="md">
        <Button onClick={() => navigate("/applicant/add")}>Add</Button>

        <Button disabled={selected.length < 1} onClick={open} color="red">
          Delete
        </Button>

        <Button
          onClick={() => navigate("/applicant/edit")}
          color="green"
          disabled={selected.length !== 1}
        >
          Edit
        </Button>
      </Group>
    </>
  );
}

export default Controls;
