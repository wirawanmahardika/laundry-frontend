import dayjs from "dayjs";
import pesananIcon from "../assets/img/pesanan.png"
import { IoAdd } from "react-icons/io5";

export default function Pesanan() {
    return <div className="container mx-auto max-w-4xl px-2 text-xs flex flex-col gap-y-3">
        <div className="flex justify-between">
            <h2 className="font-bold text-xl">Pesanan</h2>
            <button className="btn btn-sm bg-white">
                <IoAdd size={16} />
            </button>
        </div>
        <Filter />

        <Card status="pelanggan" />
        <Card status="pelanggan" />
        <Card status="tamu" />
        <Card status="tamu" />


        <div className="join mx-auto">
            <button className="join-item btn bg-white">«</button>
            <button className="join-item btn bg-white">Page 22</button>
            <button className="join-item btn bg-white">»</button>
        </div>
    </div>
}

function Card({status}: {status: "pelanggan" | "tamu"}) {
    return <div className="grid grid-cols-5 gap-2 bg-white shadow rounded-md p-3">
        <img src={pesananIcon} alt="icon-pesanan" className="row-span-2 w-full my-auto" />
        <div className="flex justify-between w-full col-span-4">
            <div className="flex flex-col justify-between font-medium">
                <span className="font-bold text-sm">Wirawan</span>
                <span>Biaya : <span className="font-normal text-primary">Rp {(21_000).toLocaleString("id")}</span></span>
                <span>Dibuat Pada : <span className="font-normal text-primary">{dayjs().format("D MMM")}</span></span>
                <span>Estimasi Selesai : <span className="font-normal text-primary">{dayjs().format("D MMM")}</span></span>
            </div>
            <button disabled className={`badge badge-xs capitalize ${status === "pelanggan" ? "badge-primary" : "badge-secondary"}`}>{status}</button>
        </div>
        <div className="flex justify-between gap-x-2 w-full col-span-4">
            <button className="btn btn-success btn-xs">Whatsapp</button>
            <button className="btn btn-warning btn-xs">Ubah</button>
            <button className="btn btn-accent btn-xs">Detail</button>
            <button className="btn btn-error btn-xs">Hapus</button>
        </div>
    </div>
}

function Filter() {
    return <div className="flex flex-col gap-y-2">
        <label className="input w-full">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
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
            <input type="search" required placeholder="Search" />
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
}