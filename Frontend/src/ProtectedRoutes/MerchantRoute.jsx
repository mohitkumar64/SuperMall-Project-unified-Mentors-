import { useAuth } from "../context/AuthProvider";
import { Navigate , Outlet } from "react-router-dom";

function MerchantRoute() {
  const { role, loading } = useAuth();

  if (loading) return null;
  return role === "merchant" ? <Outlet /> : <Navigate to="/login" />;
}

export default MerchantRoute;
