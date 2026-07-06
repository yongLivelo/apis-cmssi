import Layout from "@/layout";
import ApplicantForm from "@/pages/applicant/form";
import ApplicantList from "@/pages/applicant/list";
import Home from "@/pages/home";
import Login from "@/pages/login/Login";
import References from "@/pages/references";
import Settings from "@/pages/settings";
import ProtectedRoute from "@/components/ProtectedRoute";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import "mantine-datatable/styles.layer.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthProvider from "@/context/AuthContext";
export default function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <Notifications />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                <Route path="home/" element={<Home />} />
                <Route path="references/" element={<References />} />
                <Route path="settings/" element={<Settings />} />
                <Route path="applicants/">
                  <Route index element={<ApplicantList />} />
                  <Route path="add/" element={<ApplicantForm />} />
                  <Route path="edit/" element={<Navigate to="/applicants/" replace />} />
                  <Route path="edit/:id" element={<ApplicantForm />} />
                </Route>
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </MantineProvider>
  );
}
