import { Outlet } from 'react-router-dom';
import { OperatorSidebar } from '../components/Sidebar/OperatorSidebar';
import { Header } from '../components/Header/Header';

export const OperatorLayout = () => {
  return (
    <div className="flex h-screen bg-slate-950">
      <OperatorSidebar collapsed={false} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Operator Panel" />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};