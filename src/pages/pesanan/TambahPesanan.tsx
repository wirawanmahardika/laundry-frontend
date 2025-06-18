import { useReducer, useState, useRef } from "react";
import useAuth from "../../hooks/useAuth";

type stateType = {
    id: number;
    name: string;
    quantity: number;
};

type actionType = {
    type: "tambah" | "hapus";
    payload: stateType | stateType[];
};

function reducer(state: stateType[], action: actionType) {
    switch (action.type) {
        case "tambah":
            return [...state, action.payload as stateType];
        case "hapus":
            return state.filter(s => s.id !== (action.payload as stateType).id);
        default:
            return state;
    }
}

// Dummy data member
const memberList = [
    { id: 1, name: "Wirawan", email: "wirawan@email.com", phone: "08123456789", benefit: "Diskon 10% setiap transaksi" },
    { id: 2, name: "Budi", email: "budi@email.com", phone: "08123456788", benefit: "Gratis cuci 1kg tiap 10kg" },
];

// Daftar keunggulan member yang bisa dipilih saat pemesanan
const benefitOptions = [
    "Diskon member",
    "Prioritas antrian",
    "Notifikasi khusus (WA/Email)",
    "Layanan eksklusif/custom",
    "Reminder pengambilan",
];

export default function TambahPesanan() {
    useAuth()
    const [sudahBayar, setSudahBayar] = useState(false);
    const [layanan, setLayanan] = useState<stateType>({ id: 0, name: "", quantity: 0 });
    const [layanans, dispatch] = useReducer(reducer, []);
    const idRef = useRef(1);

    // State untuk mode member/tamu
    const [isMember, setIsMember] = useState(false);
    const [selectedMember, setSelectedMember] = useState<number | null>(null);

    // State untuk input tamu
    const [nama, setNama] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [diambilPada, setDiambilPada] = useState("");

    // State untuk keunggulan member (bisa multi select)
    const [memberBenefits, setMemberBenefits] = useState<string[]>([]);

    const getId = () => idRef.current++;

    // Ambil data member jika dipilih
    const memberData = memberList.find(m => m.id === selectedMember);

    // Handler untuk keunggulan member
    const handleBenefitChange = (benefit: string) => {
        setMemberBenefits(prev =>
            prev.includes(benefit)
                ? prev.filter(b => b !== benefit)
                : [...prev, benefit]
        );
    };

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
                                {memberList.map(m => (
                                    <option key={m.id} value={m.id}>{m.name}</option>
                                ))}
                            </select>
                        </div>
                        {memberData && (
                            <div className="bg-sky-50 border border-sky-200 rounded-lg p-3 w-full flex flex-col gap-y-1 mb-2">
                                <span className="font-semibold text-sky-700">{memberData.name}</span>
                                <span className="text-xs text-slate-500">Email: {memberData.email}</span>
                                <span className="text-xs text-slate-500">HP: {memberData.phone}</span>
                                <span className="badge badge-success badge-sm mt-1">{memberData.benefit}</span>
                            </div>
                        )}

                        {/* Input keunggulan member */}
                        <div className="flex flex-col gap-y-1 w-full">
                            <label className="font-semibold text-slate-600">Keunggulan Member (pilih sesuai pesanan)</label>
                            <div className="flex flex-wrap gap-2">
                                {benefitOptions.map(opt => (
                                    <label key={opt} className="flex items-center gap-x-1 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            className="checkbox checkbox-xs"
                                            checked={memberBenefits.includes(opt)}
                                            onChange={() => handleBenefitChange(opt)}
                                        />
                                        <span className="text-xs">{opt}</span>
                                    </label>
                                ))}
                            </div>
                            {memberBenefits.length > 0 && (
                                <div className="mt-1 flex flex-wrap gap-1">
                                    {memberBenefits.map(b => (
                                        <span key={b} className="badge badge-info badge-xs">{b}</span>
                                    ))}
                                </div>
                            )}
                        </div>
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
                            <label className="font-semibold text-slate-600">Phone</label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                placeholder="Masukkan phone..."
                                value={phone}
                                onChange={e => setPhone(e.target.value)}
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
                        value={diambilPada}
                        onChange={e => setDiambilPada(e.target.value)}
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
                            onChange={e => setLayanan(p => ({ ...p, name: e.target.value }))}
                            value={layanan.name}
                            className="select select-bordered w-1/2"
                            required
                        >
                            <option value="">Layanan</option>
                            <option>Express</option>
                            <option>Sprei</option>
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
                                dispatch({ type: "tambah", payload: { ...layanan, id: getId() } });
                                setLayanan({ id: 0, name: "", quantity: 0 });
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
                                <span className="badge badge-info badge-sm">{l.quantity} Kg</span>
                                <button
                                    type="button"
                                    onClick={() => dispatch({ type: "hapus", payload: { ...layanan, id: l.id } })}
                                    className="btn btn-error btn-xs text-white rounded-full"
                                    title="Hapus"
                                >
                                    &times;
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="btn btn-primary btn-md mt-3 w-full shadow">Tambah Pesanan</button>
            </form>
        </div>
    );
}