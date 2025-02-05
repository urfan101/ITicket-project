import MainLayout from '@/presentation/layouts/MainLayout';
import HomePage from '@presentation/pages/HomePage.tsx';
import Login from '@/presentation/pages/accountManaging/Login/Login';
import Register from '@/presentation/pages/accountManaging/Register/Register';
import ForgetPassword from '@/presentation/pages/accountManaging/ForgetPassword/ForgetPassword';
import { RouteObject } from 'react-router-dom';


export enum AppRoutes {
  HOME = 'main',
  ABOUT = 'about',
  NOT_FOUND = 'not_found',
  LOGIN = 'login',
  REGISTER = 'register',
  FORGET_PASSWORD = 'forget_password',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.HOME]: '/',
  [AppRoutes.ABOUT]: '/about',
  [AppRoutes.NOT_FOUND]: '*',
  [AppRoutes.LOGIN]: '/login',
  [AppRoutes.REGISTER]: '/register',
  [AppRoutes.FORGET_PASSWORD]: '/forgetPassword',
};

export const routeConfig: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: RoutePath.main, element: <HomePage /> },
      { path: RoutePath.login, element: <Login/>},
      { path: RoutePath.register, element: <Register/>},
      { path: RoutePath.forget_password, element: <ForgetPassword/>},
      // { path: RoutePath.about, element: <AboutPage /> },
      // { path: RoutePath.NOT_FOUND, element: <NotFoundPage /> },
    ],
  },
];