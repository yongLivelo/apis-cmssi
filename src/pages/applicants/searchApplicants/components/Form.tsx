import {
  Button,
  Checkbox,
  Grid,
  Group,
  NumberInput,
  Paper,
  Select,
  TextInput,
  type ComboboxData,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm, type UseFormReturnType } from "@mantine/form";

interface FormFieldConfig {
  id: string;
  label: string;
  type: "text" | "range" | "checkbox" | "selection" | "date-range";
  selection?: string[];
}

const formFields: FormFieldConfig[] = [
  { id: "lastName", label: "Last Name", type: "text" },
  { id: "firstName", label: "First Name", type: "text" },
  { id: "middleName", label: "Middle Name", type: "text" },
  { id: "age", label: "Age", type: "range" },
  { id: "birthDate", label: "Birth Date", type: "date-range" },
  {
    id: "religion",
    label: "Religion",
    type: "selection",
    selection: ["Roman Catholic", "Islam"],
  },

  { id: "applicantNumber", label: "Applicant Number", type: "range" },
  {
    id: "status",
    label: "Status",
    type: "selection",
    selection: ["Single", "Married"],
  },
  {
    id: "applicationDate",
    label: "Application Date",
    type: "date-range",
  },
  {
    id: "trainingStatus",
    label: "Training Status",
    type: "selection",
    selection: ["trained", "very trained", "not trained"],
  },
  {
    id: "desiredPosition",
    label: "Desired Position",
    type: "selection",
    selection: ["Manager", "Ewan", "Di ko alam"],
  },

  {
    id: "city",
    label: "City/Municipality",
    type: "selection",
    selection: ["Antipolo", "Baguio"],
  },
  {
    id: "province",
    label: "Metro Manila/Province",
    type: "selection",
    selection: ["Manila", "Rizal", "Benguet"],
  },
  {
    id: "height",
    label: "Height",
    type: "range",
  },
  {
    id: "isHighschoolGraduate",
    label: "Highschool Graduate",
    type: "checkbox",
  },
  {
    id: "isCollegeGraduate",
    label: "College Graduate",
    type: "checkbox",
  },
];
function Form() {
  const initialValues = formFields.reduce<Record<string, any>>((acc, field) => {
    if (field.type === "range") {
      acc[field.id] = [0, 0];
    } else {
      acc[field.id] = undefined;
    }
    return acc;
  }, {});

  const form = useForm({
    mode: "uncontrolled",
    initialValues,
  });

  return (
    <Paper p="xl" bg="dark">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Grid>
          {formFields.map((formField) => {
            return (
              <Grid.Col span={4} key={formField.id}>
                <FormField form={form} formField={formField} />
              </Grid.Col>
            );
          })}
          <Grid.Col>
            <Button type="submit">Submit</Button>
          </Grid.Col>
        </Grid>
      </form>
    </Paper>
  );
}

interface FormFieldProps {
  form: UseFormReturnType<any>;
  formField: FormFieldConfig;
}

function FormField({ form, formField }: FormFieldProps) {
  switch (formField.type) {
    case "text":
      return (
        <TextInput
          label={formField.label}
          key={form.key(formField.id)}
          {...form.getInputProps(formField.id)}
        />
      );
    case "range":
      return (
        <Group grow>
          <NumberInput
            label={formField.label}
            key={form.key(`${formField.id}.0`)}
            {...form.getInputProps(`${formField.id}.0`)}
          />
          <NumberInput
            mt="24"
            key={form.key(`${formField.id}.1`)}
            {...form.getInputProps(`${formField.id}.1`)}
          />
        </Group>
      );
    case "selection":
      return (
        <Select
          label={formField.label}
          data={formField.selection as ComboboxData}
          key={form.key(formField.id)}
          {...form.getInputProps(formField.id)}
        />
      );
    case "checkbox":
      return (
        <Checkbox
          label={formField.label}
          key={form.key(formField.id)}
          {...form.getInputProps(formField.id)}
        />
      );
    case "date-range":
      return (
        <DatePickerInput
          allowSingleDateInRange
          type="range"
          label={formField.label}
          key={form.key(formField.id)}
          {...form.getInputProps(formField.id)}
        />
      );
    default:
      return null;
  }
}

export default Form;
