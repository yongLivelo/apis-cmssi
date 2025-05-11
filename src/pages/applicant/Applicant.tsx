import { createContext, useEffect, useState } from "react";
import SearchType from "@/types/Applicant.type.ts";
import ApplicantControls from "./components/applicantControls.tsx";
import SearchForms from "./components/searchForms.tsx";
import SearchTable from "./components/searchTable.tsx";
import { getApplicants } from "@/services/applicantService.tsx";

type TableContextType = {
  data: SearchType[];
  setData: (data: SearchType[]) => void;
};

export const TableContext = createContext<TableContextType | null>(null);

export default function Applicant() {
  const [data, setData] = useState<SearchType[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      getApplicants().then((res) => {
        console.log(23);
        setData(res);
      });
    };
    fetchData();
  }, []);
  return (
    <TableContext.Provider value={{ data, setData }}>
      <div className="container mx-auto p-4">
        <SearchForms />
        <ApplicantControls />
        <SearchTable />
      </div>
    </TableContext.Provider>
  );
}
