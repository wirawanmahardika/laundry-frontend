import { useReducer, useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import type { memberType } from "../../types/memberType";
import { AxiosAuth } from "../../utils/axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import type { layananType } from "../../types/layananType";

type stateType = {
    id: number;
    name: string;
    quantity: number;
    satuan: string;
};

type actionType = {
    type: "tambah" | "hapus" | "replace";
    payload: stateType | stateType[];
};

function reducer(state: stateType[], action: actionType) {
    switch (action.type) {
        case "tambah":
            return [...state, action.payload as stateType];
        case "hapus":
            return state.filter(s => s.id !== (action.payload as stateType).id);
        case "replace":
            const filteredState = state.filter(s => s.id !== (action.payload as stateType).id);
            return [...filteredState, action.payload as stateType]
        default:
            return state;
    }
}

export default function TambahPesanan() {
    useAuth()
    const navigate = useNavigate()
    const [layanan, setLayanan] = useState<stateType>({ id: 0, name: "", quantity: 0, satuan: "" });
    const [layanans, dispatch] = useReducer(reducer, []);

    const [members, setMembers] = useState<memberType[]>([])
    useEffect(() => {
        AxiosAuth.get("/members").then(res => setMembers(res.data.data))
    }, [])

    const [layananOptions, setLayananOptions] = useState<layananType[]>()
    useEffect(() => {
        AxiosAuth.get("/layanans").then(res => setLayananOptions(res.data.data))
    }, [])

    // State untuk mode member/tamu
    const [isMember, setIsMember] = useState(false);
    const [selectedMember, setSelectedMember] = useState<number | null>(null);
    const memberData = members.find(m => m.id === selectedMember);

    // State untuk input tamu
    const [nama, setNama] = useState("");
    const [whatsapp, setWhatsapp] = useState("");
    const [email, setEmail] = useState("");
    const [estimasiSelesai, setEstimasiSelesai] = useState("");
    const [sudahBayar, setSudahBayar] = useState(false);

    const tambahPesanan = async (e: any) => {
        e.preventDefault()

        if (layanans.length === 0) return Swal.fire({ icon: "error", title: "Error", text: "Pesanan wajib memiliki setidaknya satu layanan" })
        const body = {
            id_member: selectedMember || 0,
            nama: nama,
            whatsapp: whatsapp,
            sudah_bayar: sudahBayar,
            estimasi_selesai: estimasiSelesai ? new Date(estimasiSelesai).toISOString() : "",
            layanans: layanans.map(l => ({ id: l.id, jumlah: l.quantity }))
        }

        try {
            const res = await AxiosAuth.post("/transaksi", body, { headers: { "Content-Type": "application/json" } })
            await Swal.fire({ text: res.data.message, icon: "success" })
            navigate(-1)
        } catch (error: any) {
            Swal.fire({
                text: Array.isArray(error.response?.data?.errors)
                    ? error.response.data.errors.join(", ")
                    : (error.response?.data?.message ?? "terjadi kesalahan saat membuat transaksi"),
                icon: "error",
            })
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form className="bg-base-100 rounded-xl shadow-lg p-8 flex flex-col items-center gap-y-4 w-full max-w-lg border border-base-300">
                <h2 className="font-bold text-2xl mb-2 text-sky-700">Tambah Pesanan</h2>

                {/* Pilihan Member/Tamu */}
                <div className="flex gap-x-2 w-full mb-2">
                    <button
                        type="button"
                        className={`btn btn-sm w-1/2 ${!isMember ? "btn-primary" : "btn-outline"}`}
                        onClick={() => setIsMember(false)}
                    >
                        Tamu
                    </button>
                    <button
                        type="button"
                        className={`btn btn-sm w-1/2 ${isMember ? "btn-primary" : "btn-outline"}`}
                        onClick={() => setIsMember(true)}
                    >
                        Member
                    </button>
                </div>

                {/* Jika Member */}
                {isMember ? (
                    <>
                        <div className="flex flex-col gap-y-1 w-full">
                            <label className="font-semibold text-slate-600">Pilih Member</label>
                            <select
                                className="select select-bordered w-full"
                                value={selectedMember ?? ""}
                                onChange={e => setSelectedMember(Number(e.target.value))}
                                required
                            >
                                <option value="" disabled>Pilih member...</option>
                                {members.map(m => (<option key={m.id} value={m.id}>{m.nama}</option>))}
                            </select>
                        </div>
                        {memberData && (
                            <div className="bg-sky-50 border border-sky-200 rounded-lg p-3 w-full flex flex-col gap-y-1 mb-2">
                                <span className="font-semibold text-sky-700">{memberData.nama}</span>
                                <span className="text-xs text-slate-500">Email: {memberData.email ?? <span className="text-red-400 italic">None</span>}</span>
                                <span className="text-xs text-slate-500">HP: {memberData.whatsapp ?? <span className="text-red-400 italic">None</span>}</span>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <div className="flex flex-col gap-y-1 w-full">
                            <label className="font-semibold text-slate-600">Nama</label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                placeholder="Masukkan nama..."
                                value={nama}
                                onChange={e => setNama(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-y-1 w-full">
                            <label className="font-semibold text-slate-600">Whatsapp</label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                placeholder="Masukkan phone..."
                                value={whatsapp}
                                onChange={e => setWhatsapp(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-y-1 w-full">
                            <label className="font-semibold text-slate-600">Email</label>
                            <input
                                type="email"
                                className="input input-bordered w-full"
                                placeholder="Masukkan email..."
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                    </>
                )}

                <div className="flex flex-col gap-y-1 w-full">
                    <label className="font-semibold text-slate-600">Diambil Pada</label>
                    <input
                        type="datetime-local"
                        className="input input-bordered w-full"
                        placeholder="Masukkan tanggal pengambilan..."
                        value={estimasiSelesai}
                        onChange={e => setEstimasiSelesai(e.target.value)}
                    />
                </div>

                {/* Input status pembayaran */}
                <div className="flex items-center gap-x-2 w-full">
                    <input
                        type="checkbox"
                        id="sudahBayar"
                        className="checkbox checkbox-primary"
                        checked={sudahBayar}
                        onChange={e => setSudahBayar(e.target.checked)}
                    />
                    <label htmlFor="sudahBayar" className="font-semibold text-slate-600 cursor-pointer">
                        Tandai pesanan ini sudah dibayar
                    </label>
                </div>

                <div className="flex flex-col gap-y-2 w-full">
                    <label className="font-semibold text-slate-600">Tambah Layanan</label>
                    <div className="flex gap-x-2">
                        <select
                            onChange={e => {
                                const selectedLayanan = layananOptions?.find(l => l.id === parseInt(e.target.value))
                                if (selectedLayanan) setLayanan(p => ({ ...p, id: selectedLayanan.id, name: selectedLayanan.nama, satuan: selectedLayanan.satuan }))
                                else setLayanan(p => ({ ...p, id: 0, name: "", quantity: 0, satuan: "" }))
                            }}
                            value={layanan.id}
                            className="select select-bordered w-1/2"
                        >
                            <option value="">Layanan</option>
                            {layananOptions?.map(p => {
                                return <option key={p.id} value={p.id}>{p.nama}</option>
                            })}
                        </select>
                        <input
                            onChange={e => setLayanan(p => ({ ...p, quantity: parseInt(e.target.value) }))}
                            type="number"
                            min={1}
                            value={layanan.quantity || ""}
                            placeholder="Jumlah"
                            className="input input-bordered w-1/2"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={() => {
                            if (layanan.name && layanan.quantity > 0) {
                                if (layanans.find(l => l.id === layanan.id)) dispatch({ type: "replace", payload: layanan });
                                else dispatch({ type: "tambah", payload: layanan });
                                setLayanan(p => ({ ...p, id: 0, name: "", quantity: 0, satuan: "" }));
                            }
                        }}
                        className="btn btn-accent btn-sm w-fit self-end mt-1"
                    >
                        Tambah Layanan
                    </button>
                </div>

                <div className="flex flex-col gap-y-3 bg-base-200 rounded-xl shadow-inner w-full p-4 mt-2 border border-base-300">
                    <span className="font-bold text-sky-700">Daftar Layanan</span>
                    {layanans.length === 0 && (
                        <span className="text-slate-400 text-sm italic">Belum ada layanan ditambahkan.</span>
                    )}
                    {layanans.map(l => (
                        <div key={l.id} className="flex justify-between items-center text-sm bg-base-100 rounded-lg px-3 py-2 shadow border border-base-200">
                            <span className="font-medium">{l.name}</span>
                            <div className="flex items-center gap-x-2">
                                <span className="badge badge-info badge-sm">{l.quantity} {l.satuan}</span>
                                <button
                                    type="button"
                                    onClick={() => {
                                        dispatch({ type: "hapus", payload: { ...layanan, id: l.id } })
                                    }}
                                    className="btn btn-error btn-xs text-white rounded-full"
                                    title="Hapus"
                                >
                                    &times;
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <button onClick={tambahPesanan} className="btn btn-primary btn-md mt-3 w-full shadow">Tambah Pesanan</button>
            </form>
        </div>
    );
}