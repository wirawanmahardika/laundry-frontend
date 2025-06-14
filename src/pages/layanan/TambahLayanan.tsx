export default function TambahLayanan() {
    return <div className="flex items-center justify-center h-full">
        <form className="flex flex-col items-center gap-y-2 w-full">
            <h2 className="font-bold text-2xl mb-4">Tambah Layanan</h2>
            <div className="flex flex-col gap-y-1 w-4/5 mt-2">
                <label className="font-semibold">Nama</label>
                <input type="text" className="input" placeholder="Masukkan nama..." required />
            </div>
            <div className="flex flex-col gap-y-1 w-4/5 mt-2">
                <label className="font-semibold">Satuan</label>
                <input type="number" className="input" placeholder="Masukkan satuan..." required />
            </div>
            <div className="flex flex-col gap-y-1 w-4/5 mt-2">
                <label className="font-semibold">Harga</label>
                <input type="number" className="input" placeholder="Masukkan harga..." required />
            </div>
            <button className="btn btn-primary btn-sm mt-3">Tambah</button>
        </form>
    </div>
}