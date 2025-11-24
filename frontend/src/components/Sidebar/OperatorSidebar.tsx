import { LayoutDashboard, Archive, TrendingUp } from 'lucide-react';
import { SidebarRoot } from './SidebarRoot';
import { SidebarItem } from './SidebarItem';

interface OperatorSidebarProps {
  collapsed: boolean;
}

export const OperatorSidebar = ({ collapsed }: OperatorSidebarProps) => {
  return (
    <SidebarRoot>
      <SidebarItem
        icon={LayoutDashboard}
        label="Dashboard"
        to="/operator/dashboard"
        collapsed={collapsed}
      />
      <SidebarItem
        icon={Archive}
        label="Inventory"
        to="/operator/inventory"
        collapsed={collapsed}
      />
      <SidebarItem
        icon={TrendingUp}
        label="Stock Update"
        to="/operator/stock-update"
        collapsed={collapsed}
      />
    </SidebarRoot>
  );
};