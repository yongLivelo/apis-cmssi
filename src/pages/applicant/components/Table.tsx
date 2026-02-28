"use client";
import { DataTable } from "mantine-datatable";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

const PAGE_SIZE = 10;

export function Table({
  setSelected,
  selected = [],
  allData,
  fetching,
}: {
  setSelected: Dispatch<SetStateAction<any[] | undefined>>;
  selected: any[] | undefined;
  allData: any[];
  fetching: boolean;
}) {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setData(allData.slice(from, to));
  }, [page, allData]);

  return (
    <DataTable
      striped
      withTableBorder
      withColumnBorders
      selectedRecords={selected}
      onSelectedRecordsChange={setSelected}
      records={data}
      fetching={fetching}
      totalRecords={allData.length}
      recordsPerPage={PAGE_SIZE}
      page={page}
      onPageChange={(p) => setPage(p)}
      noRecordsText=""
      noRecordsIcon
      columns={[
        {
          accessor: "id",
          title: "#",
        },
        { accessor: "lastName" },
      ]}
    />
  );
}

export default Table;
