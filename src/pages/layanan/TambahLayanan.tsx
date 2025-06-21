import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { AxiosAuth } from "../../utils/axios";
import { useNavigate } from "react-router-dom";

export default function TambahLayanan() {
    const navigate = useNavigate()
    useAuth()
    const tambahLayanan = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const body = {
            nama: e.currentTarget.nama.value,
            harga: parseInt(e.currentTarget.harga.value) ?? 0,
            satuan: e.currentTarget.satuan.value
        }

        try {
            const res = await AxiosAuth.post("/layanan", body)
            await Swal.fire({
                text: res.data.message,
                icon: "success",
            })
            navigate('/layanan')
        } catch (error: any) {
            Swal.fire({
                text: Array.isArray(error.response?.data?.errors)
                    ? error.response.data.errors.join(", ")
                    : (error.response?.data?.message ?? "terjadi kesalahan saat tambah layanan"),
                icon: "error"
            });
        }

    }

    return (
        <div className="flex items-center justify-center min-h-full">
            <form onSubmit={tambahLayanan} className="bg-base-100 rounded-xl shadow-lg p-8 flex flex-col items-center gap-y-4 w-full max-w-md border border-base-300">
                <h2 className="font-bold text-2xl mb-2 text-sky-700">Tambah Layanan</h2>
                <div className="flex flex-col gap-y-1 w-full">
                    <label className="font-semibold text-slate-600">Nama</label>
                    <input type="text" name="nama" className="input input-bordered w-full" placeholder="Masukkan nama..." required />
                </div>
                <div className="flex flex-col gap-y-1 w-full">
                    <label className="font-semibold text-slate-600">Satuan</label>
                    <input type="text" name="satuan" className="input input-bordered w-full" placeholder="Masukkan satuan..." required />
                </div>
                <div className="flex flex-col gap-y-1 w-full">
                    <label className="font-semibold text-slate-600">Harga</label>
                    <input type="number" name="harga" className="input input-bordered w-full" placeholder="Masukkan harga..." required />
                </div>
                <button className="btn btn-primary btn-md mt-4 w-full shadow">Tambah</button>
            </form>
        </div>
    );
}