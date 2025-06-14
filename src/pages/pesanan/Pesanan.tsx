import dayjs from "dayjs";
import pesananIcon from "../../assets/img/pesanan.png"
import { IoAdd } from "react-icons/io5";
import { NavLink } from "react-router-dom";

export default function Pesanan() {
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
                <Card status="pelanggan" />
                <Card status="pelanggan" />
                <Card status="tamu" />
                <Card status="tamu" />
            </div>

            <div className="join mx-auto mt-4">
                <button className="join-item btn btn-sm bg-base-100/90 border border-base-300 text-sky-700 shadow hover:bg-sky-100">«</button>
                <button className="join-item btn btn-sm bg-base-100/90 border border-base-300 text-sky-700 shadow hover:bg-sky-100">Page 22</button>
                <button className="join-item btn btn-sm bg-base-100/90 border border-base-300 text-sky-700 shadow hover:bg-sky-100">»</button>
            </div>
        </div>
    );
}

function Card({ status }: { status: "pelanggan" | "tamu" }) {
    return (
        <div className="grid grid-cols-5 gap-3 bg-base-100 shadow-md rounded-xl p-4 items-center border border-base-200">
            <div className="col-span-1 flex justify-center">
                <img src={pesananIcon} alt="icon-pesanan" className="w-14 h-14 rounded-full object-cover border-2 border-sky-200 shadow" />
            </div>
            <div className="col-span-4 flex flex-col sm:flex-row sm:items-center justify-between gap-y-1">
                <div>
                    <span className="font-semibold text-base text-slate-800">Wirawan</span>
                    <div className="text-xs text-slate-500 mt-1">
                        Biaya: <span className="font-medium text-sky-600">Rp {(21_000).toLocaleString("id")}</span>
                    </div>
                    <div className="text-xs text-slate-400">
                        Dibuat: <span className="font-medium">{dayjs().format("D MMM")}</span>
                        {" | "}
                        Estimasi Selesai: <span className="font-medium">{dayjs().format("D MMM")}</span>
                    </div>
                </div>
                <button
                    disabled
                    className={`badge badge-xs capitalize ${status === "pelanggan" ? "badge-primary" : "badge-secondary"} px-3 py-2`}
                >
                    {status}
                </button>
            </div>
            <div className="col-span-5 flex flex-wrap gap-2 mt-2 justify-end">
                <button className="btn btn-success btn-xs rounded-full shadow">Whatsapp</button>
                <button className="btn btn-warning btn-xs rounded-full shadow">Ubah</button>
                <button className="btn btn-info btn-xs rounded-full shadow">Detail</button>
                <button className="btn btn-error btn-xs rounded-full shadow">Hapus</button>
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