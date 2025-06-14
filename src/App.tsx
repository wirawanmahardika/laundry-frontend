import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Pesanan from "./pages/pesanan/Pesanan";
import Profil from "./pages/profil/Profil";
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
import EditLayanan from "./pages/layanan/EditLayanan";
import DetailPesanan from "./pages/pesanan/DetailPesanan";
import EditProfil from "./pages/profil/EditProfil";

// const router = createHashRouter(
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />

        <Route path="profil" element={<Profil />} />
        <Route path="profil/edit" element={<EditProfil />} />

        <Route path="pesanan" element={<Pesanan />} />
        <Route path="pesanan/tambah" element={<TambahPesanan />} />
        <Route path="pesanan/detail" element={<DetailPesanan />} />

        <Route path="layanan" element={<Layanan />} />
        <Route path="layanan/tambah" element={<TambahLayanan />} />
        <Route path="layanan/edit" element={<EditLayanan />} />

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