import React, { FC, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Login } from "./pages/login";
import { Register } from "./pages/Register";
import { AUTH_TOKEN } from "./utilities/consts";
import { CalendarView } from "./pages/CalendarView";

interface RouteModel {
  key: string;
  title: string;
  path: string;
  enabled: boolean;
  component: FC<{}>;
}
const guestRoutes: Array<RouteModel> = [
  {
    key: "login",
    title: "Login",
    path: "/login",
    enabled: true,
    component: Login,
  },
  {
    key: "register",
    title: "Register",
    path: "/register",
    enabled: true,
    component: Register,
  },
];
export const ProtectedRoutes: Array<RouteModel> = [
  {
    key: "home-route",
    title: "Home",
    path: "/",
    enabled: true,
    component: Home,
  },
  {
    key: "calendar-view",
    title: "Calendar View",
    path: "/calendar-view",
    enabled: true,
    component: CalendarView,
  },
];

export const AppRoutes: Array<RouteModel> = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem(AUTH_TOKEN)) {
      navigate("#/login");
    }
  }, []);
  return (
    <Routes>
      <Route>
        {guestRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
          />
        ))}
      </Route>

      {ProtectedRoutes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={<route.component />}
        />
      ))}

      <Route path="*" element={() => <div>Not defined</div>} />
    </Routes>
  );
};
