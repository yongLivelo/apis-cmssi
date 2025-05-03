import { createContext, useState } from "react";
import { SearchType } from "../../types/Applicant.type.ts";
import Controls from "./components/applicantControls.tsx";
import SearchForms from "./components/searchForms.tsx";
import SearchTable from "./components/searchTable.tsx";

type TableContextType = {
  data: SearchType[];
  setData: (data: SearchType[]) => void;
};

export const TableContext = createContext<TableContextType | null>(null);

export default function Applicant() {
  const [data, setData] = useState<SearchType[]>([]);

  return (
    <TableContext.Provider value={{ data, setData }}>
      <div className="container mx-auto p-4">
        <SearchForms />
        <Controls />
        <SearchTable />
      </div>
    </TableContext.Provider>
  );
}
