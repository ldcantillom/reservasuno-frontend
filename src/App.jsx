import { createBrowserRouter,  RouterProvider } from "react-router-dom";
import './App.css'

const router  = createBrowserRouter(
  [
    {path: "/", element: <></>},
  ],
  {
    future: {
      v7_startTransition: true,
    },
  }
)

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App
