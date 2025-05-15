import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  addApplicant,
  getApplicantById,
  updateApplicant,
} from "@/services/applicantService";

// Schema
const formSchema = z.object({
  applicationDate: z.string().nonempty("Application Date is required"),
  id: z.number().optional(),
  age: z.preprocess(
    (val) => Number(val),
    z.number().min(0, "Age must be a positive number"),
  ),
  dateOfBirth: z.string().nonempty("Date of Birth is required"),
  sex: z.string().nonempty("Sex is required"),
  desiredPosition: z.string().nonempty("Desired Position is required"),
  lastName: z.string().nonempty("Surname is required"),
  firstName: z.string().nonempty("First Name is required"),
  middleName: z.string().nonempty("Middle Name is required"),
  applicationStatus: z.string().nonempty("Application Status is required"),
  trainingStatus: z.string().nonempty("Training Status is required"),
});

export default function ApplicantForm() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      applicationDate: "",
      id: undefined,
      age: undefined,
      dateOfBirth: "",
      sex: "",
      desiredPosition: "",
      lastName: "",
      firstName: "",
      middleName: "",
      applicationStatus: "",
      trainingStatus: "",
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    if (isEdit) {
      const fetchApplicant = async () => {
        try {
          const data = await getApplicantById(id!);
          console.log(data);
          reset({
            applicationDate: data.applicationDate,
            id: data.id,
            age: data.age,
            dateOfBirth: data.dateOfBirth,
            sex: data.sex,
            desiredPosition: data.desiredPosition,
            lastName: data.lastName,
            firstName: data.firstName,
            middleName: data.middleName,
            applicationStatus: data.applicationStatus,
            trainingStatus: data.trainingStatus,
          });
        } catch (error) {
          console.error("Failed to fetch applicant:", error);
          toast.error("Failed to load applicant data.");
        }
      };

      fetchApplicant();
    }
  }, [id, isEdit, reset]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { id, ...newApplicantData } = values;

    try {
      console.log("Form submitted with values:", values);
      const response = isEdit
        ? await updateApplicant(`${id}`!, newApplicantData)
        : await addApplicant(newApplicantData);
      toast.success(response.message);
      navigate("/applicants");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    } finally {
      reset();
    }
  };

  const formFields = [
    {
      name: "applicationDate",
      label: "Application Date",
      type: "date",
      placeholder: "Select application date",
      description: "This is the date of application.",
    },
    {
      name: "id",
      label: "Application No.",
      type: "number",
      disabled: true,
      placeholder: "Auto-generated ID",
      description: "This is the unique application number.",
    },
    {
      name: "age",
      label: "Age",
      type: "number",
      placeholder: "Enter your age",
      description: "Your current age.",
    },
    {
      name: "dateOfBirth",
      label: "Date of Birth",
      type: "date",
      placeholder: "Select your birth date",
      description: "Your date of birth.",
    },
    {
      name: "sex",
      label: "Sex",
      type: "select",
      placeholder: "Select your gender",
      description: "Your gender identity.",
      selection: ["male", "female"],
    },
    {
      name: "desiredPosition",
      label: "Desired Position",
      type: "select",
      placeholder: "Select desired position",
      description: "The position you are applying for.",
      selection: ["Software Engineer", "Data Scientist", "Product Manager"],
    },
    {
      name: "lastName",
      label: "Surname",
      type: "text",
      placeholder: "Enter your last name",
      description: "Your family name.",
    },
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      placeholder: "Enter your first name",
      description: "Your given name.",
    },
    {
      name: "middleName",
      label: "Middle Name",
      type: "text",
      placeholder: "Enter your middle name",
      description: "Your middle name (if any).",
    },
    {
      name: "applicationStatus",
      label: "Application Status",
      type: "select",
      placeholder: "Select application status",
      description: "The current status of your application.",
      selection: ["Pending", "Approved", "Rejected"],
    },
    {
      name: "trainingStatus",
      label: "Training Status",
      type: "select",
      placeholder: "Select training status",
      description: "The current status of your training.",
      selection: ["In Progress", "Completed", "Not Started"],
    },
  ];

  return (
    <div className="h-full w-full bg-gray-100 p-4">
      <Form {...form}>
        <form
          id="applicantForm"
          onSubmit={handleSubmit(onSubmit)}
          className="m-4 grid grid-cols-4 gap-4 rounded bg-white p-4"
        >
          {formFields.map((field) => (
            <FormField
              key={field.name}
              control={control}
              name={field.name as keyof z.infer<typeof formSchema>}
              render={({ field: formField }) => (
                <FormItem>
                  <FormLabel>{field.label}</FormLabel>
                  {field.type === "select" ? (
                    <Select
                      value={formField.value ? String(formField.value) : ""}
                      onValueChange={formField.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={field.placeholder} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {field.selection?.map((option: string) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  ) : (
                    <FormControl>
                      <Input
                        type={field.type}
                        disabled={field.disabled}
                        placeholder={field.placeholder}
                        {...formField}
                      />
                    </FormControl>
                  )}
                  <FormDescription>{field.description}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </form>
      </Form>

      <Button type="submit" form="applicantForm">
        {isSubmitting ? "Loading..." : "Submit"}
      </Button>

      <Tabs defaultValue="personal" className="mt-6">
        <TabsList>
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="addresses">Addresses</TabsTrigger>
          <TabsTrigger value="work-experiences">Work Experiences</TabsTrigger>
          <TabsTrigger value="character-reference">
            Character Reference
          </TabsTrigger>
          <TabsTrigger value="employment">Employment</TabsTrigger>
          <TabsTrigger value="attachment">Attachment</TabsTrigger>
          <TabsTrigger value="requirement">Requirement</TabsTrigger>
          <TabsTrigger value="internet-history">Internet History</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <p>Personal info goes here.</p>
        </TabsContent>
        <TabsContent value="addresses">
          <p>Address content goes here.</p>
        </TabsContent>
        <TabsContent value="work-experiences">
          <p>Work experiences content goes here.</p>
        </TabsContent>
        <TabsContent value="character-reference">
          <p>Character references content goes here.</p>
        </TabsContent>
        <TabsContent value="employment">
          <p>Employment content goes here.</p>
        </TabsContent>
        <TabsContent value="attachment">
          <p>Attachment content goes here.</p>
        </TabsContent>
        <TabsContent value="requirement">
          <p>Requirements content goes here.</p>
        </TabsContent>
        <TabsContent value="internet-history">
          <p>Internet history content goes here.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
}
