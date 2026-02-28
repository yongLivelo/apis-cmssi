import { Container, Paper, SimpleGrid } from "@mantine/core";
import Search from "@/pages/applicant/components/Search.tsx";
import Controls from "@/pages/applicant/components/Controls.tsx";
import Table from "@/pages/applicant/components/Table.tsx";
import { useState } from "react";
import { getApplicants } from "@/services/applicantService.tsx";

function Applicant() {
  const [selected, setSelected] = useState<any>();
  const [fetching, setFetching] = useState(false);
  const [allData, setAllData] = useState<any[]>([]);

  const fetchData = async () => {
    setFetching(true);
    try {
      const applicants = await getApplicants();
      setAllData(applicants);
      setFetching(false);
    } catch (err) {
      console.error("Error fetching applicants:", err);
    }
  };

  return (
    <>
      <Container>
        <SimpleGrid cols={1}>
          <Paper p="sm" bg="white" radius="sm">
            <Search fetchData={fetchData} />
          </Paper>
          <Paper p="sm" bg="white" radius="sm">
            <Controls fetchData={fetchData} selected={selected} />
          </Paper>
          <Paper p="sm" bg="white" radius="sm">
            <Table
              fetching={fetching}
              allData={allData}
              selected={selected}
              setSelected={setSelected}
            />
          </Paper>
        </SimpleGrid>
      </Container>
    </>
  );
}

export default Applicant;
