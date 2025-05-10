import { Outlet } from "react-router-dom";
import Sidebar from "./Navbar";

export default function Layout() {
    return <div className="flex h-screen">
        <Sidebar />
        <div className="w-full p-5">
            <Outlet />
        </div>
    </div>
}
