import { Outlet } from 'react-router-dom';
import { KasirSidebar } from '../components/Sidebar/KasirSidebar';
import { Header } from '../components/Header/Header';

export const KasirLayout = () => {
  return (
    <div className="flex h-screen bg-slate-950">
      <KasirSidebar collapsed={false} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Kasir Panel" />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};