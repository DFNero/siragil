import { Outlet } from 'react-router-dom';
import { AdminSidebar } from '../components/Sidebar/AdminSIdebar';
import { Header } from '../components/Header/Header';

export const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-slate-950">
      <AdminSidebar collapsed={false} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Admin Panel" />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};