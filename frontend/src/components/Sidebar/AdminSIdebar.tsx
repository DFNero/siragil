import { LayoutDashboard, Package, Users, FileText } from 'lucide-react';
import { SidebarRoot } from './SidebarRoot';
import { SidebarItem } from './SidebarItem';

interface AdminSidebarProps {
  collapsed: boolean;
}

export const AdminSidebar = ({ collapsed }: AdminSidebarProps) => {
  return (
    <SidebarRoot>
      <SidebarItem
        icon={LayoutDashboard}
        label="Dashboard"
        to="/admin/dashboard"
        collapsed={collapsed}
      />
      <SidebarItem
        icon={Package}
        label="Products"
        to="/admin/products"
        collapsed={collapsed}
      />
      <SidebarItem
        icon={Users}
        label="Users"
        to="/admin/users"
        collapsed={collapsed}
      />
      <SidebarItem
        icon={FileText}
        label="Reports"
        to="/admin/reports"
        collapsed={collapsed}
      />
    </SidebarRoot>
  );
};