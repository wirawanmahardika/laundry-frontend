import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import pesananIcon from "../../assets/img/pesanan.png";
import { MdArrowBack, MdEdit } from "react-icons/md";
import dayjs from "dayjs";
import { FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import useAuth from "../../hooks/useAuth";

type LayananType = {
    id: number;
    name: string;
    quantity: number;
};

export default function DetailPesanan() {
    useAuth()
    // Dummy data, ganti dengan fetch dari API jika perlu
    const [pesanan, setPesanan] = useState({
        id: "P001",
        nama: "Wirawan",
        phone: "08123456789",
        email: "wirawan@email.com",
        diambilPada: "2025-06-16T10:00",
        layanans: [
            { id: 1, name: "Express", quantity: 2 },
            { id: 2, name: "Sprei", quantity: 1 },
        ] as LayananType[],
        sudahBayar: true,
        buktiQris: "/img/qris.jpeg", // contoh url gambar bukti qris
    });
    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState(pesanan);
    const [layanan, setLayanan] = useState<LayananType>({ id: 0, name: "", quantity: 0 });
    const [buktiQris, setBuktiQris] = useState(pesanan.buktiQris || "");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const [sudahBayar, setSudahBayar] = useState<boolean>(false);

    const handleEdit = () => {
        setEditMode(true);
        setEditData(pesanan);
        setBuktiQris(pesanan.buktiQris || "");
        setSudahBayar(pesanan.sudahBayar ?? false);
    };

    const handleSave = () => {
        setEditMode(false);
        setPesanan({ ...editData, buktiQris, sudahBayar });
    };

    const handleCancel = () => {
        setEditMode(false);
        setEditData(pesanan);
        setBuktiQris(pesanan.buktiQris || "");
        setSudahBayar(pesanan.sudahBayar ?? false);
    };

    const handleAddLayanan = () => {
        if (layanan.name && layanan.quantity > 0) {
            setEditData(prev => ({
                ...prev,
                layanans: [
                    ...prev.layanans,
                    { ...layanan, id: Date.now() }
                ]
            }));
            setLayanan({ id: 0, name: "", quantity: 0 });
        }
    };

    const handleDeleteLayanan = (id: number) => {
        setEditData(prev => ({
            ...prev,
            layanans: prev.layanans.filter(l => l.id !== id)
        }));
    };

    const handleQrisChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setBuktiQris(url);
        }
    };

    // Fungsi kontak
    const handleWhatsapp = () => {
        if (pesanan.phone) {
            window.open(`https://wa.me/${pesanan.phone.replace(/^0/, "62")}`, "_blank");
        }
    };
    const handleEmail = () => {
        if (pesanan.email) {
            window.open(`mailto:${pesanan.email}`, "_blank");
        }
    };

    const [showConfirmTolak, setShowConfirmTolak] = useState(false);
    // Fungsi untuk menolak bukti QRIS dengan konfirmasi
    const handleTolakQris = () => {
        setShowConfirmTolak(true);
    };

    const confirmTolakQris = () => {
        setPesanan(prev => ({ ...prev, buktiQris: "" }));
        setShowConfirmTolak(false);
    };

    const cancelTolakQris = () => {
        setShowConfirmTolak(false);
    };

    return (
        <div className="container mx-auto max-w-2xl px-4 py-8 flex flex-col gap-y-6">
            <button
                className="btn btn-circle btn-sm bg-base-100/90 border border-base-300 shadow text-sky-700 hover:bg-sky-100 transition self-start mb-2"
                onClick={() => navigate(-1)}
                type="button"
                title="Kembali"
            >
                <MdArrowBack size={20} />
            </button>
            <div className="bg-base-100 rounded-xl p-6 shadow-lg border border-base-200 flex flex-col items-center gap-y-3">
                <img
                    className="rounded-full w-24 h-24 object-cover border-4 border-sky-400 shadow"
                    src={pesananIcon}
                    alt="Pesanan"
                />
                <span className="badge badge-outline badge-info text-[0.8rem] font-mono mt-2">{pesanan.id}</span>
                {editMode ? (
                    <>
                        <div className="flex flex-col gap-y-1 w-full">
                            <label className="font-semibold text-slate-600">Nama</label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                value={editData.nama}
                                onChange={e => setEditData({ ...editData, nama: e.target.value })}
                                required
                            />
                        </div>
                        <div className="flex flex-col gap-y-1 w-full">
                            <label className="font-semibold text-slate-600">Phone</label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                value={editData.phone}
                                onChange={e => setEditData({ ...editData, phone: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col gap-y-1 w-full">
                            <label className="font-semibold text-slate-600">Email</label>
                            <input
                                type="email"
                                className="input input-bordered w-full"
                                value={editData.email}
                                onChange={e => setEditData({ ...editData, email: e.target.value })}
                            />
                        </div>
                        <div className="flex flex-col gap-y-1 w-full">
                            <label className="font-semibold text-slate-600">Diambil Pada</label>
                            <input
                                type="datetime-local"
                                className="input input-bordered w-full"
                                value={editData.diambilPada}
                                onChange={e => setEditData({ ...editData, diambilPada: e.target.value })}
                            />
                        </div>
                        <div className="flex items-center gap-x-2 w-full mt-2">
                            <input
                                type="checkbox"
                                id="sudahBayar"
                                className="checkbox checkbox-primary"
                                checked={sudahBayar}
                                onChange={e => setSudahBayar(e.target.checked)}
                            />
                            <label htmlFor="sudahBayar" className="font-semibold text-slate-600 cursor-pointer">
                                Tandai pesanan ini sudah dibayar
                            </label>
                        </div>
                        {/* Tambah layanan */}
                        <div className="flex flex-col gap-y-2 w-full">
                            <label className="font-semibold text-slate-600">Tambah Layanan</label>
                            <div className="flex gap-x-2">
                                <select
                                    onChange={e => setLayanan(p => ({ ...p, name: e.target.value }))}
                                    value={layanan.name}
                                    className="select select-bordered w-1/2"
                                    required
                                >
                                    <option value="">Layanan</option>
                                    <option>Express</option>
                                    <option>Sprei</option>
                                </select>
                                <input
                                    onChange={e => setLayanan(p => ({ ...p, quantity: parseInt(e.target.value) }))}
                                    type="number"
                                    min={1}
                                    value={layanan.quantity || ""}
                                    placeholder="Jumlah"
                                    className="input input-bordered w-1/2"
                                />
                            </div>
                            <button
                                type="button"
                                onClick={handleAddLayanan}
                                className="btn btn-accent btn-sm w-fit self-end mt-1"
                            >
                                Tambah Layanan
                            </button>
                        </div>
                        {/* Daftar layanan */}
                        <div className="flex flex-col gap-y-3 bg-base-200 rounded-xl shadow-inner w-full p-4 mt-2 border border-base-300">
                            <span className="font-bold text-sky-700">Daftar Layanan</span>
                            {editData.layanans.length === 0 && (
                                <span className="text-slate-400 text-sm italic">Belum ada layanan ditambahkan.</span>
                            )}
                            {editData.layanans.map(l => (
                                <div key={l.id} className="flex justify-between items-center text-sm bg-base-100 rounded-lg px-3 py-2 shadow border border-base-200">
                                    <span className="font-medium">{l.name}</span>
                                    <div className="flex items-center gap-x-2">
                                        <span className="badge badge-info badge-sm">{l.quantity} Kg</span>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteLayanan(l.id)}
                                            className="btn btn-error btn-xs text-white rounded-full"
                                            title="Hapus"
                                        >
                                            &times;
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Upload bukti pembayaran QRIS */}
                        <div className="flex flex-col gap-y-1 w-full mt-3">
                            <label className="font-semibold text-slate-600">Bukti Pembayaran QRIS</label>
                            <div className="flex items-center gap-x-3">
                                {buktiQris && (
                                    <img
                                        src={buktiQris}
                                        alt="Bukti QRIS"
                                        className="w-24 h-24 object-cover rounded-lg border border-sky-200 shadow"
                                    />
                                )}
                                <button
                                    type="button"
                                    className="btn btn-xs btn-info rounded-full flex items-center gap-x-1"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <MdEdit size={14} /> {buktiQris ? "Ganti Foto" : "Upload Foto"}
                                </button>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    ref={fileInputRef}
                                    onChange={handleQrisChange}
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <span className="text-2xl font-bold text-slate-800">{pesanan.nama}</span>
                        <div className="flex flex-col sm:flex-row gap-2 w-full justify-center">
                            <span className="text-slate-500 text-sm">Phone: {pesanan.phone || <span className="italic text-rose-400">Tidak ada</span>}</span>
                            <span className="text-slate-500 text-sm">Email: {pesanan.email || <span className="italic text-rose-400">Tidak ada</span>}</span>
                        </div>
                        <div className="flex gap-x-2 mt-2">
                            <button
                                className="btn btn-success btn-xs rounded-full flex items-center gap-x-1"
                                onClick={handleWhatsapp}
                                disabled={!pesanan.phone}
                                type="button"
                            >
                                <FaWhatsapp /> Whatsapp
                            </button>
                            <button
                                className="btn btn-info btn-xs rounded-full flex items-center gap-x-1"
                                onClick={handleEmail}
                                disabled={!pesanan.email}
                                type="button"
                            >
                                <MdEmail /> Email
                            </button>
                        </div>
                        <div className="flex items-center gap-x-2 mt-3">
                            <span className={`badge badge-${pesanan.sudahBayar ? "success" : "warning"} badge-md font-semibold`}>
                                {pesanan.sudahBayar ? "Sudah Dibayar" : "Belum Dibayar"}
                            </span>
                        </div>
                        <span className="text-slate-500 text-sm">
                            Diambil pada: {pesanan.diambilPada ? dayjs(pesanan.diambilPada).format("D MMMM YYYY HH:mm") : <span className="italic text-rose-400">Tidak ada</span>}
                        </span>
                        <div className="flex flex-col gap-y-3 bg-base-200 rounded-xl shadow-inner w-full p-4 mt-2 border border-base-300">
                            <span className="font-bold text-sky-700">Daftar Layanan</span>
                            {pesanan.layanans.length === 0 && (
                                <span className="text-slate-400 text-sm italic">Belum ada layanan ditambahkan.</span>
                            )}
                            {pesanan.layanans.map(l => (
                                <div key={l.id} className="flex justify-between items-center text-sm bg-base-100 rounded-lg px-3 py-2 shadow border border-base-200">
                                    <span className="font-medium">{l.name}</span>
                                    <span className="badge badge-info badge-sm">{l.quantity} Kg</span>
                                </div>
                            ))}
                        </div>
                        {/* Tampilkan bukti pembayaran QRIS jika ada */}
                        {pesanan.buktiQris && (
                            <div className="flex flex-col items-center w-full mt-6">
                                <span className="font-semibold text-slate-600 mb-2">Bukti Pembayaran QRIS</span>
                                <div className="bg-base-200 border border-sky-200 rounded-xl p-4 shadow flex flex-col items-center">
                                    <img
                                        src={pesanan.buktiQris}
                                        alt="Bukti QRIS"
                                        className="w-full max-w-xs sm:max-w-sm md:max-w-md h-auto rounded-lg border border-sky-300 shadow-lg object-contain"
                                        style={{ background: "#fff" }}
                                    />
                                    <button
                                        className="btn btn-error btn-xs mt-4"
                                        onClick={handleTolakQris}
                                        type="button"
                                    >
                                        Tolak Bukti QRIS
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* Popup Konfirmasi Tolak QRIS */}
                {showConfirmTolak && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                        <div className="bg-base-100 rounded-xl shadow-lg p-6 w-full max-w-xs border border-base-300 flex flex-col items-center">
                            <div className="font-bold text-lg text-rose-600 mb-2">Tolak Bukti QRIS?</div>
                            <div className="text-center mb-4 text-slate-700">
                                Apakah Anda yakin ingin <span className="font-semibold text-rose-600">menolak & menghapus</span> bukti pembayaran QRIS ini? <br />
                                <span className="text-xs text-rose-400">Bukti akan dihapus permanen dari database.</span>
                            </div>
                            <div className="flex gap-x-2 mt-2">
                                <button
                                    className="btn btn-error btn-sm rounded-full"
                                    onClick={confirmTolakQris}
                                >
                                    Ya, Hapus
                                </button>
                                <button
                                    className="btn btn-ghost btn-sm rounded-full"
                                    onClick={cancelTolakQris}
                                >
                                    Batal
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="flex gap-x-2 mt-4">
                    {editMode ? (
                        <>
                            <button className="btn btn-primary btn-xs rounded-full" onClick={handleSave} type="button">
                                Simpan
                            </button>
                            <button className="btn btn-ghost btn-xs rounded-full" onClick={handleCancel} type="button">
                                Batal
                            </button>
                        </>
                    ) : (
                        <button className="btn btn-warning btn-xs rounded-full" onClick={handleEdit} type="button">
                            Ubah Pesanan
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}