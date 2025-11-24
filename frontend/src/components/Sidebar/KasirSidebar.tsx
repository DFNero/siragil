import { LayoutDashboard, ShoppingCart, Receipt } from 'lucide-react';
import { SidebarRoot } from './SidebarRoot';
import { SidebarItem } from './SidebarItem';

interface KasirSidebarProps {
  collapsed: boolean;
}

export const KasirSidebar = ({ collapsed }: KasirSidebarProps) => {
  return (
    <SidebarRoot>
      <SidebarItem
        icon={LayoutDashboard}
        label="Dashboard"
        to="/kasir/dashboard"
        collapsed={collapsed}
      />
      <SidebarItem
        icon={ShoppingCart}
        label="Point of Sale"
        to="/kasir/pos"
        collapsed={collapsed}
      />
      <SidebarItem
        icon={Receipt}
        label="Transactions"
        to="/kasir/transactions"
        collapsed={collapsed}
      />
    </SidebarRoot>
  );
};