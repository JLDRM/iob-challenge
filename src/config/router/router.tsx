import { createBrowserRouter } from "react-router-dom";
import Home from "../../views/Home/Home";
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
      ]
    },
  ]
);

export default router;