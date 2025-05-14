import { useContext } from "react";
import { TableContext } from "@/pages/applicant/Applicant.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router-dom";

export default function applicantControls({
  applicantId,
}: {
  applicantId: number;
}) {
  const table = useContext(TableContext)!;
  const navigate = useNavigate();

  const exportToCSV = () => {
    if (!table || !table.data) return;

    const headers = Object.keys(table.data[0]).join(",");
    const rows = table.data
      .map((row: Record<string, any>) =>
        Object.values(row)
          .map((value) => `"${value}"`)
          .join(","),
      )
      .join("\n");

    const csvContent = `${headers}\n${rows}`;
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "applicants.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="flex flex-col gap-2 p-4">
        <div className="flex gap-2">
          <Button
            onClick={() => {
              navigate("adding applicant");
            }}
          >
            Add
          </Button>
          <Button onClick={exportToCSV}>CSV</Button>
          <Button>Print</Button>
        </div>
        <div className="flex justify-between gap-2">
          <div className="flex gap-2">
            <Button variant="destructive">Delete</Button>
            <Button
              onClick={() => {
                navigate(`editing applicant`);
              }}
            >
              Edit
            </Button>
          </div>
          <div>
            {applicantId ? (
              <div>Selected Applicant no. {applicantId}</div>
            ) : (
              <div>No Selected</div>
            )}{" "}
          </div>
        </div>
      </div>
    </>
  );
}
