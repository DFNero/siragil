// Header.tsx
import { useState } from 'react';
import { LogOut, Bell, Search, User, ChevronDown, Settings, HelpCircle } from 'lucide-react';
import { useAuth } from '../../hooks/UseAuth';
import { useNavigate } from 'react-router-dom';
import '../../styles/header.css';

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setShowUserMenu(false);
  };

  const notifications = [
    { id: 1, message: 'New order received', time: '5 minutes ago', read: false },
    { id: 2, message: 'Product inventory low', time: '1 hour ago', read: false },
    { id: 3, message: 'System update available', time: '1 day ago', read: true },
  ];

  return (
    <header className="header-root">
      <div>
        <h1 className="header-title">{title}</h1>
      </div>
      
      <div className="header-actions">
        
        {/* Notifications */}
        <div className="header-notification">
          <Bell size={20} />
          {notifications.filter(n => !n.read).length > 0 && (
            <span className="header-notification-badge"></span>
          )}
        </div>
        
        {/* User Menu */}
        <div className="header-user">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="header-user-button"
          >
            <div className="header-user-avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <ChevronDown size={16} />
          </button>
          
          {showUserMenu && (
            <div className="header-user-menu">
              <button
                onClick={handleProfileClick}
                className="header-user-menu-item"
              >
                <User size={16} />
                Profile
              </button>
              <button className="header-user-menu-item">
                <Settings size={16} />
                Settings
              </button>
              <button className="header-user-menu-item">
                <HelpCircle size={16} />
                Help & Support
              </button>
              <div className="header-user-menu-divider"></div>
              <button
                onClick={handleLogout}
                className="header-user-menu-item"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};