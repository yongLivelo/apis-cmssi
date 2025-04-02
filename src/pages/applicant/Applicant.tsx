import { useEffect, useState } from "react";
import { User, columns } from "./components/table/columns.tsx";
import { DataTable } from "./components/table/data-table.tsx";
import { getApplicants } from "@/services/applicantService";
import Filter from "./components/filter/Filter.tsx";
import Controls from "./components/controls/controls.tsx";

export default function Applicant() {
  const [data, setData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
      <Filter />
      <Controls />
      <DataTable columns={columns} data={data} />
    </div>
  );
}
