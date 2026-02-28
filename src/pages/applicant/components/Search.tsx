import { Button, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

function Search({ fetchData }: { fetchData: () => Promise<void> }) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      lastName: "",
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    console.log(values);
    // Will be improved on later
    // Add server side filtering
    fetchData();
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
