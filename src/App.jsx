import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css';
import Auth from "./pages/auth";
import ButtonTheme from "./components/buttonTheme";
import Home from "./pages/home";

const router = createBrowserRouter(
  [
    { path: "/", element: <><Home /></> },
    { path: "/home", element: <><Home /></> },
    { path: "/login", element: <><Auth route="login" /></> },
    { path: "/signup", element: <><Auth route="signup" /></> },
  ],
  {
    future: {
      v7_startTransition: true,
    },
  }
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ButtonTheme />
    </>
  );
}

export default App;
