import dayjs from "dayjs";
import memberIcon from "../../assets/img/member.png"
import { IoAdd } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import useAuth from "../../hooks/useAuth";
import memberReducer from "../../hooks/reducer/member";
import { AxiosAuth } from "../../utils/axios";
import Swal from "sweetalert2";

export default function Member() {
    useAuth()
    const [showDelete, setShowDelete] = useState(false);
    const [selectedMember, setSelectedMember] = useState<{ id: number; name: string } | null>(null);
    const [members, dispatch] = useReducer(memberReducer, [])

    useEffect(() => {
        AxiosAuth.get("/members").then(res => dispatch({ type: "get-all", payload: res.data.data }))
    }, [])

    const handleDelete = (id: number, name: string) => {
        setSelectedMember({ id, name })
        setShowDelete(true);
    };

    const confirmDelete = async () => {
        try {
            if (selectedMember) {
                const res = await AxiosAuth.delete("/member/" + selectedMember?.id)
                if (selectedMember) dispatch({ type: "delete", payload: selectedMember?.id })
                setShowDelete(false);
                setSelectedMember(null);
                Swal.fire({ text: res.data.message, icon: "success" })
            }
        } catch (error: any) {
            await Swal.fire({
                icon: "error",
                text: Array.isArray(error.response?.data?.errors)
                    ? error.response.data.errors.join(", ")
                    : error.response?.data?.message ?? "Terjadi kesalahan saat mengupdate data member"
            })
        }
    };

    return (
        <div className="container mx-auto max-w-4xl px-2 text-xs flex flex-col gap-y-4 py-4">
            <div className="flex justify-between items-center mb-2">
                <h2 className="font-bold text-2xl text-sky-700">Daftar Member</h2>
                <NavLink to={"/member/tambah"} className="btn btn-sm btn-primary flex items-center gap-x-1 shadow">
                    <IoAdd size={16} />
                    <span>Tambah Member</span>
                </NavLink>
            </div>

            <Filter />

            <div className="flex flex-col gap-y-3">
                {members.map((m, i) => (
                    <Card
                        key={i}
                        id={m.id}
                        nama={m.nama}
                        createdAt={m.created_at}
                        email={m.email}
                        whatsapp={m.whatsapp}
                        onDelete={() => handleDelete(m.id, m.nama)}
                    />
                ))}
            </div>

            <div className="join mx-auto mt-4">
                <button className="join-item btn btn-sm bg-base-100/90 border border-base-300 text-sky-700 shadow hover:bg-sky-100">
                    «
                </button>
                <button className="join-item btn btn-sm bg-base-100/90 border border-base-300 text-sky-700 shadow hover:bg-sky-100">
                    Page 22
                </button>
                <button className="join-item btn btn-sm bg-base-100/90 border border-base-300 text-sky-700 shadow hover:bg-sky-100">
                    »
                </button>
            </div>

            {/* Popup Konfirmasi Hapus */}
            {showDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                    <div className="bg-base-100 rounded-xl shadow-lg p-6 w-full max-w-xs border border-base-300 flex flex-col items-center">
                        <div className="font-bold text-lg text-rose-600 mb-2">Hapus Member?</div>
                        <div className="text-center mb-4 text-slate-700">
                            Apakah Anda yakin ingin menghapus member <span className="font-semibold">{selectedMember?.name}</span>?
                        </div>
                        <div className="flex gap-x-2 mt-2">
                            <button
                                className="btn btn-error btn-sm rounded-full"
                                onClick={confirmDelete}
                            >
                                Ya, Hapus
                            </button>
                            <button
                                className="btn btn-ghost btn-sm rounded-full"
                                onClick={() => setShowDelete(false)}
                            >
                                Batal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

type CardProps = {
    id: number;
    nama: string;
    createdAt: Date;
    email?: string;
    whatsapp?: string;
    onDelete?: () => void;
};

function Card({ id, nama, createdAt, email, whatsapp, onDelete }: CardProps) {
    return (
        <div className="grid grid-cols-5 gap-3 bg-base-100 shadow-md rounded-xl p-4 items-center border border-base-200">
            <div className="col-span-1 flex justify-center">
                <img src={memberIcon} alt="member-icon" className="w-14 h-14 rounded-full object-cover border-2 border-sky-200 shadow" />
            </div>
            <div className="col-span-4 flex flex-col sm:flex-row sm:items-center justify-between gap-y-1">
                <div>
                    <span className="font-semibold text-base text-slate-800">{nama}</span>
                    <div className="text-xs text-slate-500 mt-1">
                        Bergabung pada <span className="font-medium text-sky-600">{dayjs(createdAt).format("D MMM YYYY")}</span>
                    </div>
                    <div className="flex flex-col gap-y-1 mt-1">
                        <span className="flex items-center gap-x-1">
                            <svg className="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M16 12a4 4 0 1 0-8 0 4 4 0 0 0 8 0Z" /><path d="M12 2v2m0 16v2m10-10h-2M4 12H2m15.07 7.07-1.42-1.42M6.34 6.34 4.93 4.93m12.02 0-1.41 1.41M6.34 17.66l-1.41 1.41" /></svg>
                            {email
                                ? <span className="text-slate-700">{email}</span>
                                : <span className="italic text-rose-400">Tidak ada email</span>
                            }
                        </span>
                        <span className="flex items-center gap-x-1">
                            <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M2 2h20v20H2z" fill="none" /><path d="M6 8h12M6 12h8m-8 4h4" /></svg>
                            {whatsapp
                                ? <span className="text-slate-700">{whatsapp}</span>
                                : <span className="italic text-rose-400">Tidak ada nomor HP</span>
                            }
                        </span>
                    </div>
                </div>
                <div className="flex gap-x-2 mt-2 sm:mt-0">
                    <button className="btn btn-xs btn-error rounded-full shadow" onClick={onDelete}>Hapus</button>
                    <NavLink to={"/member/detail/" + id} className="btn btn-xs btn-info rounded-full shadow">Detail</NavLink>
                </div>
            </div>
        </div>
    );
}

function Filter() {
    return (
        <div className="flex flex-col gap-y-2 mb-2">
            <label className="input input-bordered flex items-center gap-x-2 w-full bg-base-100">
                <svg className="h-5 w-5 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="2.5"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.3-4.3"></path>
                    </g>
                </svg>
                <input type="search" required placeholder="Cari member..." className="grow bg-transparent outline-none" />
            </label>
        </div>
    );
}