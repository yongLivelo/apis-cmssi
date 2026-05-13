// Import styles of packages that you've installed@
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "mantine-datatable/styles.layer.css";
import { MantineProvider } from "@mantine/core";

import SearchApplicants from "@/pages/applicants/searchApplicants";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "@/pages/home";
import Layout from "@/layout";
import AddApplicants from "@/pages/applicants/addApplicants";
import References from "@/pages/references";
import Settings from "@/pages/settings";
export default function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route index element={<Home />} />
            <Route path="Reference" element={<References />} />
            <Route path="Settings" element={<Settings />} />
            <Route path="applicants/">
              <Route path="add/" element={<AddApplicants />} />
              <Route path="search/" element={<SearchApplicants />} />
            </Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </MantineProvider>
  );
}
