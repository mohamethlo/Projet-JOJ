import React from 'react';
import { useAuth } from '@/context/AuthContext';
import SecurityDashboard from '@/components/dashboard/SecurityDashboard';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  if (!user) return null;
  return <SecurityDashboard user={user} />;
};

export default DashboardPage;


