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

        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />

        <div className="join mx-auto">
            <button className="join-item btn bg-white">«</button>
            <button className="join-item btn bg-white">Page 22</button>
            <button className="join-item btn bg-white">»</button>
        </div>
    </div>
}

function Card() {
    return <div className="grid grid-cols-5 gap-2 bg-white shadow rounded-md p-3">
        <img src={pesananIcon} alt="icon-pesanan" className="row-span-2 w-full my-auto" />
        <div className="flex justify-between items-center w-full col-span-4">
            <div className="flex justify-between w-full items-center">
                <div className="flex flex-col justify-between">
                    <span className=" font-semibold text-sm">Wirawan</span>
                    <span className="">Rp {(21_000).toLocaleString("id")}</span>
                </div>
                <span>{dayjs().format("D MMM YYYY")}</span>
            </div>
        </div>
        <div className="flex justify-end gap-x-2 w-full col-span-4">
            <button className="btn btn-error btn-xs">Hapus</button>
            <button className="btn btn-warning btn-xs">Ubah</button>
            <button className="btn btn-success btn-xs">Detail</button>
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