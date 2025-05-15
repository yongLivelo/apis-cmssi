import { useContext } from "react";
import { TableContext } from "@/pages/applicant/Applicant.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router-dom";
import { deleteApplicant, getApplicants } from "@/services/applicantService";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

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

  // Print only the table data
  const printTable = () => {
    if (!table || !table.data) return;

    const headers = Object.keys(table.data[0]);
    const rows = table.data;

    const tableHtml = `
      <table border="1" style="border-collapse:collapse;width:100%;font-family:sans-serif;">
        <thead>
          <tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr>
        </thead>
        <tbody>
          ${rows
            .map(
              (row: Record<string, any>) =>
                `<tr>${headers.map((h) => `<td>${row[h]}</td>`).join("")}</tr>`,
            )
            .join("")}
        </tbody>
      </table>
    `;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Table</title>
            <style>
              body { margin: 40px; }
              table { font-size: 14px; }
              th, td { padding: 8px 12px; }
            </style>
          </head>
          <body>
            ${tableHtml}
            <script>
              window.onload = function() {
                window.print();
                window.onafterprint = function() { window.close(); };
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
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
          <Button onClick={printTable}>Print</Button>
        </div>
        <div className="flex justify-between gap-2">
          <div className="flex gap-2">
            <Dialog>
              {" "}
              <DialogTrigger asChild>
                <Button variant="destructive">Delete</Button>
              </DialogTrigger>
              <DialogContent>
                Are you sure you want to delete applicant {applicantId}
                <DialogFooter>
                  <DialogClose>
                    <Button
                      onClick={() => {
                        deleteApplicant(`${applicantId}`).then(async (res) => {
                          table.setData(await getApplicants());
                        });
                      }}
                    >
                      Yes
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button
              onClick={() => {
                navigate(`editing applicant/${applicantId}`);
              }}
              disabled={!Boolean(applicantId)}
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
