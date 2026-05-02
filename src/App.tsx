// Import styles of packages that you've installed@
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";

import Applicants from "@/pages/applicants";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "@/pages/home";
export default function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/applicants" element={<Applicants />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}
