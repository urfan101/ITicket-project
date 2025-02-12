import MainLayout from "@/presentation/layouts/MainLayout";
import AdminLayout from "@/presentation/layouts/AdminLayout";
import HomePage from "@presentation/pages/HomePage.tsx";
import Login from "@/presentation/pages/accountManaging/Login/Login";
import Register from "@/presentation/pages/accountManaging/Register/Register";
import ForgetPassword from "@/presentation/pages/accountManaging/ForgetPassword/ForgetPassword";
import ConfirmPassword from "@/presentation/pages/accountManaging/ConfirmPassword/ConfirmPassword";
import ResetPassword from "@/presentation/pages/accountManaging/ResetPassword/ResetPassword";
import Profile from "@/presentation/pages/Profile/Profile";
import AdminDashboard from "@/presentation/pages/admin/AdminDashboard/AdminDashboard";
import { RouteObject } from "react-router-dom";

export enum AppRoutes {
  HOME = "main",
  LOGIN = "login",
  REGISTER = "register",
  FORGET_PASSWORD = "forget_password",
  CONFIRM_ACCOUNT = "confirm_account",
  RESET_PASSWORD = "reset_password",
  PROFILE = "profile",
  ADMIN_DASHBOARD = "admin_dashboard",
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: "/",
  [AppRoutes.LOGIN]: "/login",
  [AppRoutes.REGISTER]: "/register",
  [AppRoutes.FORGET_PASSWORD]: "/forgetPassword",
  [AppRoutes.CONFIRM_ACCOUNT]: "/confirm-email",
  [AppRoutes.RESET_PASSWORD]: "/reset-password",
  [AppRoutes.PROFILE]: "/profile",
  [AppRoutes.ADMIN_DASHBOARD]: "/admin",
};

export const routeConfig: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: RoutePath.main, element: <HomePage /> },
      { path: RoutePath.login, element: <Login /> },
      { path: RoutePath.register, element: <Register /> },
      { path: RoutePath.forget_password, element: <ForgetPassword /> },
      { path: RoutePath.confirm_account, element: <ConfirmPassword /> },
      { path: RoutePath.reset_password, element: <ResetPassword /> },
      { path: RoutePath.profile, element: <Profile /> }, 
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { path: RoutePath.admin_dashboard, element: <AdminDashboard /> },
    ],
  },
];
