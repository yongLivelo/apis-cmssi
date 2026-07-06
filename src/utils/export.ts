import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function exportToCsv(
  records: any[],
  columns: { accessor: string | number; title: any }[],
  filename = "export.csv",
) {
  const csv = [
    columns.map((c) => c.title).join(","),
    ...records.map((r) =>
      columns
        .map((c) => JSON.stringify(r[c.accessor as string] ?? ""))
        .join(","),
    ),
  ].join("\n");

  downloadBlob(new Blob([csv], { type: "text/csv;charset=utf-8;" }), filename);
}

export function exportToPdf(
  records: any[],
  columns: { accessor: string | number; title: any }[],
  filename = "export.pdf",
) {
  const doc = new jsPDF();
  autoTable(doc, {
    head: [columns.map((c) => c.title)],
    body: records.map((r) => columns.map((c) => r[c.accessor as string] ?? "")),
    styles: { fontSize: 4 },
  });
  doc.save(filename);
}
