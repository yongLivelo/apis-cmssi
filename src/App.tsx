import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const Layout = lazy(() => import("@/layout"));
const Home = lazy(() => import("@/pages/home"));
const Applicant = lazy(() => import("@/pages/applicant"));
const References = lazy(() => import("@/pages/references"));
const Settings = lazy(() => import("@/pages/settings"));

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="applicants" element={<Applicant />} />
            <Route path="references" element={<References />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}
