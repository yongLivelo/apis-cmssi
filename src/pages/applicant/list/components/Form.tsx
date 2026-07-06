import {
  createInitialValues,
  FormField,
  type FormFieldConfig,
} from "@/components/FormField";
import { searchApplicants } from "@/services/applicantService";
import { Button, Grid, GridCol, Paper, Stack } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";

const formFields: FormFieldConfig[][] = [
  [
    { id: "lastName", label: "Last Name", type: "text" },
    { id: "firstName", label: "First Name", type: "text" },
    { id: "middleName", label: "Middle Name", type: "text" },
    { id: "age", label: "Age", type: "number-range", disabled: true },
    {
      id: "birthDate",
      label: "Birth Date",
      type: "date-range",
      disabled: true,
    },
    {
      id: "religion",
      label: "Religion",
      type: "selection",
      selection: [
        "Roman Catholic",
        "Iglesia ni Cristo",
        "Muslim",
        "Born Again",
      ],
      disabled: true,
    },
  ],

  [
    { id: "applicationId", label: "Applicantion Id", type: "text" },
    {
      id: "status",
      label: "Status",
      type: "selection",
      selection: ["Single", "Married"],
      disabled: true,
    },
    {
      id: "applicationDate",
      label: "Application Date",
      type: "date-range",
      disabled: true,
    },
    {
      id: "trainingStatus",
      label: "Training Status",
      type: "selection",
      selection: ["Not Started", "In Progress", "Completed"],
    },
    {
      id: "desiredPosition",
      label: "Desired Position",
      type: "selection",
      selection: ["Manager", "Supervisor", "Staff", "Executive"],
    },
  ],

  [
    {
      id: "city",
      label: "City/Municipality",
      type: "selection",
      selection: [
        "Antipolo",
        "Baguio",
        "Cebu City",
        "Davao City",
        "Manila",
        "Quezon City",
        "Taguig",
      ],
      disabled: true,
    },
    {
      id: "province",
      label: "Metro Manila/Province",
      type: "selection",
      selection: ["NCR", "Benguet", "Cebu", "Davao del Sur", "Laguna", "Rizal"],
      disabled: true,
    },
    {
      id: "height",
      label: "Height",
      type: "number-range",
      disabled: true,
    },
    {
      id: "isHighschoolGraduate",
      label: "Highschool Graduate",
      type: "checkbox",
      disabled: true,
    },
    {
      id: "isCollegeGraduate",
      label: "College Graduate",
      type: "checkbox",

      disabled: true,
    },
  ],
];

interface FormProps {
  setRecords: (records: any[]) => void;
  setFetching: (loading: boolean) => void;
}
export default function Form({ setRecords, setFetching }: FormProps) {
  const initialValues = createInitialValues(formFields.flat());
  const form = useForm({
    mode: "uncontrolled",
    initialValues,
  });
  return (
    <Paper bg="dark" p="xl">
      <form
        onSubmit={form.onSubmit(
          async (values) => {
            setFetching(true);
            try {
              const sanitizedValues = Object.entries(values).reduce<
                Record<string, unknown>
              >((acc, [key, value]) => {
                if (value === "" || typeof value === "object") {
                  acc[key] = null;
                } else {
                  acc[key] = value;
                }

                return acc;
              }, {});
              const applicants = await searchApplicants(sanitizedValues);
              setFetching(false);
              setRecords(applicants);
              notifications.show({
                title: "Success",
                message: "Search completed successfully",
                color: "green",
                autoClose: 3000,
              });
            } catch {
              notifications.show({
                title: "Error",
                message: "Failed to search applicants",
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
            <GridCol span={4} key={`applicantListFormColumn${index}`}>
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
            <Button type="submit">Search</Button>
          </GridCol>
        </Grid>
      </form>
    </Paper>
  );
}
