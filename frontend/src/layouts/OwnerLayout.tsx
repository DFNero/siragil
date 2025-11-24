import { Outlet } from 'react-router-dom';
import { OwnerSidebar } from '../components/Sidebar/OwnerSidebar';
import { Header } from '../components/Header/Header';

export const OwnerLayout = () => {
  return (
    <div className="flex h-screen bg-slate-950">
      <OwnerSidebar collapsed={false} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Owner Panel" />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};