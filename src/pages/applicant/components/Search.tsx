import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

function Search({
  setSearch,
  fetchApplicants,
}: {
  setSearch: (search: object) => void;
  fetchApplicants: (searchCriteria: object) => Promise<void>;
}) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      lastName: "",
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    await fetchApplicants(values);
    setSearch(values);
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
          <Button type="submit">Search</Button>
        </Group>
      </form>
    </>
  );
}

export default Search;
