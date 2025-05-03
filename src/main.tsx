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
import { EPathPages } from "@/enums";

const container = document.getElementById("root");

const router = createBrowserRouter([
  {
    path: EPathPages.AUTH,
    element: <Auth />,
  },
  {
    path: EPathPages.LAYOUT,
    element: <Layout />,
    children: [
      {
        path: EPathPages.POSTS,
        element: <Posts />,
      },
      {
        path: EPathPages.CURRENT_POST,
        element: <CurrentPost />,
      },
      {
        path: EPathPages.FOLLOWERS,
        element: <Followers />,
      },
      {
        path: EPathPages.FOLLOWING,
        element: <Following />,
      },
      {
        path: EPathPages.USER_PROFILE,
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
