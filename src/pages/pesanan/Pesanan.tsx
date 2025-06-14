import dayjs from "dayjs";
import pesananIcon from "../../assets/img/pesanan.png"
import { IoAdd } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Pesanan() {
    const [showDelete, setShowDelete] = useState(false);
    const [selectedPesanan, setSelectedPesanan] = useState<string | null>(null);

    // Dummy data, ganti dengan data asli jika ada
    const pesananList = [
        { id: "P001", name: "Wirawan", biaya: 21000, status: "member", dibuat: dayjs().format("D MMM"), selesai: dayjs().add(2, "day").format("D MMM") },
        { id: "P002", name: "Budi", biaya: 25000, status: "member", dibuat: dayjs().subtract(1, "day").format("D MMM"), selesai: dayjs().add(1, "day").format("D MMM") },
        { id: "P003", name: "Tamu", biaya: 15000, status: "tamu", dibuat: dayjs().subtract(2, "day").format("D MMM"), selesai: dayjs().add(3, "day").format("D MMM") },
        { id: "P004", name: "Tamu", biaya: 18000, status: "tamu", dibuat: dayjs().subtract(3, "day").format("D MMM"), selesai: dayjs().add(4, "day").format("D MMM") },
    ];

    const handleDelete = (id: string) => {
        setSelectedPesanan(id);
        setShowDelete(true);
    };

    const confirmDelete = () => {
        // Lakukan aksi hapus di sini (misal API call)
        setShowDelete(false);
        setSelectedPesanan(null);
        // Tampilkan notifikasi jika perlu
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
            <Filter />

            <div className="flex flex-col gap-y-3">
                {pesananList.map((p) => (
                    <Card
                        key={p.id}
                        id={p.id}
                        name={p.name}
                        biaya={p.biaya}
                        status={p.status as "member" | "tamu"}
                        dibuat={p.dibuat}
                        selesai={p.selesai}
                        onDelete={() => handleDelete(p.id)}
                    />
                ))}
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
    id: string;
    name: string;
    biaya: number;
    status: "member" | "tamu";
    dibuat: string;
    selesai: string;
    onDelete?: () => void;
};

function Card({ id, name, biaya, status, dibuat, selesai, onDelete }: CardProps) {
    // Dummy: anggap pesanan dengan id genap sudah dibayar, ganjil belum
    const sudahDibayar = id.endsWith("2") || id.endsWith("4");

    return (
        <div className="grid grid-cols-5 gap-3 bg-base-100 shadow-md rounded-xl p-4 items-center border border-base-200">
            <div className="col-span-1 flex flex-col items-center justify-center">
                <img src={pesananIcon} alt="icon-pesanan" className="w-14 h-14 rounded-full object-cover border-2 border-sky-200 shadow" />
                <span className="mt-2 badge badge-outline badge-info text-[0.7rem] font-mono">{id}</span>
            </div>
            <div className="col-span-4 flex flex-col sm:flex-row sm:items-center justify-between gap-y-1">
                <div>
                    <span className="font-semibold text-base text-slate-800">{name}</span>
                    <div className="flex gap-2 mt-1">
                        <span className="text-xs text-slate-500">
                            Biaya: <span className="font-medium text-sky-600">Rp {biaya.toLocaleString("id")}</span>
                        </span>
                        <span className={`badge badge-xs ${sudahDibayar ? "badge-success" : "badge-warning"} font-semibold`}>
                            {sudahDibayar ? "Sudah Dibayar" : "Belum Dibayar"}
                        </span>
                    </div>
                    <div className="text-xs text-slate-400">
                        Dibuat: <span className="font-medium">{dibuat}</span>
                        {" | "}
                        Estimasi Selesai: <span className="font-medium">{selesai}</span>
                    </div>
                </div>
                <button
                    disabled
                    className={`badge badge-xs capitalize ${status === "member" ? "badge-primary" : "badge-secondary"} px-3 py-2`}
                >
                    {status}
                </button>
            </div>
            <div className="col-span-5 flex flex-wrap gap-2 mt-2 justify-end">
                <button className="btn btn-success btn-xs rounded-full shadow">Whatsapp</button>
                <NavLink to={'/pesanan/detail'} className="btn btn-info btn-xs rounded-full shadow">Detail</NavLink>
                <button className="btn btn-error btn-xs rounded-full shadow" onClick={onDelete}>Hapus</button>
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
                <input type="search" required placeholder="Cari pesanan..." className="grow bg-transparent outline-none" />
            </label>
            <div className="flex gap-x-2">
                <select defaultValue="Status" className="select select-sm w-1/2">
                    <option disabled={true}>Status</option>
                    <option>-- Semua --</option>
                    <option>Pencucian</option>
                    <option>Pengeringan</option>
                    <option>Selesai</option>
                </select>
                <select defaultValue="Layanan" className="select select-sm w-1/2">
                    <option disabled={true}>Layanan</option>
                    <option>-- Semua --</option>
                    <option>Pencucian</option>
                    <option>Pengeringan</option>
                    <option>Selesai</option>
                </select>
            </div>
        </div>
    );
}