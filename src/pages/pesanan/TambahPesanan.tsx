import { useReducer, useState, useRef } from "react";

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

export default function TambahPesanan() {
    const [layanan, setLayanan] = useState<stateType>({ id: 0, name: "", quantity: 0 });
    const [layanans, dispatch] = useReducer(reducer, []);
    const idRef = useRef(1);

    const getId = () => idRef.current++;

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form className="bg-base-100 rounded-xl shadow-lg p-8 flex flex-col items-center gap-y-4 w-full max-w-lg border border-base-300">
                <h2 className="font-bold text-2xl mb-2 text-sky-700">Tambah Pesanan</h2>

                <div className="flex flex-col gap-y-1 w-full">
                    <label className="font-semibold text-slate-600">Nama</label>
                    <input type="text" className="input input-bordered w-full" placeholder="Masukkan nama..." required />
                </div>

                <div className="flex flex-col gap-y-1 w-full">
                    <label className="font-semibold text-slate-600">Phone</label>
                    <input type="text" className="input input-bordered w-full" placeholder="Masukkan phone..." />
                </div>

                <div className="flex flex-col gap-y-1 w-full">
                    <label className="font-semibold text-slate-600">Email</label>
                    <input type="email" className="input input-bordered w-full" placeholder="Masukkan email..." />
                </div>

                <div className="flex flex-col gap-y-1 w-full">
                    <label className="font-semibold text-slate-600">Diambil Pada</label>
                    <input type="date" className="input input-bordered w-full" placeholder="Masukkan tanggal pengambilan..." />
                </div>

                <div className="flex flex-col gap-y-2 w-full">
                    <label className="font-semibold text-slate-600">Tambah Layanan</label>
                    <div className="flex gap-x-2">
                        <select
                            onChange={e => setLayanan(p => ({ ...p, name: e.target.value }))}
                            defaultValue="Layanan"
                            className="select select-bordered w-1/2"
                            required
                        >
                            <option disabled={true}>Layanan</option>
                            <option>Express</option>
                            <option>Sprei</option>
                        </select>
                        <input
                            onChange={e => setLayanan(p => ({ ...p, quantity: parseInt(e.target.value) }))}
                            type="number"
                            min={1}
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