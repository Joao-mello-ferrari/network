import {
  createBrowserRouter,
  RouterProvider,
  redirect
} from "react-router-dom";
import { authMiddleware } from "./middlewares/auth";
import { Dashboard } from "./pages/Dashboard";
import { SignUp } from "./pages/Signup";
import { Login } from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "signup",
    element: (<SignUp />),
    loader: () => authMiddleware(false,"/dashboard")
  },
  {
    path: "login",
    element: (<Login />),
    loader: () => authMiddleware(false,"/dashboard")
  },
  {
    path: "dashboard",
    element: (<Dashboard />),
    loader: () => authMiddleware(true,"/login")
  },
  {
    path: "*",
    loader: () => redirect('/login')
  },
]);

export function RouterProviderComponent(){
  return(
    <RouterProvider router={router} />
  )
}