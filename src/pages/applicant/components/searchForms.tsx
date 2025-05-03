import { FormEvent, useContext, useState } from "react";
import { TableContext } from "@/pages/applicant/Applicant.tsx";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchForms() {
  const table = useContext(TableContext)!;

  const [filters, setFilters] = useState({
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value, type } = e.target;

    if (type === "checkbox") {
      const checkbox = e.target as HTMLInputElement;
      setFilters((prev) => ({
        ...prev,
        [id]: checkbox.checked,
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [id]: value,
      }));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  const leftFields = [
    { label: "Application No.", id: "id", type: "number" },
    {
      label: "Status",
      id: "applicationStatus",
      type: "select",
      options: ["Pending", "Approved", "Rejected"],
    },
    { label: "Application Date", id: "applicationDate", type: "date" },
    { label: "Last Name", id: "lastName", type: "text" },
    { label: "First Name", id: "firstName", type: "text" },
    { label: "Middle Name", id: "middleName", type: "text" },
    { label: "Age", id: "age", type: "number" },
  ];

  const rightFields = [
    { label: "City/Municipality", id: "city", type: "text" },
    { label: "Province", id: "province", type: "text" },
    {
      label: "Civil Status",
      id: "civilStatus",
      type: "select",
      options: ["Single", "Married", "Widowed"],
    },
    {
      label: "Training Status",
      id: "trainingStatus",
      type: "select",
      options: ["Completed", "In Progress", "Not Started"],
    },
    {
      label: "Desired Position",
      id: "desiredPosition",
      type: "select",
      options: ["Developer", "Designer", "Manager"],
    },
  ];

  return (
    <div className="w-full overflow-x-auto border border-gray-300 bg-gray-50 p-6">
      <div className="min-w-[900px]">
        <h1 className="mb-6 text-center text-xl font-bold text-gray-700">
          Search Applicant Filter
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-x-12 gap-y-4">
            {/* Left Column */}
            <div className="space-y-3">
              {leftFields.map(({ label, id, type, options }) => (
                <div key={id} className="flex items-center space-x-4">
                  <Label htmlFor={id} className="w-36 text-right font-medium">
                    {label}
                  </Label>
                  {type === "select" ? (
                    <select
                      id={id}
                      value={(filters as any)[id]}
                      onChange={handleChange}
                      className="w-44 rounded-md border border-gray-300 px-2 py-1"
                    >
                      <option value="">Select</option>
                      {options?.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <Input
                      id={id}
                      type={type}
                      value={(filters as any)[id]}
                      onChange={handleChange}
                      className="w-44"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Right Column */}
            <div className="space-y-3">
              {rightFields.map(({ label, id, type, options }) => (
                <div key={id} className="flex items-center space-x-4">
                  <Label htmlFor={id} className="w-36 text-right font-medium">
                    {label}
                  </Label>
                  {type === "select" ? (
                    <select
                      id={id}
                      value={(filters as any)[id]}
                      onChange={handleChange}
                      className="w-44 rounded-md border border-gray-300 px-2 py-1"
                    >
                      <option value="">Select</option>
                      {options?.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <Input
                      id={id}
                      type={type}
                      value={(filters as any)[id]}
                      onChange={handleChange}
                      className="w-44"
                    />
                  )}
                </div>
              ))}

              {/* Birth Date Range */}
              <div className="flex items-center space-x-4">
                <Label
                  htmlFor="birthDateFrom"
                  className="w-36 text-right font-medium"
                >
                  Birth Date
                </Label>
                <Input
                  id="birthDateFrom"
                  type="date"
                  value={filters.birthDateFrom}
                  onChange={handleChange}
                  className="w-36"
                />
                <span>to</span>
                <Input
                  id="birthDateTo"
                  type="date"
                  value={filters.birthDateTo}
                  onChange={handleChange}
                  className="w-36"
                />
              </div>

              {/* Height Range */}
              <div className="flex items-center space-x-4">
                <Label
                  htmlFor="heightFrom"
                  className="w-36 text-right font-medium"
                >
                  Height (cm)
                </Label>
                <Input
                  id="heightFrom"
                  type="number"
                  value={filters.heightFrom}
                  onChange={handleChange}
                  className="w-20"
                />
                <span>to</span>
                <Input
                  id="heightTo"
                  type="number"
                  value={filters.heightTo}
                  onChange={handleChange}
                  className="w-20"
                />
              </div>

              {/* Education Checkboxes */}
              <div className="mt-2 ml-36 flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Input
                    id="highSchoolGraduate"
                    type="checkbox"
                    checked={filters.highSchoolGraduate}
                    onChange={handleChange}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="highSchoolGraduate">Highschool Grad</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    id="collegeGraduate"
                    type="checkbox"
                    checked={filters.collegeGraduate}
                    onChange={handleChange}
                    className="h-4 w-4"
                  />
                  <Label htmlFor="collegeGraduate">College Grad</Label>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button type="submit">Search</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
