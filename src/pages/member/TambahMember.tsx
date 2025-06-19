import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { AxiosAuth } from "../../utils/axios";
import { useNavigate } from "react-router-dom";

export default function TambahMember() {
    useAuth()
    const navigate = useNavigate()
    const tambahMember = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const body = Object.fromEntries(new FormData(e.currentTarget))
        if( !body.email) delete body.email
        if( !body.whatsapp) delete body.whatsapp
        
        try {
            const res = await AxiosAuth.post("/member", body)
            await Swal.fire({ text: res.data.message, icon: "success" })
            navigate(-1)
        } catch (error: any) {
            console.log(error);
            Swal.fire({
                text: Array.isArray(error.response?.data?.errors)
                    ? error.response.data.errors.join(", ")
                    : (error.response?.data?.message ?? "terjadi kesalahan saat tambah member"),
                icon: "error",
            })
        }

    }
    return (
        <div className="flex items-center justify-center min-h-screen">
            <form onSubmit={tambahMember} className="bg-base-100 rounded-xl shadow-lg p-8 flex flex-col items-center gap-y-4 w-full max-w-md border border-base-300">
                <h2 className="font-bold text-2xl mb-2 text-sky-700">Tambah Member</h2>
                <div className="flex flex-col gap-y-1 w-full">
                    <label className="font-semibold text-slate-600">Nama</label>
                    <input type="text" name="nama" className="input input-bordered w-full" placeholder="Masukkan nama..." required />
                </div>
                <div className="flex flex-col gap-y-1 w-full">
                    <label className="font-semibold text-slate-600">Email</label>
                    <input type="email" name="email" className="input input-bordered w-full" placeholder="Masukkan email..." />
                </div>
                <div className="flex flex-col gap-y-1 w-full">
                    <label className="font-semibold text-slate-600">Whatsapp</label>
                    <input type="text" name="whatsapp" pattern="\d*" className="input input-bordered w-full" placeholder="Masukkan nomor whatsapp..." />
                </div>
                <button className="btn btn-primary btn-md mt-4 w-full shadow">Tambah</button>
            </form>
        </div>
    );
}