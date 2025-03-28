import { Navigate, Outlet, useLocation } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';

export const Root = () => {

  const { pathname } = useLocation();

  if (pathname === '/' || pathname === '/auth') {
    return <Navigate to="/auth/login" />;
  }
  
  return (
    <main>
      <Outlet />
      <ToastContainer position='bottom-center' />
    </main>
  )
}