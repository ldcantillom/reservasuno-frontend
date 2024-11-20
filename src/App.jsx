import { createBrowserRouter,  RouterProvider } from "react-router-dom";
import './App.css';
import Auth from "./pages/auth";

const router  = createBrowserRouter(
  [
    {path: "/", element: <></>},
    {path: "/login", element: <><Auth route="login"></Auth></>},
    {path: "/signup", element: <><Auth route="signup"></Auth></>}
  ],
  {
    future: {
      v7_startTransition: true,
    },
  }
);

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
