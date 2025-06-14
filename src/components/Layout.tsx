import { HandPlatter, User } from "lucide-react";
import { BiCart } from "react-icons/bi";
import { TbUsersGroup } from "react-icons/tb";
import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
    return (
        <div className="flex flex-col h-screen pb-20">
            <div className="grow p-4 overflow-y-auto">
                <Outlet />
            </div>

            <nav className="fixed bottom-0 left-0 right-0 z-50 bg-base-100/95 border-t border-base-200 shadow-lg flex justify-around items-center py-2 backdrop-blur-md">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `flex flex-col items-center gap-1 px-2 py-1 transition-all duration-150 rounded-lg 
                        ${isActive ? "text-sky-600 bg-sky-50 shadow font-bold" : "text-slate-500 hover:text-sky-500"}`
                    }
                >
                    <svg className="size-[1.4rem]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt"><polyline points="1 11 12 2 23 11" fill="none" stroke="currentColor" strokeMiterlimit="10" strokeWidth="2"></polyline><path d="m5,13v7c0,1.105.895,2,2,2h10c1.105,0,2-.895,2-2v-7" fill="none" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="2"></path><line x1="12" y1="22" x2="12" y2="18" fill="none" stroke="currentColor" strokeLinecap="square" strokeMiterlimit="10" strokeWidth="2"></line></g></svg>
                    <span className="text-[0.7rem]">Beranda</span>
                </NavLink>

                <NavLink
                    to="/member"
                    className={({ isActive }) =>
                        `flex flex-col items-center gap-1 px-2 py-1 transition-all duration-150 rounded-lg 
                        ${isActive ? "text-sky-600 bg-sky-50 shadow font-bold" : "text-slate-500 hover:text-sky-500"}`
                    }
                >
                    <TbUsersGroup className="size-[1.4rem]" />
                    <span className="text-[0.7rem]">Member</span>
                </NavLink>

                <NavLink
                    to="/pesanan"
                    className={({ isActive }) =>
                        `flex flex-col items-center gap-1 px-2 py-1 transition-all duration-150 rounded-lg 
                        ${isActive ? "text-sky-600 bg-sky-50 shadow font-bold" : "text-slate-500 hover:text-sky-500"}`
                    }
                >
                    <BiCart className="size-[1.4rem]" />
                    <span className="text-[0.7rem]">Pesanan</span>
                </NavLink>

                <NavLink
                    to="/layanan"
                    className={({ isActive }) =>
                        `flex flex-col items-center gap-1 px-2 py-1 transition-all duration-150 rounded-lg 
                        ${isActive ? "text-sky-600 bg-sky-50 shadow font-bold" : "text-slate-500 hover:text-sky-500"}`
                    }
                >
                    <HandPlatter className="size-[1.4rem]" />
                    <span className="text-[0.7rem]">Layanan</span>
                </NavLink>

                <NavLink
                    to="/profil"
                    className={({ isActive }) =>
                        `flex flex-col items-center gap-1 px-2 py-1 transition-all duration-150 rounded-lg 
                        ${isActive ? "text-sky-600 bg-sky-50 shadow font-bold" : "text-slate-500 hover:text-sky-500"}`
                    }
                >
                    <User className="size-[1.4rem]" />
                    <span className="text-[0.7rem]">Profil</span>
                </NavLink>
            </nav>
        </div>
    );
}