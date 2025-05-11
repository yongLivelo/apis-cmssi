import { useContext } from "react";
import { TableContext } from "@/pages/applicant/Applicant.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router-dom";

export default function applicantControls() {
  const table = useContext(TableContext)!;
  const navigate = useNavigate();
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
          <Button>CSV</Button>
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
          <div>Selected Applicant no. 69</div>
        </div>
      </div>
    </>
  );
}
