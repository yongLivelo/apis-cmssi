import { Container, Stack } from "@mantine/core";
import Form from "./components/Form";
import Details from "./components/Details";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getApplicantById } from "@/services/applicantService";

function ApplicantForm() {
  const { id } = useParams();
  const [applicant, setApplicant] = useState<null | any>(null);
  useEffect(() => {
    console.log(id);
    if (!id) {
      setApplicant(null);
      return;
    }
    const loadApplicant = async () => {
      setApplicant(await getApplicantById(parseInt(id)));
    };
    loadApplicant();
  }, [id]);
  return (
    <div>
      <Container>
        <Stack>
          <Form applicant={applicant} />
          <Details />
        </Stack>
      </Container>
    </div>
  );
}

export default ApplicantForm;
