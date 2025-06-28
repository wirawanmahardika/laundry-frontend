import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import type { profilType } from "../../types/profilType";
import { AxiosAuth } from "../../utils/axios";
import dayjs from "dayjs";

export default function Profil() {
    useAuth()
    const [profil, setProfil] = useState<profilType>()

    useEffect(() => {
        AxiosAuth.get("/tenant")
            .then(res => setProfil(res.data.data))
    }, [])

    return (
        <div className="container mx-auto max-w-2xl px-4 py-8 flex flex-col gap-y-6 items-center">
            <div className="flex flex-col items-center gap-y-2 w-full">
                <div className="relative">
                    <img
                        className="rounded-full w-28 h-28 object-cover border-4 border-sky-400 shadow-lg"
                        src={profil?.image}
                        alt="Profile"
                    />
                    <span className="absolute bottom-2 right-2 bg-green-400 border-2 border-white rounded-full w-4 h-4 block"></span>
                </div>
                <span className="text-2xl font-bold text-slate-800">{profil?.nama}</span>
                <span className="text-slate-500 text-sm">Laundry Owner</span>
            </div>

            <div className="bg-base-100 rounded-xl p-5 flex flex-col gap-y-3 w-full shadow-lg border border-base-200">
                <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-semibold text-sky-700 flex items-center gap-x-2">
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path fill="#0ea5e9" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Zm0 2c-2.67 0-8 1.34-8 4v2c0 .55.45 1 1 1h14c.55 0 1-.45 1-1v-2c0-2.66-5.33-4-8-4Z" /></svg>
                        Account Details
                    </h2>
                    <NavLink to={"/profil/edit"} className="btn btn-accent btn-xs rounded-full px-4 shadow">Edit Profile</NavLink>
                </div>
                <hr className="border-slate-200" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2 text-slate-700 text-sm">
                    <div className="flex flex-col gap-y-1">
                        <span className="text-slate-500">Fullname</span>
                        <span className="font-medium">{profil?.nama_lengkap}</span>
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <span className="text-slate-500">Email</span>
                        <span className="font-medium">{profil?.email}</span>
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <span className="text-slate-500">Pendapatan</span>
                        <span className="font-medium text-green-600">Rp {(20000000).toLocaleString("id")}</span>
                    </div>
                    <div className="flex flex-col gap-y-1">
                        <span className="text-slate-500">Phone</span>
                        <span className="font-medium">{profil?.phone}</span>
                    </div>
                </div>
            </div>

            {/* Section Subscription */}
            <div className="bg-base-100 rounded-xl p-5 flex flex-col gap-y-3 w-full shadow border border-base-200">
                <div className="flex items-center gap-x-2 mb-2">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                        <path fill="#0ea5e9" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 15h-2v-2h2v2Zm0-4h-2V7h2v6Z" />
                    </svg>
                    <h2 className="text-base sm:text-lg font-semibold text-sky-700">Subscription Info</h2>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-y-2">
                    <div>
                        <span className="text-slate-500 text-sm">Status:</span>
                        {dayjs(profil?.masa_berlaku).isBefore(new Date()) ?
                            <span className="ml-2 font-semibold text-green-600">Active</span> :
                            <span className="ml-2 font-semibold text-red-600">Non Active</span>
                        }
                    </div>
                    <div>
                        <span className="text-slate-500 text-sm">Berlaku sampai:</span>
                        <span className="ml-2 font-semibold text-slate-700">{dayjs(profil?.masa_berlaku).format("D MMM YYYY")}</span>
                    </div>
                </div>
                <div className="flex gap-x-2 mt-2">
                    <button className="btn btn-outline btn-xs btn-info rounded-full">Upgrade</button>
                    <button className="btn btn-outline btn-xs btn-error rounded-full">Cancel</button>
                </div>
            </div>


            <div className="w-full flex justify-end mt-6">
                <button
                    className="btn btn-error btn-sm rounded-full px-6 shadow font-semibold flex items-center gap-x-2"
                    onClick={async () => {
                        const res = await Swal.fire({
                            title: "Logout?",
                            text: "Anda yakin ingin keluar?",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonText: "Ya, Logout",
                            cancelButtonText: "Batal"
                        });
                        if (res.isConfirmed) {
                            localStorage.removeItem("token");
                            window.location.href = "/login";
                        }
                    }}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
                    </svg>
                    Logout
                </button>
            </div>
        </div>
    );
}