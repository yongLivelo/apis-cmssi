import { useEffect, useState } from "react";
import { User, columns } from "./components/table/columns.ts";
import { DataTable } from "./components/table/data-table.tsx";
import { getApplicants } from "@/services/applicantService"; // Import the API function

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto py-10 ">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
