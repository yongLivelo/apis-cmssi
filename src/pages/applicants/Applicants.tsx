import Controls from "@/pages/applicants/components/Controls";
import Search from "@/pages/applicants/components/Search";
import TableDisplay from "@/pages/applicants/components/TableDisplay";
import { Container, Stack } from "@mantine/core";

function Applicants() {
  return (
    <div>
      <Container>
        <Stack>
          <Search />
          <Controls />
          <TableDisplay />
        </Stack>
      </Container>
    </div>
  );
}

export default Applicants;
