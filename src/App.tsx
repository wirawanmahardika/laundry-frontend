import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Pesanan from "./pages/pesanan/Pesanan";
import Profil from "./pages/Profile";
import {
  createBrowserRouter,
  // createHashRouter,
  createRoutesFromElements, 
  Route, 
  RouterProvider
} from "react-router-dom";
import Layanan from "./pages/layanan/Layanan";
import TambahLayanan from "./pages/layanan/TambahLayanan";
import TambahPesanan from "./pages/pesanan/TambahPesanan";
import Member from "./pages/member/Member";
import TambahMember from "./pages/member/TambahMember";
import DetailMember from "./pages/member/DetailMember";

// const router = createHashRouter(
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="profil" element={<Profil />} />

        <Route path="pesanan" element={<Pesanan />} />
        <Route path="pesanan/tambah" element={<TambahPesanan />} />

        <Route path="layanan" element={<Layanan />} />
        <Route path="layanan/tambah" element={<TambahLayanan />} />

        <Route path="member" element={<Member />} />
        <Route path="member/tambah" element={<TambahMember />} />
        <Route path="member/detail" element={<DetailMember />} />
      </Route>
    </>
  )
)

export default function App() {
  return <RouterProvider router={router} />
}