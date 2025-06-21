import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Home = lazy(() => import("@/pages/Home"));
const Applicants = lazy(() => import("@/pages/Applicants"));
const References = lazy(() => import("@/pages/References"));
const Settings = lazy(() => import("@/pages/Settings"));
const Layout = lazy(() => import("@/Layout"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="applicants" element={<Applicants />} />
              <Route path="references" element={<References />} />
              <Route path="settings" element={<Settings />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
