import { useReducer, useState } from "react"
import createIdGenerator from "../../utils/createIdGenerator";

type stateType = {
    id: number;
    name: string;
    quantity: number;
}

type actionType = {
    type: "tambah" | "hapus",
    payload: stateType | stateType[]
}

function reducer(state: stateType[], action: actionType) {
    switch (action.type) {
        case "tambah":
            return [...state, (action.payload as stateType)]
        case "hapus":
            return state.filter(s => s.id !== (action.payload as stateType).id)
        default:
            return state
    }
}

const getId = createIdGenerator()
export default function TambahPesanan() {
    const [layanan, setLayanan] = useState<stateType>({ id: 0, name: "", quantity: 0 })
    const [layanans, dispatch] = useReducer(reducer, [])

    return <div className="flex items-center justify-center h-full">
        <form className="flex flex-col items-center gap-y-2 w-full h-full overflow-y-auto">
            <h2 className="font-bold text-2xl mb-4">Tambah Pesanan</h2>

            <div className="flex flex-col gap-y-1 w-4/5 mt-2">
                <label className="font-semibold">Nama</label>
                <input type="text" className="input" placeholder="Masukkan nama..." required />
            </div>

            <div className="flex flex-col gap-y-1 w-4/5 mt-2">
                <label className="font-semibold">Phone</label>
                <input type="text" className="input" placeholder="Masukkan phone..." />
            </div>

            <div className="flex flex-col gap-y-1 w-4/5 mt-2">
                <label className="font-semibold">Email</label>
                <input type="email" className="input" placeholder="Masukkan email..." />
            </div>

            <div className="flex flex-col gap-y-1 w-4/5 mt-2">
                <label className="font-semibold">Diambil Pada</label>
                <input type="datetime-local" className="input" placeholder="Masukkan tanggal pengambilan..." />
            </div>

            <div className="flex flex-col gap-y-2 w-4/5 mt-2">
                <label className="font-semibold">Jumlah Layanan</label>
                <div className="flex gap-x-2">
                    <select onChange={(e) => setLayanan(p => ({ ...p, name: e.target.value }))} defaultValue="Layanan" className="select" required>
                        <option disabled={true}>Layanan</option>
                        <option>Express</option>
                        <option>Sprei</option>
                    </select>
                    <input onChange={(e) => setLayanan(p => ({ ...p, quantity: parseInt(e.target.value) }))} type="number" min={1} placeholder="Type here" className="input" />
                </div>
                <div onClick={() => { dispatch({ type: "tambah", payload: {...layanan, id: getId()} }) }} className="btn btn-sm btn-accent w-fit">Tambah Layanan</div>
            </div>

            <div className="flex flex-col gap-y-3 bg-white rounded shadow-md w-4/5 p-3 mt-2">
                <span className="font-bold">Layanan</span>
                {layanans.map(l => {
                    return <div key={l.id} className="flex justify-between text-sm tewhite">
                        <span>{l.name}</span>
                        <div className="space-x-2">
                            <span>{l.quantity} Kg</span>
                            <button onClick={() => dispatch({type: "hapus", payload: {...layanan, id: l.id}})} className="btn btn-error btn-xs text-white">X</button>
                        </div>
                    </div>
                })}
            </div>

            <button className="btn btn-primary btn-sm mt-3">Tambah</button>
        </form>
    </div>
}