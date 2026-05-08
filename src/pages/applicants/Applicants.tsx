import Controls from "@/pages/applicants/components/Controls";
import Search from "@/pages/applicants/components/Search";
import TableDisplay from "@/pages/applicants/components/TableDisplay";
import { Grid } from "@mantine/core";

function Applicants() {
  return (
    <div>
      <Grid>
        <Search />
        <Controls />
        <TableDisplay />
      </Grid>
    </div>
  );
}

export default Applicants;
