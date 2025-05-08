import { createContext, useState, useEffect } from "react";
import SearchType from "@/types/Applicant.type.ts";
import ApplicantControls from "./components/applicantControls.tsx";
import SearchForms from "./components/searchForms.tsx";
import SearchTable from "./components/searchTable.tsx";
import { getApplicants } from "@/services/applicantService";

type TableContextType = {
  data: SearchType[];
  setData: (data: SearchType[]) => void;
};

export const TableContext = createContext<TableContextType | null>(null);

export default function Applicant() {
  const [data, setData] = useState<SearchType[]>([]);
  const [filteredData, setFilteredData] = useState<SearchType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const applicants = await getApplicants();
        setData(applicants);
        setFilteredData(applicants);
      } catch (err) {
        console.error("Error fetching applicants:", err);
        setError("Failed to load applicants.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Search handler to filter data based on provided filters
  const handleSearch = (filters: Partial<SearchType>) => {
    const filtered = data.filter((applicant) => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true; // Skip empty filters

        const fieldValue = applicant[key as keyof SearchType];

        // Handle date range filters
        if (key === "birthDateFrom") {
          return new Date(applicant.birthDate) >= new Date(value as string);
        }
        if (key === "birthDateTo") {
          return new Date(applicant.birthDate) <= new Date(value as string);
        }

        return String(fieldValue)
          .toLowerCase()
          .includes(String(value).toLowerCase());
      });
    });

    setFilteredData(filtered); // Update filtered data
  };

  if (loading) return <div className="py-5 text-center">Loading...</div>;
  if (error)
    return <div className="py-5 text-center text-red-500">{error}</div>;

  return (
    <TableContext.Provider value={{ data, setData }}>
      <div className="container mx-auto p-4">
        <SearchForms onSearch={handleSearch} /> {/* Pass search handler */}
        <ApplicantControls />
        <SearchTable data={filteredData} /> {/* Pass filtered data */}
      </div>
    </TableContext.Provider>
  );
}
