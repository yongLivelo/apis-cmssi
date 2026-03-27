import { useForm } from "@mantine/form";
import {
  addApplicant,
  getApplicant,
  updateApplicant,
} from "@/services/applicantService.tsx";
import { Button, Group, Tabs, TextInput } from "@mantine/core";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { BsFillPeopleFill } from "react-icons/bs";

const ApplicantDetails = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  const fetchApplicantDetails = async () => {
    try {
      const editApplicant = await getApplicant(Number(id));
      form.setValues({
        lastName: editApplicant.lastName,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isEdit) {
      fetchApplicantDetails();
    }
  }, []);

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
    if (isEdit) {
      await updateApplicant(Number(id), values);
    } else {
      await addApplicant(values);
    }
    navigate("/applicant");
  };

  const FormComponent = () => {
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

  const TabComponent = () => {
    return (
      <>
        <Tabs defaultValue="gallery">
          <Tabs.List>
            <Tabs.Tab
              value="gallery"
              leftSection={<BsFillPeopleFill size={12} />}
            >
              Gallery
            </Tabs.Tab>
            <Tabs.Tab
              value="messages"
              leftSection={<BsFillPeopleFill size={12} />}
            >
              Messages
            </Tabs.Tab>
            <Tabs.Tab
              value="settings"
              leftSection={<BsFillPeopleFill size={12} />}
            >
              Settings
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="gallery">Gallery tab content</Tabs.Panel>

          <Tabs.Panel value="messages">Messages tab content</Tabs.Panel>

          <Tabs.Panel value="settings">Settings tab content</Tabs.Panel>
        </Tabs>
      </>
    );
  };
  return (
    <>
      <FormComponent />
      <TabComponent />
    </>
  );
};

export default ApplicantDetails;
