import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/sonner";

const Layout = lazy(() => import("@/layout"));
const Home = lazy(() => import("@/pages/home"));
const Applicant = lazy(() => import("@/pages/applicant"));
const ApplicantForm = lazy(() => import("@/pages/applicantForm"));
const References = lazy(() => import("@/pages/references"));
const Settings = lazy(() => import("@/pages/settings"));

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="applicants">
              <Route index element={<Applicant />} />
              <Route path="adding applicant" element={<ApplicantForm />} />
              <Route path="editing applicant" element={<ApplicantForm />} />
            </Route>
            <Route path="references" element={<References />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </Suspense>
      </Layout>
      <Toaster />
    </BrowserRouter>
  );
}
