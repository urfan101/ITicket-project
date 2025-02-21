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
import Categories from "@/presentation/pages/admin/Categories/Categories";
import EditCategorie from "@/presentation/pages/admin/EditCategorie/EditCategorie";
import Venues from "@/presentation/pages/admin/Venues/Venues";
import EditVenues from "@/presentation/pages/admin/EditVenues/EditVenue";
import Events from "@/presentation/pages/admin/Events/Events";
import EditEvent from "@/presentation/pages/admin/EditEvents/EditEvents";

export enum AppRoutes {
  HOME = "main",
  LOGIN = "login",
  REGISTER = "register",
  FORGET_PASSWORD = "forget_password",
  CONFIRM_ACCOUNT = "confirm_account",
  RESET_PASSWORD = "reset_password",
  PROFILE = "profile",
  ADMIN_DASHBOARD = "admin_dashboard",
  ADMIN_CATEGORIES = "admin_categories",
  ADMIN_EDIT_CATEGORIE = "admin_edit_categorie",
  ADMIN_VENUES = "admin_venues",
  ADMIN_EDIT_VENUE = "admin_edit_venue",
  ADMIN_EVENTS = "admin_events",
  ADMIN_EDIT_EVENT = "admin_edit_event",
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
  [AppRoutes.ADMIN_CATEGORIES]: "/categories",
  [AppRoutes.ADMIN_EDIT_CATEGORIE]: "/editCategorie",
  [AppRoutes.ADMIN_VENUES]: "/venues",
  [AppRoutes.ADMIN_EDIT_VENUE]: "/editVenue",
  [AppRoutes.ADMIN_EVENTS]: "/events",
  [AppRoutes.ADMIN_EDIT_EVENT]: "/editEvent",
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
      { path: "categories", element: <Categories /> },
      { path: "editCategories/:categoryId", element: <EditCategorie /> },
      { path: "venues", element: <Venues /> },
      { path: "editVenues/:venueId", element: <EditVenues /> },
      { path: "events", element: <Events/>},
      { path: "editEvents/:eventId", element: <EditEvent /> },
    ],
  },
];
