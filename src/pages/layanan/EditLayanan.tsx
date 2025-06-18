import { useNavigate } from "react-router-dom";
import { useState } from "react";
import layananIcon from "../../assets/img/layanan.png";
import { MdArrowBack } from "react-icons/md";
import useAuth from "../../hooks/useAuth";

export default function EditLayanan() {
    useAuth()
    // Dummy data, ganti dengan fetch dari API jika perlu
    const [form, setForm] = useState({
        name: "Cuci Kering",
        price: 21000,
        satuan: "kg",
    });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Lakukan update ke backend di sini
        // Setelah sukses:
        navigate(-1); // Kembali ke daftar layanan atau detail layanan
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
                        name="name"
                        className="input input-bordered w-full"
                        placeholder="Nama layanan"
                        value={form.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="flex flex-col gap-y-1 w-full">
                    <label className="font-semibold text-slate-600">Harga</label>
                    <input
                        type="number"
                        name="price"
                        className="input input-bordered w-full"
                        placeholder="Harga layanan"
                        value={form.price}
                        onChange={handleChange}
                        min={0}
                        required
                    />
                </div>
                <div className="flex flex-col gap-y-1 w-full">
                    <label className="font-semibold text-slate-600">Satuan</label>
                    <select
                        name="satuan"
                        className="select select-bordered w-full"
                        value={form.satuan}
                        onChange={handleChange}
                        required
                    >
                        <option value="kg">kg</option>
                        <option value="pcs">pcs</option>
                        <option value="meter">meter</option>
                    </select>
                </div>
                <button className="btn btn-primary btn-md mt-4 w-full shadow" type="submit">
                    Simpan Perubahan
                </button>
            </form>
        </div>
    );
}