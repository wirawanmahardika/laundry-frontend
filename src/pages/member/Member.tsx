import dayjs from "dayjs";
import memberIcon from "../../assets/img/member.png"
import { IoAdd } from "react-icons/io5";
import { NavLink } from "react-router-dom";

export default function Member() {
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
                {[...Array(8)].map((_, i) => (
                    <Card
                        key={i}
                        name="Wirawan"
                        joinedAt={dayjs().subtract(i, "month").format("D MMM YYYY")}
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
        </div>
    );
}

type CardProps = {
    name: string;
    joinedAt: string;
};

function Card({ name, joinedAt }: CardProps) {
    return (
        <div className="grid grid-cols-5 gap-3 bg-base-100 shadow-md rounded-xl p-4 items-center border border-base-200">
            <div className="col-span-1 flex justify-center">
                <img src={memberIcon} alt="member-icon" className="w-14 h-14 rounded-full object-cover border-2 border-sky-200 shadow" />
            </div>
            <div className="col-span-4 flex flex-col sm:flex-row sm:items-center justify-between gap-y-1">
                <div>
                    <span className="font-semibold text-base text-slate-800">{name}</span>
                    <div className="text-xs text-slate-500 mt-1">
                        Bergabung pada <span className="font-medium text-sky-600">{joinedAt}</span>
                    </div>
                </div>
                <div className="flex gap-x-2 mt-2 sm:mt-0">
                    <button className="btn btn-xs btn-error rounded-full shadow">Hapus</button>
                    <button className="btn btn-xs btn-warning rounded-full shadow">Ubah</button>
                    <button className="btn btn-xs btn-info rounded-full shadow">Detail</button>
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