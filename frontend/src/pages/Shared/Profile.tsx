// Profile.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/UseAuth';
import { 
  ArrowRight, 
  Mail, 
  User, 
  Shield, 
  Edit, 
  Camera, 
  Lock, 
  Bell, 
  Globe, 
  HelpCircle, 
  LogOut 
} from 'lucide-react';
import '../../styles/profile.css';

export const Profile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  const getDashboardRoute = () => {
    switch (user?.role) {
      case 'owner':
        return '/owner/dashboard';
      case 'admin':
      case 'superadmin':
        return '/admin/dashboard';
      case 'operator':
        return '/operator/dashboard';
      case 'kasir':
        return '/kasir/dashboard';
      default:
        return '/';
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'preferences', label: 'Preferences', icon: Globe },
  ];

  return (
    <div className="profile-root">
      <div className="profile-container">
        {/* Header */}
        <div className="profile-header">
          <div className="profile-header-content">
            <div className="profile-avatar-section">
              <div className="profile-avatar">
                <User size={48} className="profile-avatar-icon" />
                <button className="profile-camera-button">
                  <Camera size={16} />
                </button>
              </div>
              <div className="profile-info">
                <h1 className="profile-name">{user?.name}</h1>
                <p className="profile-role">
                  <Shield size={16} />
                  {user?.role}
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate(getDashboardRoute())}
              className="profile-dashboard-button"
            >
              Go to Dashboard
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="profile-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`profile-tab ${activeTab === tab.id ? 'active' : ''}`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="profile-content">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="profile-section">
              <div className="profile-section-header">
                <h2 className="profile-section-title">Profile Information</h2>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="profile-edit-button"
                >
                  <Edit size={16} />
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>

              <div className="profile-form-grid">
                <div className="profile-form-group">
                  <label className="profile-form-label">Full Name</label>
                  <input
                    type="text"
                    defaultValue={user?.name}
                    disabled={!isEditing}
                    className="profile-form-input"
                  />
                </div>
                <div className="profile-form-group">
                  <label className="profile-form-label">Email</label>
                  <input
                    type="email"
                    defaultValue={user?.email}
                    disabled={!isEditing}
                    className="profile-form-input"
                  />
                </div>
                <div className="profile-form-group">
                  <label className="profile-form-label">Role</label>
                  <input
                    type="text"
                    defaultValue={user?.role}
                    disabled
                    className="profile-form-input"
                  />
                </div>
                <div className="profile-form-group">
                  <label className="profile-form-label">User ID</label>
                  <input
                    type="text"
                    defaultValue={user?.id}
                    disabled
                    className="profile-form-input"
                    style={{ fontFamily: 'monospace' }}
                  />
                </div>
              </div>

              {isEditing && (
                <div className="profile-save-button">
                  <button className="profile-edit-button">
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="profile-section">
              <div className="profile-section-header">
                <h2 className="profile-section-title">Security Settings</h2>
              </div>

              <div className="security-form-group">
                <label>Current Password</label>
                <input
                  type="password"
                  className="security-form-input"
                />
              </div>
              <div className="security-form-group">
                <label>New Password</label>
                <input
                  type="password"
                  className="security-form-input"
                />
              </div>
              <div className="security-form-group">
                <label>Confirm New Password</label>
                <input
                  type="password"
                  className="security-form-input"
                />
              </div>

              <div className="profile-save-button">
                <button className="profile-edit-button">
                  Update Password
                </button>
              </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="profile-section">
              <div className="profile-section-header">
                <h2 className="profile-section-title">Notification Preferences</h2>
              </div>

              <div className="notification-item">
                <div className="notification-info">
                  <h3>Email Notifications</h3>
                  <p>Receive email updates about your account activity</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="notification-item">
                <div className="notification-info">
                  <h3>Push Notifications</h3>
                  <p>Receive push notifications on your device</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" defaultChecked />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="notification-item">
                <div className="notification-info">
                  <h3>SMS Notifications</h3>
                  <p>Receive SMS updates about your account</p>
                </div>
                <label className="toggle-switch">
                  <input type="checkbox" />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          )}

          {/* Preferences Tab */}
          {activeTab === 'preferences' && (
            <div className="profile-section">
              <div className="profile-section-header">
                <h2 className="profile-section-title">Preferences</h2>
              </div>

              <div className="profile-form-group">
                <label className="profile-form-label">Language</label>
                <select className="preference-select">
                  <option>English</option>
                  <option>Indonesian</option>
                </select>
              </div>

              <div className="profile-form-group">
                <label className="profile-form-label">Timezone</label>
                <select className="preference-select">
                  <option>UTC+7 (Jakarta)</option>
                  <option>UTC+8 (Singapore)</option>
                  <option>UTC+9 (Tokyo)</option>
                </select>
              </div>

              <div className="profile-form-group">
                <label className="profile-form-label">Date Format</label>
                <select className="preference-select">
                  <option>MM/DD/YYYY</option>
                  <option>DD/MM/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="profile-footer">
          <div className="profile-footer-actions">
            <button className="profile-footer-button help">
              <HelpCircle size={16} />
              Help & Support
            </button>
            <button className="profile-footer-button logout">
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};