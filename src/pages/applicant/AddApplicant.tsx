import { useForm } from "@mantine/form";
import { addApplicant } from "@/services/applicantService.tsx";
import { Button, Group, TextInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const AddApplicant = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      lastName: "",
    },

    validate: {
      lastName: (value: string) => (value ? null : "Invalid last name"),
    },
  });

  const navigate = useNavigate();

  const handleSubmit = async (values: typeof form.values) => {
    await addApplicant(values);
    navigate("/applicant");
  };

  return (
    <>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          withAsterisk
          label="Last Name"
          placeholder="Enter your last name"
          key={form.key("lastName")}
          {...form.getInputProps("lastName")}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </>
  );
};

export default AddApplicant;
