import dayjs from 'dayjs'
import layananIcon from "../../assets/img/layanan.png"
import { IoAdd } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useCallback, useEffect, useReducer, useState } from "react";
import useAuth from "../../hooks/useAuth";
import layananReducer from "../../hooks/reducer/layanan";
import { AxiosAuth } from "../../utils/axios";
import Swal from "sweetalert2";

export default function Layanan() {
    useAuth()
    const [layanans, dispatch] = useReducer(layananReducer, [])
    const [showDelete, setShowDelete] = useState(false);
    const [selectedLayanan, setSelectedLayanan] = useState<{ id: number; name: string } | null>(null);
    const [filter, setFilter] = useState("")

    const onFilterChange = useCallback((nama: string) => { setFilter(nama) }, [])


    useEffect(() => {
        if (!filter) {
            AxiosAuth.get("/layanans")
                .then(res => dispatch({ type: "get-all", payload: res.data.data }))
                .catch(() => dispatch({ type: "get-all", payload: [] }))
            return
        }


        const id = setTimeout(() => {
            AxiosAuth.get("/layanans", { params: { nama: filter } })
                .then(res => { dispatch({ type: "get-all", payload: res.data.data }) })
                .catch(() => dispatch({ type: "get-all", payload: [] }))
        }, 300);
        return () => clearTimeout(id)
    }, [filter])

    const handleDelete = (id: number, name: string) => {
        setSelectedLayanan({ id, name });
        setShowDelete(true);
    };

    const confirmDelete = (id: number) => async () => {
        try {
            const res = await AxiosAuth.delete("/layanan/" + id)
            setShowDelete(false);
            setSelectedLayanan(null);
            dispatch({ type: "delete", payload: id })
            await Swal.fire({
                icon: "success",
                text: res.data.message
            })
        } catch (error: any) {
            Swal.fire({
                text: Array.isArray(error.response?.data?.errors)
                    ? error.response.data.errors.join(", ")
                    : (error.response?.data?.message ?? "terjadi kesalahan saat menghapus layanan"),
                icon: "error"
            });
        }
    };

    return (
        <div className="container mx-auto max-w-4xl px-2 text-xs flex flex-col gap-y-4 py-4">
            <div className="flex justify-between items-center mb-2">
                <h2 className="font-bold text-2xl text-sky-700">Daftar Layanan</h2>
                <NavLink to={"/layanan/tambah"} className="btn btn-sm btn-primary flex items-center gap-x-1 shadow">
                    <IoAdd size={16} />
                    <span>Tambah Layanan</span>
                </NavLink>
            </div>

            <Filter onFilterChange={onFilterChange} />

            <div className="flex flex-col gap-y-3">
                {layanans.length === 0 ? (
                    <div className="text-center italic py-8 bg-white/80 rounded-lg shadow text-slate-600 font-semibold">
                        Tidak ada layanan yang terdaftar.
                    </div>
                ) : (
                    layanans.map((l) => (
                        <Card
                            key={l.id}
                            id={l.id}
                            nama={l.nama}
                            harga={l.harga}
                            satuan={l.satuan}
                            prioritas={l.prioritas}
                            created_at={l.created_at}
                            onDelete={() => handleDelete(l.id, l.nama)}
                        />
                    ))
                )}
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
                        <div className="font-bold text-lg text-rose-600 mb-2">Hapus Layanan?</div>
                        <div className="text-center mb-4 text-slate-700">
                            Apakah Anda yakin ingin menghapus layanan <span className="font-semibold">{selectedLayanan?.name}</span>?
                        </div>
                        <div className="flex gap-x-2 mt-2">
                            <button
                                className="btn btn-error btn-sm rounded-full"
                                onClick={confirmDelete(selectedLayanan?.id ?? 0)}
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
    harga: number;
    satuan: string;
    created_at: string;
    prioritas: number;
    onDelete?: () => void;
};

function Card({ id, nama, harga, satuan, created_at, prioritas, onDelete }: CardProps & { prioritas?: number }) {
    return (
        <div className="grid grid-cols-5 gap-3 bg-base-100 shadow-md rounded-xl p-4 items-center border border-base-200">
            <div className="col-span-1 flex justify-center">
                <img src={layananIcon} alt="layanan-icon" className="w-14 h-14 rounded-full object-cover border-2 border-sky-200 shadow" />
            </div>
            <div className="col-span-4 flex flex-col sm:flex-row sm:items-center justify-between gap-y-1">
                <div>
                    <span className="font-semibold text-base text-slate-800 flex items-center gap-x-2 justify-between">
                        {nama}
                        {prioritas !== undefined && (
                            <span className="badge badge-secondary badge-sm px-2 py-1 flex items-center gap-x-1">
                                <svg className="w-3 h-3 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.561-.955L10 0l2.951 5.955 6.561.955-4.756 4.635 1.122 6.545z" /></svg>
                                Prioritas {prioritas}
                            </span>
                        )}
                    </span>
                    <div className="text-xs text-slate-500 mt-1">
                        <span className="font-medium text-sky-600">Rp {harga.toLocaleString("id")}/{satuan}</span>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1 mt-2 sm:mt-0">
                    <span className="text-xs text-slate-400">Ditambahkan: {dayjs(created_at).format("DD MMMM YYYY HH:mm")}</span>
                    <div className="flex gap-x-2">
                        <button className="btn btn-xs btn-error rounded-full shadow" onClick={onDelete}>Hapus</button>
                        <NavLink to={"/layanan/edit/" + id} className="btn btn-xs btn-warning rounded-full shadow">Edit</NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Filter({ onFilterChange }: { onFilterChange: (nama: string) => void }) {
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
                <input type="search" onChange={(e) => onFilterChange(e.target.value)} required placeholder="Cari layanan..." className="grow bg-transparent outline-none" />
            </label>
        </div>
    );
}