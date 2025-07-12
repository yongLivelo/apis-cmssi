import { Search, Controls, Table } from "./components";
export default function Applicants() {
  return (
    <>
      <div className="m-4 flex flex-col gap-4 rounded-2xl p-2">
        <Search />
        <Controls />
        <Table />
      </div>
    </>
  );
}
