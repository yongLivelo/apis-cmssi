import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DatePickerDemo } from "@/components/ui/datepicker";
import { addApplicant } from "@/services/applicantService";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
type FormFields = Array<{
  name: string;
  label: string;
  type: string;
  placeholder: string;
  description: string;
  selection?: string[];
}>;
const formSchema = z.object<any>({
  applicationDate: z.string().nonempty("Application Date is required"),
  applicantId: z.preprocess(
    (val) => Number(val),
    z.number().min(1, "Application No. must be greater than 0"),
  ),
  age: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Age must be a positive number"),
  ),
  birthDateFrom: z.string().nonempty("Date of Birth is required"),
  sex: z.string().nonempty("Sex is required"),
  desiredPosition: z.string().nonempty("Desired Position is required"),
  lastName: z.string().nonempty("Surname is required"),
  firstName: z.string().nonempty("First Name is required"),
  middleName: z.string().optional(),
  applicationStatus: z.string().nonempty("Application Status is required"),
  trainingStatus: z.string().nonempty("Training Status is required"),
});

const formFields: FormFields = [
  {
    name: "applicationDate",
    label: "Application Date",
    type: "date",
    placeholder: "Enter your password",
    description: "This is your account password.",
  },
  {
    name: "applicantId",
    label: "Application No.",
    type: "number",
    placeholder: "",
    description: "",
  },
  {
    name: "age",
    label: "Age",
    type: "number",
    placeholder: "",
    description: "",
  },
  {
    name: "birthDateFrom",
    label: "Date of Birth",
    type: "date",
    placeholder: "",
    description: "",
  },
  {
    name: "sex",
    label: "Sex",
    type: "select",
    placeholder: "",
    description: "",
    selection: ["male", "felame"],
  },
  {
    name: "desiredPosition",
    label: "Desired Position",
    type: "text",
    placeholder: "",
    description: "",
  },
  {
    name: "lastName",
    label: "Surname",
    type: "text",
    placeholder: "",
    description: "",
  },
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "",
    description: "",
  },
  {
    name: "middleName",
    label: "Middle Name",
    type: "text",
    placeholder: "",
    description: "",
  },
  {
    name: "applicationStatus",
    label: "Application Status",
    type: "text",
    placeholder: "",
    description: "",
  },
  {
    name: "trainingStatus",
    label: "Training Status",
    type: "text",
    placeholder: "",
    description: "",
  },
];

export default function ApplicantForm() {
  const navigate = useNavigate();
  // Initialize the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });
  const {
    reset,
    formState: { isSubmitting },
  } = form; // Destructure reset and isSubmitting together
  // // Submit handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await addApplicant(values);
      handleToast(String(response.message));
      navigate("/applicants");
    } catch (error) {
      handleToast(String(error));
    } finally {
      reset();
    }
  }

  function handleToast(message: string) {
    toast(message, {
      action: {
        label: "Undo",
        onClick: () => console.log("Undo"),
      },
    });
  }

  return (
    <div className="h-screen w-full bg-gray-100">
      <div>
        <Form {...form}>
          <form
            id="applicantForm"
            onSubmit={form.handleSubmit(onSubmit)}
            className="m-4 grid grid-cols-4 gap-4 space-y-4 rounded bg-white p-4"
          >
            {formFields.map((fields, i) => (
              <FormField
                key={fields.name + i}
                control={form.control}
                name={fields.name}
                render={({ field }) => (
                  <FormItem className="flex">
                    <FormLabel className="min-w-20">{fields.label}</FormLabel>
                    <FormControl>
                      <Input
                        type={fields.type}
                        placeholder={fields.placeholder}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            ))}
          </form>
        </Form>
      </div>
      <Button type="submit" form="applicantForm">
        {isSubmitting ? "Loading..." : "Submit"}
      </Button>
      <DatePickerDemo />
    </div>
  );
}
