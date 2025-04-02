import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function Controls({
  onAddApplicant,
}: {
  onAddApplicant: (newApplicant: any) => void;
}) {
  return (
    <div className="flex justify-between items-center py-4">
      <Add onAddApplicant={onAddApplicant} />
      <Delete />
    </div>
  );
}

//comment testing

const Add = ({
  onAddApplicant,
}: {
  onAddApplicant: (newApplicant: any) => void;
}) => {
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    applicationStatus: "",
    lastName: "",
    middleName: "",
    status: "",
    birthDate: "",
    city: "",
    province: "",
    civilStatus: "",
    trainingStatus: "",
    desiredPosition: "",
    height: "",
    highSchoolGraduate: false,
    collegeGraduate: false,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      onAddApplicant(formData); // Pass the new applicant data back to the parent
      setFormData({
        id: "",
        firstName: "",
        applicationStatus: "",
        lastName: "",
        middleName: "",
        status: "",
        birthDate: "",
        city: "",
        province: "",
        civilStatus: "",
        trainingStatus: "",
        desiredPosition: "",
        height: "",
        highSchoolGraduate: false,
        collegeGraduate: false,
      });
    } catch (error) {
      console.error("Error adding applicant:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
          Add Applicant
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Applicant</DialogTitle>
          <DialogDescription>
            Fill out the details below to add a new applicant.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="ID"
            className="p-2 border rounded-md w-full"
            required
          />
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="p-2 border rounded-md w-full"
            required
          />
          <input
            type="text"
            name="applicationStatus"
            value={formData.applicationStatus}
            onChange={handleChange}
            placeholder="Application Status"
            className="p-2 border rounded-md w-full"
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="p-2 border rounded-md w-full"
          />
          <input
            type="text"
            name="middleName"
            value={formData.middleName}
            onChange={handleChange}
            placeholder="Middle Name"
            className="p-2 border rounded-md w-full"
          />
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
            placeholder="Status"
            className="p-2 border rounded-md w-full"
          />
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            placeholder="Birth Date"
            className="p-2 border rounded-md w-full"
          />
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City"
            className="p-2 border rounded-md w-full"
          />
          <input
            type="text"
            name="province"
            value={formData.province}
            onChange={handleChange}
            placeholder="Province"
            className="p-2 border rounded-md w-full"
          />
          <input
            type="text"
            name="civilStatus"
            value={formData.civilStatus}
            onChange={handleChange}
            placeholder="Civil Status"
            className="p-2 border rounded-md w-full"
          />
          <input
            type="text"
            name="trainingStatus"
            value={formData.trainingStatus}
            onChange={handleChange}
            placeholder="Training Status"
            className="p-2 border rounded-md w-full"
          />
          <input
            type="text"
            name="desiredPosition"
            value={formData.desiredPosition}
            onChange={handleChange}
            placeholder="Desired Position"
            className="p-2 border rounded-md w-full"
          />
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            placeholder="Height"
            className="p-2 border rounded-md w-full"
          />
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="highSchoolGraduate"
              checked={formData.highSchoolGraduate}
              onChange={handleChange}
            />
            High School Graduate
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="collegeGraduate"
              checked={formData.collegeGraduate}
              onChange={handleChange}
            />
            College Graduate
          </label>
          <button
            type="submit"
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const Delete = () => {
  return <></>; // Placeholder for now
};

export default Controls;
