import { HandCoins, HandPlatter, User } from "lucide-react";
import { NavLink, Outlet, useMatches } from "react-router-dom";

export default function Layout() {
    const matches = useMatches()
    
    return <div className="flex flex-col h-screen pb-20">
        <div className="grow p-4 overflow-y-auto">
            <Outlet />
        </div>

        <div className="dock dock-lg">
            <NavLink to={"/"} className={`${matches[matches.length - 1].pathname === "/" && "dock-active"}`}>
                <svg className="size-[1.2rem]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt"><polyline points="1 11 12 2 23 11" fill="none" stroke="currentColor" stroke-miterlimit="10" strokeWidth="2"></polyline><path d="m5,13v7c0,1.105.895,2,2,2h10c1.105,0,2-.895,2-2v-7" fill="none" stroke="currentColor" strokeLinecap="square" stroke-miterlimit="10" strokeWidth="2"></path><line x1="12" y1="22" x2="12" y2="18" fill="none" stroke="currentColor" strokeLinecap="square" stroke-miterlimit="10" strokeWidth="2"></line></g></svg>
                <span className="dock-label">Beranda</span>
            </NavLink>

            <NavLink to={"/pesanan"} className={`${matches[matches.length - 1].pathname === "/pesanan" && "dock-active"}`}>
                <HandCoins className="size-[1.2rem]" />
                <span className="dock-label">Pesanan</span>
            </NavLink>

            <NavLink to={"/layanan"} className={`${matches[matches.length - 1].pathname === "/layanan" && "dock-active"}`}>
                <HandPlatter className="size-[1.2rem]" />
                <span className="dock-label">Layanan</span>
            </NavLink>

            <NavLink to={"/profil"} className={`${matches[matches.length - 1].pathname === "/profil" && "dock-active"}`}>
                <User className="size-[1.2rem]" />
                <span className="dock-label">Profile</span>
            </NavLink>
        </div>
    </div>
}
