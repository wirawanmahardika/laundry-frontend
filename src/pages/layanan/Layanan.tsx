import dayjs from "dayjs";
import layananIcon from "../../assets/img/layanan.png"
import { IoAdd } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Layanan() {
    const [showDelete, setShowDelete] = useState(false);
    const [selectedLayanan, setSelectedLayanan] = useState<string | null>(null);

    // Dummy data, ganti dengan data asli jika ada
    const layananList = [
        { name: "Cuci Kering", price: 21000, satuan: "kg", addedAt: dayjs().format("D MMM YYYY") },
        { name: "Cuci Setrika", price: 25000, satuan: "kg", addedAt: dayjs().subtract(1, "day").format("D MMM YYYY") },
        { name: "Setrika Saja", price: 15000, satuan: "kg", addedAt: dayjs().subtract(2, "day").format("D MMM YYYY") },
        { name: "Bed Cover", price: 35000, satuan: "pcs", addedAt: dayjs().subtract(3, "day").format("D MMM YYYY") },
        // ...tambahkan data lain jika perlu
    ];

    const handleDelete = (name: string) => {
        setSelectedLayanan(name);
        setShowDelete(true);
    };

    const confirmDelete = () => {
        // Lakukan aksi hapus di sini (misal API call)
        setShowDelete(false);
        setSelectedLayanan(null);
        // Tampilkan notifikasi jika perlu
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

            <Filter />

            <div className="flex flex-col gap-y-3">
                {layananList.map((l, i) => (
                    <Card
                        key={i}
                        name={l.name}
                        price={l.price}
                        satuan={l.satuan}
                        addedAt={l.addedAt}
                        onDelete={() => handleDelete(l.name)}
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
                        <div className="font-bold text-lg text-rose-600 mb-2">Hapus Layanan?</div>
                        <div className="text-center mb-4 text-slate-700">
                            Apakah Anda yakin ingin menghapus layanan <span className="font-semibold">{selectedLayanan}</span>?
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
    name: string;
    price: number;
    satuan: string;
    addedAt: string;
    onDelete?: () => void;
};

function Card({ name, price, satuan, addedAt, onDelete }: CardProps) {
    return (
        <div className="grid grid-cols-5 gap-3 bg-base-100 shadow-md rounded-xl p-4 items-center border border-base-200">
            <div className="col-span-1 flex justify-center">
                <img src={layananIcon} alt="layanan-icon" className="w-14 h-14 rounded-full object-cover border-2 border-sky-200 shadow" />
            </div>
            <div className="col-span-4 flex flex-col sm:flex-row sm:items-center justify-between gap-y-1">
                <div>
                    <span className="font-semibold text-base text-slate-800">{name}</span>
                    <div className="text-xs text-slate-500 mt-1">
                        <span className="font-medium text-sky-600">Rp {price.toLocaleString("id")}/{satuan}</span>
                    </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-x-4 gap-y-1 mt-2 sm:mt-0">
                    <span className="text-xs text-slate-400">Ditambahkan: {addedAt}</span>
                    <div className="flex gap-x-2">
                        <button className="btn btn-xs btn-error rounded-full shadow" onClick={onDelete}>Hapus</button>
                        <button className="btn btn-xs btn-warning rounded-full shadow">Ubah</button>
                    </div>
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
                <input type="search" required placeholder="Cari layanan..." className="grow bg-transparent outline-none" />
            </label>
        </div>
    );
}