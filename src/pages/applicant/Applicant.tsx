import { useEffect, useState } from "react";
import { User, columns } from "./components/table/columns.tsx";
import { DataTable } from "./components/table/data-table.tsx";
import { getApplicants } from "@/services/applicantService";
import Search from "@/pages/applicant/components/search/search.tsx";
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

    const filtered = data.filter((applicant) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true;

        const fieldValue = applicant[key as keyof User];

        if (key === "birthDateFrom") {
          return new Date(applicant.birthDate) >= new Date(value as string);
        }
        if (key === "birthDateTo") {
          return new Date(applicant.birthDate) <= new Date(value as string);
        }

        if (key === "heightFrom") {
          return applicant.height >= parseInt(value as string);
        }
        if (key === "heightTo") {
          return applicant.height <= parseInt(value as string);
        }

        return String(fieldValue)
          .toLowerCase()
          .includes(String(value).toLowerCase());
      });
    });

    setFilteredData(filtered);
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
      <Search onSearch={handleSearch} />
      <Controls onAddApplicant={handleAddApplicant} />
      <DataTable
        columns={columns}
        data={filteredData}
        showValues={searchClicked}
      />
    </div>
  );
}
