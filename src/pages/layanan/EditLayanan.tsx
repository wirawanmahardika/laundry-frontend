import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import layananIcon from "../../assets/img/layanan.png";
import { MdArrowBack } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import { AxiosAuth } from "../../utils/axios";
import type { layananType } from "../../types/layananType";
import Swal from "sweetalert2";

export default function EditLayanan() {
    useAuth()
    const { id } = useParams()
    const [layanan, setLayanan] = useState<layananType>()
    const navigate = useNavigate();

    useEffect(() => {
        AxiosAuth.get("/layanan/" + id)
            .then(res => { setLayanan(res.data.data) })
    }, [])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const body = {
            nama: e.currentTarget.nama.value,
            harga: parseInt(e.currentTarget.harga.value) ?? 0,
            satuan: e.currentTarget.satuan.value,
            prioritas: parseInt(e.currentTarget.prioritas.value) ?? 0,
        }

        try {
            const res = await AxiosAuth.put("/layanan/" + id, body)
            await Swal.fire({
                text: res.data.message,
                icon: "success",
            })
            navigate(-1);
        } catch (error: any) {
            Swal.fire({
                text: Array.isArray(error.response?.data?.errors)
                    ? error.response.data.errors.join(", ")
                    : (error.response?.data?.message ?? "terjadi kesalahan saat tambah layanan"),
                icon: "error"
            });
        }
    };

    return (
        <div className="container mx-auto max-w-md px-4 py-8 flex flex-col gap-y-6">
            <button
                className="btn btn-circle btn-sm bg-base-100/90 border border-base-300 shadow text-sky-700 hover:bg-sky-100 transition self-start mb-2"
                onClick={() => navigate(-1)}
                type="button"
                title="Kembali"
            >
                <MdArrowBack size={20} />
            </button>
            <form
                className="bg-base-100 rounded-xl p-6 shadow-lg border border-base-200 flex flex-col items-center gap-y-4"
                onSubmit={handleSubmit}
            >
                <img
                    className="rounded-full w-20 h-20 object-cover border-4 border-sky-400 shadow"
                    src={layananIcon}
                    alt="Layanan"
                />
                <h2 className="font-bold text-xl text-sky-700 mb-2">Edit Layanan</h2>
                <div className="flex flex-col gap-y-1 w-full">
                    <label className="font-semibold text-slate-600">Nama Layanan</label>
                    <input
                        type="text"
                        name="nama"
                        className="input input-bordered w-full"
                        placeholder="Nama layanan"
                        defaultValue={layanan?.nama}
                        required
                    />
                </div>
                <div className="flex flex-col gap-y-1 w-full">
                    <label className="font-semibold text-slate-600">Harga</label>
                    <input
                        type="number"
                        name="harga"
                        className="input input-bordered w-full"
                        placeholder="Harga layanan"
                        defaultValue={layanan?.harga}
                        min={0}
                        required
                    />
                </div>
                <div className="flex flex-col gap-y-1 w-full">
                    <label className="font-semibold text-slate-600">Satuan</label>
                    <input
                        type="text"
                        name="satuan"
                        className="input input-bordered w-full"
                        placeholder="Masukkan satuan..."
                        defaultValue={layanan?.satuan}
                        required
                    />
                </div>
                <div className="flex flex-col gap-y-1 w-full">
                    <label className="font-semibold text-slate-600">Prioritas</label>
                    <input
                        type="number"
                        name="prioritas"
                        className="input input-bordered w-full"
                        placeholder="Prioritas Layanan"
                        defaultValue={layanan?.prioritas}
                        min={0}
                        required
                    />
                </div>

                <button className="btn btn-primary btn-md mt-4 w-full shadow" type="submit">
                    Simpan Perubahan
                </button>
            </form>
        </div>
    );
}