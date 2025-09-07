import React, { useState } from 'react';
import AdminLayout from './AdminLayout';
import Dashboard from './Dashboard';
import ContentEditor from './ContentEditor';
import StaffManager from './StaffManager';
import AssetManager from './AssetManager';
import PermissionsManager from './PermissionsManager';
import AuditLogs from './AuditLogs';
import DiscordIntegration from './DiscordIntegration';
import Settings from './Settings';

const AdminPanel: React.FC = () => {
  const [activeSection, setActiveSection] = useState('dashboard');

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'content':
        return <ContentEditor />;
      case 'staff':
        return <StaffManager />;
      case 'assets':
        return <AssetManager />;
      case 'permissions':
        return <PermissionsManager />;
      case 'logs':
        return <AuditLogs />;
      case 'discord':
        return <DiscordIntegration />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AdminLayout 
      activeSection={activeSection} 
      onSectionChange={setActiveSection}
    >
      {renderContent()}
    </AdminLayout>
  );
};

export default AdminPanel;