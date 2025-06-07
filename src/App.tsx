import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Pesanan from "./pages/Pesanan";
import Profil from "./pages/Profile";
import {
  createBrowserRouter,
  // createHashRouter,
  createRoutesFromElements, 
  Route, 
  RouterProvider
} from "react-router-dom";
import Layanan from "./pages/Layanan";

// const router = createHashRouter(
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="pesanan" element={<Pesanan />} />
        <Route path="profil" element={<Profil />} />
        <Route path="layanan" element={<Layanan />} />
      </Route>
    </>
  )
)

export default function App() {
  return <RouterProvider router={router} />
}