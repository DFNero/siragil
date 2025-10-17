// src/routes/AppRoutes.tsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import type { ReactElement } from "react";
import Login from "../pages/Login";
import AdminTest from "../pages/AdminTest";
import KasirTest from "../pages/KasirTest";
import { useAuth } from "../context/UseAuth";

const PrivateRoute = ({ children, role }: { children: ReactElement; role: string }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (user.role !== role) return <Navigate to="/login" />;
  return children;
};

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/admin"
        element={
          <PrivateRoute role="admin">
            <AdminTest />
          </PrivateRoute>
        }
      />
      <Route
        path="/kasir"
        element={
          <PrivateRoute role="kasir">
            <KasirTest />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;