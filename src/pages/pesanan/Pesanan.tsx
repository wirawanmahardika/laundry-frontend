import dayjs from "dayjs";
import pesananIcon from "../../assets/img/pesanan.png"
import { IoAdd } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useEffect, useReducer, useState } from "react";
import useAuth from "../../hooks/useAuth";
import transaksiReducer from "../../hooks/reducer/transaksi";
import { AxiosAuth } from "../../utils/axios";
import type { layananType } from "../../types/layananType";
import Swal from "sweetalert2";

type filterType = {
    nama: string;
    layanan: string;
    status: string;
}

export default function Pesanan() {
    useAuth()
    const [showDelete, setShowDelete] = useState(false);
    const [selectedPesanan, setSelectedPesanan] = useState<number | null>(null);
    const [filter, setFilter] = useState<filterType | null>(null)
    const [pesanan, dispatch] = useReducer(transaksiReducer, [])

    useEffect(() => {
        if (!filter) {
            AxiosAuth.get("/transaksis",)
                .then(res => dispatch({ type: "get-all", payload: res.data.data }))
            return;
        }
        const id = setTimeout(() => {
            AxiosAuth.get("/transaksis", { params: filter })
                .then(res => dispatch({ type: "get-all", payload: res.data.data }))
                .catch(() => { dispatch({ type: "get-all", payload: [] }) })
        }, 300);
        return () => clearTimeout(id)
    }, [filter])

    const onChangeFilter = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFilter(p => { return { ...p, [e.target.name]: e.target.value } as filterType })
    }

    const handleDelete = (id: number) => {
        setSelectedPesanan(id);
        setShowDelete(true);
    };

    const confirmDelete = async () => {
        if (!selectedPesanan) return
        try {
            const res = await AxiosAuth.delete("/transaksi/" + selectedPesanan)
            await Swal.fire({ text: res.data.message, icon: "success" })
            dispatch({ type: "delete", payload: selectedPesanan })
        } catch (error: any) {
            await Swal.fire({
                text: Array.isArray(error.response?.data?.errors)
                ? error.response.data.errors.join(", ")
                : (error.response?.data?.message ?? "terjadi kesalahan saat menghapus transaksi"),
                icon: "error",
            })
        }
        setShowDelete(false);
        setSelectedPesanan(null);
    };

    return (
        <div className="container mx-auto max-w-4xl px-2 text-xs flex flex-col gap-y-4 py-4">
            <div className="flex justify-between items-center mb-2">
                <h2 className="font-bold text-2xl text-sky-700">Daftar Pesanan</h2>
                <NavLink to={"/pesanan/tambah"} className="btn btn-sm btn-primary flex items-center gap-x-1 shadow">
                    <IoAdd size={16} />
                    <span>Tambah Pesanan</span>
                </NavLink>
            </div>
            <Filter onChangeFilter={onChangeFilter} />

            <div className="flex flex-col gap-y-3">
                {pesanan.length === 0 ? (
                    <div className="text-center italic py-8 bg-white/80 rounded-lg shadow text-slate-600 font-semibold">
                        Tidak ada pesanan.
                    </div>
                ) : (
                    pesanan.map((p) => (
                        <Card
                            key={p.id}
                            id={p.id}
                            nama={p.nama}
                            status={p.status}
                            total_harga={p.total_harga}
                            sudah_bayar={p.sudah_bayar}
                            bukti={p.bukti}
                            updated_at={p.updated_at}
                            is_member={p.is_member}
                            created_at={p.created_at}
                            estimasi_selesai={p.estimasi_selesai}
                            onDelete={() => handleDelete(p.id)}
                        />
                    ))
                )}
            </div>

            <div className="join mx-auto mt-4">
                <button className="join-item btn btn-sm bg-base-100/90 border border-base-300 text-sky-700 shadow hover:bg-sky-100">«</button>
                <button className="join-item btn btn-sm bg-base-100/90 border border-base-300 text-sky-700 shadow hover:bg-sky-100">Page 22</button>
                <button className="join-item btn btn-sm bg-base-100/90 border border-base-300 text-sky-700 shadow hover:bg-sky-100">»</button>
            </div>

            {/* Popup Konfirmasi Hapus */}
            {showDelete && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                    <div className="bg-base-100 rounded-xl shadow-lg p-6 w-full max-w-xs border border-base-300 flex flex-col items-center">
                        <div className="font-bold text-lg text-rose-600 mb-2">Hapus Pesanan?</div>
                        <div className="text-center mb-4 text-slate-700">
                            Apakah Anda yakin ingin menghapus pesanan <span className="font-semibold">{selectedPesanan}</span>?
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
    total_harga: number;
    sudah_bayar: boolean;
    bukti: string | null;
    is_member: boolean;
    estimasi_selesai: string;
    status: string;
    created_at: string;
    updated_at: string;
    onDelete?: () => void;
};

function Card({ id, nama, total_harga, estimasi_selesai, status, sudah_bayar, created_at, is_member, bukti, onDelete }: CardProps) {
    return (
        <div key={id} className="grid grid-cols-5 gap-3 bg-base-100 shadow-md rounded-xl p-4 items-center border border-base-200">
            <div className="col-span-1 flex flex-col items-center justify-center">
                <img src={pesananIcon} alt="icon-pesanan" className="w-14 h-14 rounded-full object-cover border-2 border-sky-200 shadow" />
            </div>
            <div className="col-span-4 flex flex-col sm:flex-row sm:items-center justify-between gap-y-1">
                <div>
                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-base text-slate-800">{nama}</span>
                        <button
                            disabled
                            className={`badge badge-xs capitalize ${is_member ? "badge-primary" : "badge-secondary"} px-3 py-2`}
                        >
                            {is_member ? "member" : "tamu"}
                        </button>
                    </div>
                    <div className="flex gap-2 mt-1">
                        <span className="text-xs text-slate-500">
                            Biaya: <span className="font-medium text-sky-600">Rp {total_harga.toLocaleString("id")}</span>
                        </span>
                        <span className={`badge badge-xs ${sudah_bayar ? "badge-success" : "badge-warning"} font-semibold`}>
                            {sudah_bayar ? "Sudah Dibayar" : "Belum Dibayar"}
                        </span>
                    </div>
                    <div className="text-xs text-slate-400">
                        Dibuat: <span className="font-medium">{dayjs(created_at).format("D MMM YYYY, HH:mm")}</span>
                        {" | "}
                        Estimasi Selesai: <span className="font-medium">{dayjs(estimasi_selesai).format("D MMM YYYY, HH:mm")}</span>
                    </div>
                    <div className="flex text-slate-400 gap-x-1">
                        <span>Status : </span>
                        <span
                            className={`badge badge-xs px-3 py-2 capitalize
                            ${status === "menunggu" ? "badge-info" : ""}
                            ${status === "proses" ? "badge-warning" : ""}
                            ${status === "selesai" ? "badge-success" : ""}
                            `}
                        >
                            {status === "menunggu" && "Menunggu"}
                            {status === "proses" && "Proses"}
                            {status === "selesai" && "Selesai"}
                        </span>

                    </div>
                </div>

            </div>
            <div className="col-span-5 flex flex-wrap gap-2 mt-2 justify-end">
                <button className="btn btn-success btn-xs rounded-full shadow">Whatsapp</button>
                <NavLink to={`/pesanan/${id}`} className="btn btn-info btn-xs rounded-full shadow relative">
                    Detail
                    {bukti && (
                        <span className="absolute -top-2 -right-2 badge badge-error badge-xs animate-bounce">
                            Baru
                        </span>
                    )}
                </NavLink>
                <button className="btn btn-error btn-xs rounded-full shadow" onClick={onDelete}>Hapus</button>
            </div>
        </div>
    );
}

function Filter({ onChangeFilter }: { onChangeFilter: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void }) {
    const [layanans, setLayanans] = useState<layananType[]>()
    useEffect(() => {
        AxiosAuth.get("/layanans").then(res => setLayanans(res.data.data))
    }, [])

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
                <input onChange={onChangeFilter} type="search" name="nama" required placeholder="Cari nama pemesan..." className="grow bg-transparent outline-none" />
            </label>
            <div className="flex gap-x-2">
                <select onChange={onChangeFilter} name="status" defaultValue="Status" className="select select-sm w-1/2">
                    <option disabled={true}>Status</option>
                    <option value={""}>-- Semua --</option>
                    <option>menunggu</option>
                    <option>proses</option>
                    <option>selesai</option>
                </select>
                <select onChange={onChangeFilter} name="layanan" defaultValue="Layanan" className="select select-sm w-1/2">
                    <option disabled={true}>Layanan</option>
                    <option value={""}>-- Semua --</option>
                    {layanans?.map(l => {
                        return <option key={l.id} value={l.nama}>{l.nama}</option>
                    })}
                </select>
            </div>
        </div>
    );
}