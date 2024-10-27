// ProtectedRoute.tsx
import React from 'react';
// import { useRole } from '../helpers/useRole'; 
import RedirectBasedOnRole from './RedirectBasedOnRole'; 

interface ProtectedRouteProps {
  allowedRoles: string[];
  children?: React.ReactNode; 
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const userRole = "";

  if (!allowedRoles.includes(userRole)) {
    return <RedirectBasedOnRole />;
  }

  return <>{children}</>; 
};

export default ProtectedRoute;
