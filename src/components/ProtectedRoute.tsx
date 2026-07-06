import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const { isLogin } = useAuth();
  if (!isLogin) return <Navigate to="/" replace />;

  return <Outlet />;
}
