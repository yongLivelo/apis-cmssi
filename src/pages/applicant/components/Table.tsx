"use client";
import { DataTable, type DataTableSortStatus } from "mantine-datatable";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { sortBy } from "lodash";
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

  const [sortStatus, setSortStatus] = useState<DataTableSortStatus<any>>({
    columnAccessor: "name",
    direction: "asc",
  });

  useEffect(() => {
    const sortedData = sortBy(data, sortStatus.columnAccessor);
    setData(
      sortStatus.direction === "desc" ? sortedData.reverse() : sortedData,
    );
  }, [sortStatus]);

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
          sortable: true,
        },
        { accessor: "lastName", sortable: true },
      ]}
      sortStatus={sortStatus}
      onSortStatusChange={setSortStatus}
    />
  );
}

export default Table;
