import { createBrowserRouter } from "react-router-dom";
import AccountDetails from "../../views/Home/AccountDetails/AccountDetails";
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
          path: "",
          element: <AccountDetails />,
        },
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