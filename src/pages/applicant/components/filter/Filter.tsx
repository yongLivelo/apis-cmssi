import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Filter({ onSearch }: { onSearch: (filters: any) => void }) {
  const [filters, setFilters] = useState({
    id: "",
    applicationStatus: "",
    applicationDate: "",
    lastName: "",
    firstName: "",
    middleName: "",
    birthDate: "",
    age: "",
    city: "",
    province: "",
    civilStatus: "",
    height: "",
    trainingStatus: "",
    desiredPosition: "",
    highSchoolGraduate: false,
    collegeGraduate: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { id, value, type } = target;

    if (type === "checkbox") {
      const checkbox = target as HTMLInputElement;
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <div className="p-6 bg-gray-50 border border-gray-300 w-full">
      <h1 className="text-center text-xl font-bold mb-6 text-gray-700">
        Job Application Filter
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-x-12 gap-y-4">
          {/* Left Column */}
          <div className="space-y-3">
            {[
              { label: "Application No.", id: "id", type: "number" },
              {
                label: "Status",
                id: "applicationStatus",
                type: "select",
                options: ["Pending", "Approved", "Rejected"],
              },
              {
                label: "Application Date",
                id: "applicationDate",
                type: "date",
              },
              { label: "Last Name", id: "lastName", type: "text" },
              { label: "First Name", id: "firstName", type: "text" },
              { label: "Middle Name", id: "middleName", type: "text" },
              { label: "Birth Date", id: "birthDate", type: "date" },
              { label: "Age", id: "age", type: "number" },
            ].map((field) => (
              <div key={field.id} className="flex items-center space-x-4">
                <Label
                  htmlFor={field.id}
                  className="w-36 text-right font-medium"
                >
                  {field.label}
                </Label>
                {field.type === "select" ? (
                  <select
                    id={field.id}
                    value={(filters as any)[field.id]}
                    onChange={handleChange}
                    className="w-44 border border-gray-300 rounded-md px-2 py-1"
                  >
                    <option value="">Select</option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Input
                    id={field.id}
                    type={field.type}
                    value={(filters as any)[field.id]}
                    onChange={handleChange}
                    className="w-44"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-3">
            {[
              { label: "City/Municipality", id: "city", type: "text" },
              { label: "Province", id: "province", type: "text" },
              {
                label: "Civil Status",
                id: "civilStatus",
                type: "select",
                options: ["Single", "Married", "Widowed"],
              },
              { label: "Height (cm)", id: "height", type: "number" },
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
            ].map((field) => (
              <div key={field.id} className="flex items-center space-x-4">
                <Label
                  htmlFor={field.id}
                  className="w-36 text-right font-medium"
                >
                  {field.label}
                </Label>
                {field.type === "select" ? (
                  <select
                    id={field.id}
                    value={(filters as any)[field.id]}
                    onChange={handleChange}
                    className="w-44 border border-gray-300 rounded-md px-2 py-1"
                  >
                    <option value="">Select</option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <Input
                    id={field.id}
                    type={field.type}
                    value={(filters as any)[field.id]}
                    onChange={handleChange}
                    className="w-44"
                  />
                )}
              </div>
            ))}

            {/* Checkboxes */}
            <div className="flex items-center space-x-4 ml-36 mt-2">
              <div className="flex items-center space-x-2">
                <Input
                  id="highSchoolGraduate"
                  type="checkbox"
                  checked={filters.highSchoolGraduate}
                  onChange={handleChange}
                />
                <Label htmlFor="highSchoolGraduate">Highschool Grad</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Input
                  id="collegeGraduate"
                  type="checkbox"
                  checked={filters.collegeGraduate}
                  onChange={handleChange}
                />
                <Label htmlFor="collegeGraduate">College Grad</Label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button
            type="submit"
            className="bg-blue-500 text-white hover:bg-blue-600 transition px-6 py-2 rounded-md"
          >
            Search
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Filter;
