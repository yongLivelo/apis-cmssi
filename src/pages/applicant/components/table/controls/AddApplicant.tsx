import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addApplicant } from "@/services/applicantService";

const formSchema = z.object({
  lastName: z.string().nonempty("Last Name is required."),
  firstName: z.string().nonempty("First Name is required."),
  middleName: z.string().optional(),
  birthDate: z.string().nonempty("Birth Date is required."),
  religion: z.string().optional(),
  age: z.number().int().positive("Age must be a positive number."),
  city: z.string().nonempty("City/Municipality is required."),
  province: z.string().nonempty("Province is required."),
  civilStatus: z.string().nonempty("Civil Status is required."),
});

function AddApplicant() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: zodResolver(formSchema) });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await addApplicant(values);
      setSuccess("Applicant added successfully!");
      reset();
    } catch (err) {
      setError("Failed to add applicant. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Applicant</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Applicant</DialogTitle>
          <DialogDescription>Fill in the details below.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input {...register("lastName")} placeholder="Last Name" />
          {errors.lastName && (
            <p className="text-red-500">{errors.lastName.message}</p>
          )}

          <Input {...register("firstName")} placeholder="First Name" />
          {errors.firstName && (
            <p className="text-red-500">{errors.firstName.message}</p>
          )}

          <Input {...register("middleName")} placeholder="Middle Name" />
          <Input type="date" {...register("birthDate")} />
          {errors.birthDate && (
            <p className="text-red-500">{errors.birthDate.message}</p>
          )}

          <Input {...register("religion")} placeholder="Religion" />
          <Input
            type="number"
            {...register("age", { valueAsNumber: true })}
            placeholder="Age"
          />
          {errors.age && <p className="text-red-500">{errors.age.message}</p>}

          <Input {...register("city")} placeholder="City/Municipality" />
          {errors.city && <p className="text-red-500">{errors.city.message}</p>}

          <Input {...register("province")} placeholder="Province" />
          {errors.province && (
            <p className="text-red-500">{errors.province.message}</p>
          )}

          <Input {...register("civilStatus")} placeholder="Civil Status" />
          {errors.civilStatus && (
            <p className="text-red-500">{errors.civilStatus.message}</p>
          )}

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}

          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddApplicant;
