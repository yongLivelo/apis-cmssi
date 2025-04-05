import { useEffect, useState } from "react";
import { User, columns } from "./components/table/columns.ts";
import { DataTable } from "./components/table/data-table.tsx";
import { getApplicants } from "@/services/applicantService";
import Filter from "./components/filter/Filter.tsx";
import Controls from "./components/controls/controls.tsx";

export default function Applicant() {
  const [data, setData] = useState<User[]>([]);
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchClicked, setSearchClicked] = useState(false);

  const handleAddApplicant = (newApplicant: User) => {
    setData((prevData) => [...prevData, newApplicant]);
    if (searchClicked) {
      handleSearch({});
    }
  };

  const handleSearch = (filters: Partial<User>) => {
    setSearchClicked(true);

    const noFilters = Object.values(filters).every((value) => !value);
    if (noFilters) {
      setFilteredData(data);
    } else {
      const filtered = data.filter((applicant) =>
        Object.entries(filters).every(([key, value]) =>
          value
            ? String(applicant[key as keyof User])
                .toLowerCase()
                .includes(String(value).toLowerCase())
            : true
        )
      );
      setFilteredData(filtered);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const applicants = await getApplicants();
        setData(applicants);
      } catch (err) {
        console.error("Error fetching applicants:", err);
        setError("Failed to load applicants.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center py-5">Loading...</div>;
  if (error)
    return <div className="text-red-500 text-center py-5">{error}</div>;

  return (
    <div className="container mx-auto py-10 px-4">
      <Filter onSearch={handleSearch} />
      <Controls onAddApplicant={handleAddApplicant} />
      <DataTable
        columns={columns}
        data={filteredData}
        showValues={searchClicked}
      />
    </div>
  );
}
