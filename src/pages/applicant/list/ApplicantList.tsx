import { Container, Stack } from "@mantine/core";
import Form from "./components/Form";
import Table from "./components/Table";
import { useState } from "react";

function ApplicantList() {
  const [records, setRecords] = useState<unknown[]>([]);
  const [fetching, setFetching] = useState<boolean>(false);
  return (
    <Container>
      <Stack>
        <Form setRecords={setRecords} setFetching={setFetching} />
        <Table
          setRecords={setRecords}
          records={records}
          fetching={fetching}
          setFetching={setFetching}
        />
      </Stack>
    </Container>
  );
}

export default ApplicantList;
