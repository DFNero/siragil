// SidebarRoot.tsx
import { useState } from 'react';
import type { ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import logo from '../../assets/siragil.jpg';
import '../../styles/Sidebar.css';

interface SidebarRootProps {
  children: ReactNode;
}

export const SidebarRoot = ({ children }: SidebarRootProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <aside className={`sidebar-root ${collapsed ? 'collapsed' : 'expanded'}`}>
      {/* Logo Section */}
      <div className="sidebar-header">
        <button
          onClick={toggleCollapse}
          className="sidebar-toggle"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <img
            src={logo}
            alt="SIRAGIL Logo"
            className={`sidebar-logo ${collapsed ? 'collapsed' : ''}`}
          />
        </button>
        <button
          onClick={toggleCollapse}
          className="sidebar-toggle"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="sidebar-nav">
        {children}
      </nav>
    </aside>
  );
};

export type { SidebarRootProps };