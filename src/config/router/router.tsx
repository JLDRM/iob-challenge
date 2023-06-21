import { createBrowserRouter } from "react-router-dom";
import Home from "../../views/Home/Home";
import LogIn from "../../views/LogIn/LogIn";
import SignIn from "../../views/SignIn/SignIn";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "signin",
          element: <SignIn />,
        },
        {
          path: "login",
          element: <LogIn />,
        },
      ]
    },
  ]
);

export default router;