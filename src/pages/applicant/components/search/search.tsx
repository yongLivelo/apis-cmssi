import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Search({ onSearch }: { onSearch: (filters: any) => void }) {
  const [filters, setFilters] = useState({
    id: "",
    applicationStatus: "",
    applicationDate: "",
    lastName: "",
    firstName: "",
    middleName: "",
    birthDateFrom: "",
    birthDateTo: "",
    ageFrom: "",
    ageTo: "",
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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <div className="p-6 bg-gray-50 border border-gray-300 w-full overflow-x-auto">
      <div className="min-w-[900px]">
        <h1 className="text-center text-xl font-bold mb-6 text-gray-700">
          Search Applicant Filter
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

              {/* Age Range */}
              <div className="flex items-center space-x-4">
                <Label
                  htmlFor="ageFrom"
                  className="w-36 text-right font-medium"
                >
                  Age
                </Label>
                <Input
                  id="ageFrom"
                  type="number"
                  value={filters.ageFrom}
                  onChange={handleChange}
                  className="w-20"
                />
                <span>to</span>
                <Input
                  id="ageTo"
                  type="number"
                  value={filters.ageTo}
                  onChange={handleChange}
                  className="w-20"
                />
              </div>
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

              {/* Checkboxes */}
              <div className="flex items-center space-x-4 ml-36 mt-2">
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
    </div>
  );
}

export default Search;
