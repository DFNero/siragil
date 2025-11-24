import { LayoutDashboard, FileText, Users } from 'lucide-react';
import { SidebarRoot } from './SidebarRoot';
import { SidebarItem } from './SidebarItem';

interface OwnerSidebarProps {
  collapsed: boolean;
}

export const OwnerSidebar = ({ collapsed }: OwnerSidebarProps) => {
  return (
    <SidebarRoot>
      <SidebarItem
        icon={LayoutDashboard}
        label="Dashboard"
        to="/owner/dashboard"
        collapsed={collapsed}
      />
      <SidebarItem
        icon={FileText}
        label="Reports"
        to="/owner/reports"
        collapsed={collapsed}
      />
      <SidebarItem
        icon={Users}
        label="Staff Monitor"
        to="/owner/staff-monitor"
        collapsed={collapsed}
      />
    </SidebarRoot>
  );
};