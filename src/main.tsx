import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { NextUIProvider } from "@nextui-org/react";

import { ThemeProvider } from "./components/theme-provider";
import { store } from "./app/store";
import "./index.css";

import Auth from "./pages/auth";
import Layout from "./components/layout";
import Posts from "./pages/posts";
import CurrentPost from "./pages/current-post";
import Followers from "./pages/followers";
import Following from "./pages/following";
import UserProfile from "./pages/user-profile";
import { AuthGuard } from "./features/auth-guard";

const container = document.getElementById("root");

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Posts />,
      },
      {
        path: "posts/:id",
        element: <CurrentPost />,
      },
      {
        path: "/followers",
        element: <Followers />,
      },
      {
        path: "/following",
        element: <Following />,
      },
      {
        path: "/users/:id",
        element: <UserProfile />,
      },
    ],
  },
]);

if (container) {
  const root = createRoot(container);

  root.render(
    <StrictMode>
      <Provider store={store}>
        <NextUIProvider>
          <ThemeProvider>
            <AuthGuard>
              <RouterProvider router={router} />
            </AuthGuard>
          </ThemeProvider>
        </NextUIProvider>
      </Provider>
    </StrictMode>,
  );
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
  );
}
