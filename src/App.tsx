import "@mantine/core/styles.css";
import "mantine-datatable/styles.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import Layout from "@/layout";
import Home from "@/pages/home";
import Applicant from "@/pages/applicant";
import ApplicantDetails from "@/pages/applicant/ApplicantDetails.tsx";

export function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/applicant">
              <Route index element={<Applicant />} />
              <Route path="add" element={<ApplicantDetails />} />
              <Route path="edit/:id" element={<ApplicantDetails />} />
            </Route>
            <Route path="/" index element={<Home />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </MantineProvider>
  );
}
