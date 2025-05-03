import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addApplicant } from "@/services/applicantService";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function ApplicantForm() {
  const location = useLocation();
  const mode = location.pathname
    .split("/")
    .filter(Boolean)
    .slice(-1)[0]
    .split("%20")[0];
  console.log(mode);

  const [info, setInfo] = useState({
    applicantId: "",
    applicationStatus: "",
    applicationDate: "",
    lastName: "",
    firstName: "",
    middleName: "",
    birthDateFrom: "",
    birthDateTo: "",
    age: "",
    heightFrom: "",
    heightTo: "",
    city: "",
    province: "",
    civilStatus: "",
    trainingStatus: "",
    desiredPosition: "",
    highSchoolGraduate: false,
    collegeGraduate: false,
  });

  const fields = [
    {
      key: "applicantId",
      label: "Application No.",
      type: "number",
      disabled: true,
    },
    { key: "age", label: "Age", type: "number" },
    { key: "birthDateFrom", label: "Date of Birth", type: "date" },
    { key: "sex", label: "Sex", type: "text" },
    { key: "desiredPosition", label: "Desired Position", type: "text" },
    { key: "lastName", label: "Surname", type: "text" },
    { key: "firstName", label: "First Name", type: "text" },
    { key: "middleName", label: "Middle Name", type: "text" },
    { key: "applicationDate", label: "Application Date", type: "date" },
    { key: "applicationStatus", label: "Application Status", type: "text" },
    { key: "trainingStatus", label: "Training Status", type: "text" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setInfo((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addApplicant(info);
    console.log(info);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-4">
          {fields.map(({ key, label, type, disabled = false }) => (
            <div key={key} className="flex flex-col gap-2 p-4">
              <Label htmlFor={key} className="text-sm font-medium">
                {label}
              </Label>
              <Input
                id={key}
                type={type}
                disabled={disabled}
                onChange={handleChange}
                placeholder={label}
              />
            </div>
          ))}
        </div>

        <Button type="submit">Add</Button>
      </form>
    </div>
  );
}

export default ApplicantForm;
