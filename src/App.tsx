import Layout from "./components/Layout";
import Home from "./pages/Home";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
    </>
  )
)

export default function App() {
  return <RouterProvider router={router} />
}