import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const userStr = localStorage.getItem("user");
  let user = null;

  try {
    user = userStr ? JSON.parse(userStr) : null;
  } catch (e) {
    user = null;
  }

  if (!user || user.role !== "ADMIN") {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default AdminRoute;
