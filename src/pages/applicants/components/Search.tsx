import { Button, Group, Paper, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

function Search() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
    },
  });

  return (
    <Paper shadow="xs" p="xl" bg="blue.1">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          withAsterisk
          label="Name"
          placeholder="Input your name"
          key={form.key("name")}
          {...form.getInputProps("name")}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Paper>
  );
}

export default Search;
