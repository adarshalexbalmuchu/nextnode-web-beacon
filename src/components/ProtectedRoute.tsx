
import React from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import LoadingPage from "./LoadingPage";

export default function ProtectedRoute({ requiredRole = "admin", children }: { requiredRole?: "admin" | "author" | "user", children: React.ReactNode }) {
  const { user, loading, role } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!loading && (!user || (requiredRole && role !== requiredRole))) {
      navigate("/", { replace: true });
    }
  }, [loading, user, role, requiredRole, navigate]);

  if (loading || !user)
    return <LoadingPage />;
  if (requiredRole && role !== requiredRole)
    return null;

  return <>{children}</>;
}
