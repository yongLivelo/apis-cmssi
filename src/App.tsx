// Import styles of packages that you've installed@
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import "mantine-datatable/styles.layer.css";
import { MantineProvider } from "@mantine/core";

import Applicants from "@/pages/applicants";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "@/pages/home";
import Layout from "@/pages/layout";
export default function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/applicants" element={<Applicants />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </MantineProvider>
  );
}
