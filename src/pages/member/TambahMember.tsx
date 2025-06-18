import useAuth from "../../hooks/useAuth";

export default function TambahMember() {
    useAuth()
    return (
        <div className="flex items-center justify-center min-h-screen">
            <form className="bg-base-100 rounded-xl shadow-lg p-8 flex flex-col items-center gap-y-4 w-full max-w-md border border-base-300">
                <h2 className="font-bold text-2xl mb-2 text-sky-700">Tambah Member</h2>
                <div className="flex flex-col gap-y-1 w-full">
                    <label className="font-semibold text-slate-600">Nama</label>
                    <input type="text" className="input input-bordered w-full" placeholder="Masukkan nama..." required />
                </div>
                <div className="flex flex-col gap-y-1 w-full">
                    <label className="font-semibold text-slate-600">Satuan</label>
                    <input type="number" className="input input-bordered w-full" placeholder="Masukkan satuan..." required />
                </div>
                <div className="flex flex-col gap-y-1 w-full">
                    <label className="font-semibold text-slate-600">Harga</label>
                    <input type="number" className="input input-bordered w-full" placeholder="Masukkan harga..." required />
                </div>
                <button className="btn btn-primary btn-md mt-4 w-full shadow">Tambah</button>
            </form>
        </div>
    );
}