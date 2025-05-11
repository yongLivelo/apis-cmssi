import { FormEvent, useState, useContext, useEffect, useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TableContext } from "../Applicant";
import SearchType from "@/types/Applicant.type";

interface SearchFormsProps {
  onSearch: (filters: any) => void;
}

export default function SearchForms({ onSearch }: SearchFormsProps) {
  const { data, setData } = useContext(TableContext)!;
  const originalData = useRef<SearchType[]>([]);

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
    sex: "",
  });

  useEffect(() => {
    if (data.length && originalData.current.length === 0) {
      originalData.current = data;
    }
  }, [data]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value, type } = e.target;
    const val =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFilters((prev) => ({ ...prev, [id]: val }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(filters);

    const filtered = originalData.current.filter((item) => {
      return Object.entries(filters).every(([key, val]) => {
        if (val === "" || val === false) return true;

        const itemVal = (item as any)[key];

        // Date range filters
        if (key === "birthDateFrom" && filters.birthDateTo) {
          const from = new Date(filters.birthDateFrom);
          const to = new Date(filters.birthDateTo);
          const date = new Date(item.birthDate);
          return date >= from && date <= to;
        }

        if (typeof val === "boolean") return itemVal === val;

        if (typeof itemVal === "string")
          return itemVal.toLowerCase().includes((val as string).toLowerCase());

        return itemVal == val;
      });
    });

    setData(filtered);
  };

  const fields = [
    { key: "id", label: "Application No.", type: "number" },
    { key: "age", label: "Age", type: "number" },
    { key: "sex", label: "Sex", type: "text" },
    { key: "desiredPosition", label: "Desired Position", type: "text" },
    { key: "firstName", label: "First Name", type: "text" },
    { key: "middleName", label: "Middle Name", type: "text" },
    { key: "lastName", label: "Surname", type: "text" },
    { key: "applicationDate", label: "Application Date", type: "date" },
    { key: "applicationStatus", label: "Application Status", type: "text" },
    { key: "trainingStatus", label: "Training Status", type: "text" },
    { key: "city", label: "City/Municipality", type: "text" },
    { key: "province", label: "Province", type: "text" },
    { key: "civilStatus", label: "Civil Status", type: "text" },
  ];

  return (
    <div className="border border-gray-300 bg-gray-50 p-6">
      <h1 className="mb-6 text-center text-xl font-bold text-gray-700">
        Search Applicant Filter
      </h1>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-4">
          {fields.map(({ key, label, type }) => (
            <div key={key} className="flex flex-col gap-1 p-4">
              <Label htmlFor={key} className="text-sm font-medium">
                {label}
              </Label>
              <Input
                id={key}
                type={type}
                value={(filters as any)[key]}
                onChange={handleChange}
                placeholder={label}
              />
            </div>
          ))}

          {/* Birth Date Range */}
          <div className="col-span-2 flex items-center gap-2 px-4 pt-4">
            <Label htmlFor="birthDateFrom" className="w-40 text-sm font-medium">
              Birth Date
            </Label>
            <Input
              id="birthDateFrom"
              type="date"
              value={filters.birthDateFrom}
              onChange={handleChange}
              className="w-36"
              placeholder="From"
            />
            <span className="self-center text-sm">to</span>
            <Input
              id="birthDateTo"
              type="date"
              value={filters.birthDateTo}
              onChange={handleChange}
              className="w-36"
              placeholder="To"
            />
          </div>

          {/* Height Range */}
          <div className="col-span-2 flex items-center gap-2 px-4 pt-4">
            <Label htmlFor="heightFrom" className="w-40 text-sm font-medium">
              Height (cm)
            </Label>
            <Input
              id="heightFrom"
              type="number"
              value={filters.heightFrom}
              onChange={handleChange}
              className="w-24"
              placeholder="From"
            />
            <span className="self-center text-sm">to</span>
            <Input
              id="heightTo"
              type="number"
              value={filters.heightTo}
              onChange={handleChange}
              className="w-24"
              placeholder="To"
            />
          </div>

          {/* Education Checkboxes */}
          <div className="col-span-4 flex items-center gap-6 px-4 pt-2">
            <div className="flex items-center gap-2">
              <Input
                id="highSchoolGraduate"
                type="checkbox"
                checked={filters.highSchoolGraduate}
                onChange={handleChange}
                className="h-4 w-4"
              />
              <Label htmlFor="highSchoolGraduate">Highschool Grad</Label>
            </div>
            <div className="flex items-center gap-2">
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

        <div className="mt-6 flex justify-end px-4">
          <Button type="submit">Search</Button>
        </div>
      </form>
    </div>
  );
}
