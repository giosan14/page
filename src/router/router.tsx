import { createBrowserRouter } from 'react-router-dom';
import { Root } from '../Root';
import DashboardLayout from '../layout/DashboardLayout';
import RedirectBasedOnRole from './RedirectBasedOnRole';
import { AuthLayout } from '../layout/AuthLayout';
import { LoginPage } from '../pages/Auth/LoginPage';
import { ForgotPassword } from '../pages/Auth/ForgotPassword';
import { ResetPassword } from '../pages/Auth/ResetPassword';
import { Register } from '../pages/Auth/Register';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      /// Dashboard Routes
      {
        index: true,
        element: <RedirectBasedOnRole />,
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
      },
  
      /// Auth Routes
      {
        path: 'auth',
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            element: <LoginPage />,
          },
          {
            path: 'forgot-password',
            element: <ForgotPassword />,
          },
          {
            path: 'reset-password',
            element: <ResetPassword />,
          },
          {
            path: 'register',
            element: <Register />,
          },
        ],
      },
    ],
  },
]);