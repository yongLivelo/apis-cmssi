import {
  createInitialValues,
  FormField,
  generateValidations,
  type FormFieldConfig,
} from "@/components/FormField";
import {
  saveApplicant,
  deleteApplicantImage,
  downloadApplicantImage,
  getNextApplicantId,
  uploadApplicantImage,
} from "@/services/applicantService";
import {
  Button,
  Grid,
  GridCol,
  Group,
  LoadingOverlay,
  Paper,
  Stack,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const formFields: FormFieldConfig[][] = [
  [
    {
      id: "applicationId",
      label: "Application Id",
      type: "text",
      disabled: true,
    },
    {
      id: "age",
      label: "Age",
      type: "number",
    },
    {
      id: "birthDate",
      label: "Birth Date",
      type: "date",
    },
    {
      id: "sex",
      label: "Sex",
      type: "selection",
      selection: ["Male", "Female"],
    },
  ],
  [
    {
      id: "desiredPosition",
      label: "Desired Position",
      type: "selection",
      selection: ["Manager", "Supervisor", "Staff", "Executive"],
    },
    {
      id: "lastName",
      label: "Last Name",
      type: "text",
    },
    {
      id: "firstName",
      label: "First Name",
      type: "text",
    },
    {
      id: "middleName",
      label: "Middle Name",
      type: "text",
    },
  ],
  [
    {
      id: "applicationDate",
      label: "Application Date",
      type: "date",
    },
    {
      id: "applicationStatus",
      label: "Application Status",
      type: "selection",
      selection: ["Pending", "Approved", "Rejected"],
    },
    {
      id: "trainingStatus",
      label: "Training Status",
      type: "selection",
      selection: ["Not Started", "In Progress", "Completed"],
    },
  ],
  [
    {
      id: "image",
      label: "",
      type: "file-image",
    },
  ],
];

interface FormProps {
  applicant: object;
}
function Form({ applicant }: FormProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const initialValues = createInitialValues(formFields.flat());
  const form = useForm({
    mode: "uncontrolled",
    initialValues,
    validate: generateValidations(formFields.flat()),
  });

  const loadNextId = async () =>
    await getNextApplicantId().then((id) =>
      form.setFieldValue("applicationId", id),
    );

  const loadEditingApplicant = async () => {
    form.setValues(applicant);
    downloadApplicantImage((applicant as { id: number }).id).then((blob) => {
      const file = new File([blob], "image.jpg", { type: blob.type });
      form.setFieldValue("image", file);
    });
  };
  useEffect(() => {
    setLoading(true);
    try {
      if (applicant && "id" in applicant) {
        loadEditingApplicant();
      } else {
        loadNextId();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [applicant]);
  return (
    <Paper bg="dark" p="xl">
      <LoadingOverlay visible={loading} />
      <form
        onSubmit={form.onSubmit(
          async (values) => {
            try {
              setLoading(true);
              const payload = await saveApplicant({ ...values, image: null });
              if (values.image) {
                if (applicant) {
                  await deleteApplicantImage(payload.id);
                }
                const fd = new FormData();
                fd.append("file", values.image);
                await uploadApplicantImage(payload.id, fd);
              }
              notifications.show({
                title: "Success",
                message: `Applicant has been ${applicant ? "edited" : "added"} successfully`,
                color: "green",
                autoClose: 3000,
              });
              setLoading(false);
              navigate(`/applicants/edit/${payload.id}`);
            } catch {
              notifications.show({
                title: "Error",
                message: `Failed to ${applicant ? "edit" : "add"}applicant`,
                color: "red",
                autoClose: 3000,
              });
            }
          },
          () => {
            notifications.show({
              title: "Validation Error",
              message: "Please fill out all required fields",
              color: "red",
              autoClose: 3000,
            });
          },
        )}
      >
        <Grid>
          {formFields.map((column, index) => (
            <GridCol span={3} key={`applicantListFormColumn${index}`}>
              <Stack>
                {column.map((formField) => (
                  <FormField
                    key={formField.id}
                    form={form}
                    formField={formField}
                  />
                ))}
              </Stack>
            </GridCol>
          ))}

          <GridCol>
            <Group>
              <Button type="submit">{applicant ? "Edit" : "Add"}</Button>
              <Button
                disabled={applicant === null}
                onClick={() => {
                  console.log(applicant);
                  form.reset();
                  loadNextId();
                  navigate("/applicants/add");
                }}
              >
                Submit Another
              </Button>
            </Group>
          </GridCol>
        </Grid>
      </form>
    </Paper>
  );
}
export default Form;
