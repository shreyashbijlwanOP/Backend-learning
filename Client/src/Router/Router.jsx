import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import { HomePage, LoginPage, Profile, Register } from "../pages";
import { ProtectedRoute } from "../shared";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        index: true,
        element: <HomePage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <Register />,
      },
      // Protected Route
      {
        path: "",
        element: <ProtectedRoute />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
      {
        path: "*",
        element: <div className="text-center">Oops Page Not Found</div>,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
