import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { MdArrowBack, MdEdit } from "react-icons/md";

export default function EditProfil() {
    // Dummy data, ganti dengan fetch dari API jika perlu
    const [form, setForm] = useState({
        fullname: "Wirawan Mahardika",
        name: "Wirawan",
        email: "john@gmail.com",
        phone: "081234567890",
        photo: "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250",
    });
    const [preview, setPreview] = useState(form.photo);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreview(url);
            setForm({ ...form, photo: url });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Lakukan update ke backend di sini
        // Setelah sukses:
        navigate(-1); // Kembali ke profil
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
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handlePhotoChange}
                    />
                </div>
                <h2 className="font-bold text-xl text-sky-700 mb-2">Edit Profil</h2>
                <div className="flex flex-col gap-y-1 w-full">
                    <label className="font-semibold text-slate-600">Nama Lengkap</label>
                    <input
                        type="text"
                        name="fullname"
                        className="input input-bordered w-full"
                        placeholder="Nama lengkap"
                        value={form.fullname}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex flex-col gap-y-1 w-full">
                    <label className="font-semibold text-slate-600">Nama (Singkat)</label>
                    <input
                        type="text"
                        name="name"
                        className="input input-bordered w-full"
                        placeholder="Nama singkat"
                        value={form.name}
                        onChange={handleChange}
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
                        value={form.email}
                        onChange={handleChange}
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
                        value={form.phone}
                        onChange={handleChange}
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