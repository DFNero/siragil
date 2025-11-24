// SidebarItem.tsx
import { NavLink } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import '../../styles/Sidebar.css';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  to: string;
  collapsed: boolean;
}

export const SidebarItem = ({ icon: Icon, label, to, collapsed }: SidebarItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `sidebar-item ${isActive ? 'active' : ''} ${collapsed ? 'collapsed' : ''}`
      }
      title={collapsed ? label : ''}
    >
      <Icon size={20} className="sidebar-item-icon" />
      <span className="sidebar-item-label">{label}</span>
    </NavLink>
  );
};