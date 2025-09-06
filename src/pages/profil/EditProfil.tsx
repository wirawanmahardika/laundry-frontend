import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowBack, MdEdit } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import { AxiosAuth } from "../../utils/axios";
import type { profilType } from "../../types/profilType";
import Swal from "sweetalert2";

export default function EditProfil() {
    useAuth()
    // Dummy data, ganti dengan fetch dari API jika perlu
    const [profil, setProfil] = useState<profilType>()
    const [preview, setPreview] = useState(profil?.image);

    useEffect(() => {
        AxiosAuth.get("/tenant")
            .then(res => {
                setProfil(res.data.data)
                setPreview(res.data.data.image)
            })
    }, [])

    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        Swal.fire({
            icon: "info",
            title: 'Memproses perubahan...',
            text: 'Silakan tunggu sebentar',
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
            }
        });
        
        try {
            const res = await AxiosAuth.put("/tenant", formData)
            await Swal.fire({ text: res.data, icon: "success" })
            navigate(-1)
        } catch (error: any) {
            console.log(error);

            Swal.fire({
                text: Array.isArray(error.response?.data?.errors)
                    ? error.response.data.errors.join(", ")
                    : (error.response?.data?.message ?? "terjadi kesalahan saat mengedit profil"),
                icon: "error",
            })
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
                <div className="relative group">
                    <img
                        className="rounded-full w-24 h-24 object-cover border-4 border-sky-400 shadow"
                        src={preview}
                        alt="Profile"
                    />
                    <button
                        type="button"
                        className="absolute bottom-2 right-2 btn btn-xs btn-circle btn-info shadow opacity-80 group-hover:opacity-100"
                        onClick={() => fileInputRef.current?.click()}
                        title="Edit Foto"
                    >
                        <MdEdit size={16} />
                    </button>
                    <input
                        name="image"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handlePhotoChange}
                    />
                </div>
                <h2 className="font-bold text-xl text-sky-700 mb-2">Edit Profil</h2>
                <div className="flex flex-col gap-y-1 w-full">
                    <label className="font-semibold text-slate-600">Nama</label>
                    <input
                        type="text"
                        name="nama"
                        className="input input-bordered w-full"
                        placeholder="Nama singkat"
                        defaultValue={profil?.nama}
                        required
                    />
                </div>
                <div className="flex flex-col gap-y-1 w-full">
                    <label className="font-semibold text-slate-600">Nama Lengkap</label>
                    <input
                        type="text"
                        name="nama_lengkap"
                        className="input input-bordered w-full"
                        placeholder="Nama lengkap"
                        defaultValue={profil?.nama_lengkap}
                        required
                    />
                </div>
                <div className="flex flex-col gap-y-1 w-full">
                    <label className="font-semibold text-slate-600">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="input input-bordered w-full"
                        placeholder="Email"
                        defaultValue={profil?.email}
                        required
                    />
                </div>
                <div className="flex flex-col gap-y-1 w-full">
                    <label className="font-semibold text-slate-600">Nomor HP</label>
                    <input
                        type="text"
                        name="phone"
                        className="input input-bordered w-full"
                        placeholder="Nomor HP"
                        defaultValue={profil?.phone}
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