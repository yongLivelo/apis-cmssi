import { Container, Stack } from "@mantine/core";
import Form from "./components/Form";
import Table from "./components/Table";

function SearchApplicants() {
  return (
    <div>
      <Container>
        <Stack>
          <Form />
          <Table />
        </Stack>
      </Container>
    </div>
  );
}

export default SearchApplicants;
