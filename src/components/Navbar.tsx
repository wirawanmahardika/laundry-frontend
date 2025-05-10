import { ArrowLeft, BarChart3, Book, Footprints, LibraryBig, LogOut, Users } from "lucide-react"
import { useState, type JSX } from "react"
import { motion } from 'framer-motion'
import { NavLink, useNavigate } from "react-router-dom"
import ModalConfirmation, { openModal } from "./Modal"



export default function Sidebar() {
    const navigate = useNavigate()
    const navigations: { title: string; icon: JSX.Element, to?: string; navs?: any[] }[] = [
        {
            title: "Dashboard",
            to: "/",
            icon: <BarChart3 />
        },
        {
            title: "Users",
            to: "/user",
            icon: <Users />
        },
        {
            title: "Steps",
            to: "/step",
            icon: <Footprints />
        },
        {
            title: "Tutorials",
            to: "/tutorial",
            icon: <Book />
        },
        {
            title: "Tutorial Tambahan",
            to: "/tutorial-tambahan",
            icon: <LibraryBig />
        },
    ]

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("role")
        navigate('/login')
    }

    return <div className="shrink-0 basis-1/6 h-full bg-base-200 flex flex-col">
        <div className="p-3 bg-base-300 text-center font-bold text-2xl">ADMIN</div>

        {navigations.map((n, i) => {
            if (n.navs) return <NavDropDown key={i} title={n.title} navigations={n.navs} />
            if (n.to) return <Nav key={i} icon={n.icon} title={n.title} to={n.to} />
        })}

        <div onClick={() => openModal('navbar-modal')} className="bg-base-300 p-4 cursor-pointer hover:bg-base-100 mt-auto">
            <div className="flex gap-x-2 items-center justify-center">
                <LogOut />
                <span className="font-semibold">Logout</span>
            </div>
        </div>

        <ModalConfirmation id="navbar-modal" message="Yakin ingin logout?" clickAction={logout} />
    </div>
}

const Nav = ({ title, to, icon }: { title: string; to: string; icon: JSX.Element }) => {
    return <NavLink to={to} className="bg-base-300 p-2 cursor-pointer hover:bg-base-100 ">
        <div className="flex gap-x-2 items-center">
            {icon}
            <span className="font-semibold mr-auto">{title}</span>
        </div>
    </NavLink>
}

const NavDropDown = ({ title, navigations }: { title: string; navigations: { name: string; to: string; }[] }) => {
    const [open, setOpen] = useState(false)

    let height: string = "0";
    switch (navigations.length) {
        case 1:
            height = "2.5rem"
            break;
        case 2:
            height = "4.5rem"
            break;
        case 3:
            height = "6rem"
            break;
        default:
            break;
    }

    return <>
        <div className="bg-base-300 p-2 cursor-pointer hover:bg-base-100 ">
            <div onClick={() => setOpen(p => !p)} className="flex gap-x-2 items-center">
                <BarChart3 />
                <span className="font-semibold mr-auto">{title}</span>
                <motion.div animate={{ rotate: open ? '-90deg' : "0deg" }} >
                    <ArrowLeft />
                </motion.div>
            </div>
        </div>
        <motion.div animate={{ height: open ? height : 0 }} className="h-24 overflow-hidden">
            <div className="h-full p-2 pl-10 font-medium flex flex-col gap-y-1">
                {navigations.map((n, i) => <NavLink key={i} className={"hover:text-gray-500"} to={n.to}>{n.name}</NavLink>)}
            </div>
        </motion.div>
    </>
}
