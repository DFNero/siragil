import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/UseAuth';
import { AdminLayout } from '../layouts/AdminLayout';
import { KasirLayout } from '../layouts/KasirLayout';
import { OperatorLayout } from '../layouts/OperatorLayout';
import { OwnerLayout } from '../layouts/OwnerLayout';
import { Profile } from '../pages/Shared/Profile';

// Auth Pages - If you already have Login/Register, import them here
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';

// Admin Pages
import AdminDashboard from '../pages/Admin/Dashboard';
import AdminProducts from '../pages/Admin/Products';
import AdminUsers from '../pages/Admin/Users';
import AdminReports from '../pages/Admin/Reports';

// Kasir Pages
import KasirDashboard from '../pages/Kasir/Dashboard';
import KasirPOS from '../pages/Kasir/POS';
import KasirTransactions from '../pages/Kasir/Transactions';

// Operator Pages
import OperatorDashboard from '../pages/Operator/Dashboard';
import OperatorInventory from '../pages/Operator/Inventory';
import OperatorStockUpdate from '../pages/Operator/StockUpdate';

// Owner Pages
import OwnerDashboard from '../pages/Owner/Dashboard';
import OwnerReports from '../pages/Owner/Reports';
import OwnerStaffMonitor from '../pages/Owner/StaffMonitor';

const AppRoutes = () => {
  const { user, isAuthenticated } = useAuth();

  // Redirect to appropriate dashboard based on role
  const getDefaultRoute = () => {
    if (!user) return '/profile';
    
    switch (user.role) {
      case 'owner':
        return '/owner/dashboard';
      case 'admin':
      case 'superadmin':
        return '/admin/dashboard';
      case 'operator':
        return '/operator/dashboard';
      case 'kasir':
        return '/kasir/dashboard';
      default:
        return '/profile';
    }
  };

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  return (
    <Routes>
      {/* Root redirect */}
      <Route path="/" element={<Navigate to={getDefaultRoute()} replace />} />

      {/* Shared Profile Route */}
      <Route path="/profile" element={
        <div className="min-h-screen bg-slate-950 p-6">
          <Profile />
        </div>
      } />

      {/* Admin Routes */}
      {(user?.role === 'admin' || user?.role === 'superadmin') && (
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="reports" element={<AdminReports />} />
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
        </Route>
      )}

      {/* Kasir Routes */}
      {user?.role === 'kasir' && (
        <Route path="/kasir" element={<KasirLayout />}>
          <Route path="dashboard" element={<KasirDashboard />} />
          <Route path="pos" element={<KasirPOS />} />
          <Route path="transactions" element={<KasirTransactions />} />
          <Route index element={<Navigate to="/kasir/dashboard" replace />} />
        </Route>
      )}

      {/* Operator Routes */}
      {user?.role === 'operator' && (
        <Route path="/operator" element={<OperatorLayout />}>
          <Route path="dashboard" element={<OperatorDashboard />} />
          <Route path="inventory" element={<OperatorInventory />} />
          <Route path="stock-update" element={<OperatorStockUpdate />} />
          <Route index element={<Navigate to="/operator/dashboard" replace />} />
        </Route>
      )}

      {/* Owner Routes */}
      {user?.role === 'owner' && (
        <Route path="/owner" element={<OwnerLayout />}>
          <Route path="dashboard" element={<OwnerDashboard />} />
          <Route path="reports" element={<OwnerReports />} />
          <Route path="staff-monitor" element={<OwnerStaffMonitor />} />
          <Route index element={<Navigate to="/owner/dashboard" replace />} />
        </Route>
      )}

      {/* Fallback */}
      <Route path="*" element={<Navigate to={getDefaultRoute()} replace />} />
    </Routes>
  );
};

export default AppRoutes;