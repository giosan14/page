import { createBrowserRouter } from "react-router-dom";
import { Root } from "../Root";
import DashboardLayout from "../layout/DashboardLayout";
import RedirectBasedOnRole from "./RedirectBasedOnRole";
import { AuthLayout } from "../layout/AuthLayout";
import { LoginPage } from "../pages/Auth/LoginPage";
import { ForgotPassword } from "../pages/Auth/ForgotPassword";
import { ResetPassword } from "../pages/Auth/ResetPassword";
import { Register } from "../pages/Auth/Register";
import Welcome from "../pages/Auth/Welcome";
import { CreateAccount } from "../pages/Auth/CreateAccount";
import { EmailValidate } from "../pages/Auth/EmailValidate";
import DoctorForm from "../pages/Auth/DoctorForm";
import ResidenceDetailsForm from "../pages/Auth/ResidenceDetailsForm";
import { PhoneValidate } from "../pages/Auth/PhoneValidate";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      /// Dashboard Routes
      {
        index: true,
        element: <RedirectBasedOnRole />,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
      },

      /// Auth Routes
      {
        path: "auth",
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "forgot-password",
            element: <ForgotPassword />,
          },
          {
            path: "reset-password",
            element: <ResetPassword />,
          },
          {
            path: "create-account",
            element: <CreateAccount />,
          },
          {
            path: "register",
            element: <Register />,
          },
          {
            path: "welcome",
            element: <Welcome />,
          },
          {
            path: "email-validate",
            element: <EmailValidate />,
          },
          {
            path: "phone-validate",
            element: <PhoneValidate />,
          },
          {
            path: "data-doctor",
            element: <DoctorForm />,
          },
          {
            path: "data-residence",
            element: <ResidenceDetailsForm />,
          },
        ],
      },
    ],
  },
]);
