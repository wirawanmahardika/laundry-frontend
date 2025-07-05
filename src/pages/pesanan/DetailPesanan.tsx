import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import pesananIcon from "../../assets/img/pesanan.png";
import { MdArrowBack } from "react-icons/md";
import dayjs from "dayjs";
import { FaWhatsapp } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import { AxiosAuth } from "../../utils/axios";
import type { transaksiType } from "../../types/transaksiType";

export default function DetailPesanan() {
    useAuth();
    const { id } = useParams();
    const [transaksi, setTransaksi] = useState<transaksiType | null>(null);
    const navigate = useNavigate();
    const [showConfirmTolak, setShowConfirmTolak] = useState(false);

    useEffect(() => {
        AxiosAuth.get("/transaksi/" + id)
            .then(res => setTransaksi(res.data.data));
    }, [id]);

    const handleWhatsapp = () => {
        if (transaksi?.whatsapp) {
            window.open(`https://wa.me/${transaksi.whatsapp.replace(/^0/, "62")}`, "_blank");
        }
    };
    const handleEmail = () => {
        if (transaksi?.email) {
            window.open(`mailto:${transaksi?.email}`, "_blank");
        }
    };
    const handleTolakQris = () => setShowConfirmTolak(true);
    const confirmTolakQris = () => {
        setTransaksi(prev => prev ? { ...prev, bukti: "" } : null);
        setShowConfirmTolak(false);
    };
    const cancelTolakQris = () => setShowConfirmTolak(false);

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
                <span className="badge badge-outline badge-info text-[0.8rem] font-mono mt-2">{transaksi?.id}</span>
                <span className="text-2xl font-bold text-slate-800">{transaksi?.nama}</span>
                <div className="flex flex-col sm:flex-row gap-2 w-full justify-center">
                    <span className="text-slate-500 text-sm">Whatsapp: {transaksi?.whatsapp || <span className="italic text-rose-400">Tidak ada</span>}</span>
                    <span className="text-slate-500 text-sm">Email: {transaksi?.email || <span className="italic text-rose-400">Tidak ada</span>}</span>
                </div>
                <div className="flex gap-x-2 mt-2">
                    <button
                        className="btn btn-success btn-xs rounded-full flex items-center gap-x-1"
                        onClick={handleWhatsapp}
                        disabled={!transaksi?.whatsapp}
                        type="button"
                    >
                        <FaWhatsapp /> Whatsapp
                    </button>
                    <button
                        className="btn btn-info btn-xs rounded-full flex items-center gap-x-1"
                        onClick={handleEmail}
                        disabled={!transaksi?.email}
                        type="button"
                    >
                        <MdEmail /> Email
                    </button>
                </div>
                <div className="flex items-center gap-x-2 mt-3">
                    <span className={`badge badge-${transaksi?.sudah_bayar ? "success" : "warning"} badge-md font-semibold`}>
                        {transaksi?.sudah_bayar ? "Sudah Dibayar" : "Belum Dibayar"}
                    </span>
                </div>
                <span className="text-slate-500 text-sm">
                    Diambil pada: {transaksi?.estimasi_selesai ? dayjs(transaksi.estimasi_selesai).format("D MMMM YYYY HH:mm") : <span className="italic text-rose-400">Tidak ada</span>}
                </span>
                <div className="flex flex-col gap-y-3 bg-base-200 rounded-xl shadow-inner w-full p-4 mt-2 border border-base-300">
                    <span className="font-bold text-sky-700">Daftar Layanan</span>
                    {transaksi?.layanans?.length === 0 && (
                        <span className="text-slate-400 text-sm italic">Belum ada layanan ditambahkan.</span>
                    )}
                    {transaksi?.layanans?.map(l => (
                        <div key={l.id} className="flex justify-between items-center text-sm bg-base-100 rounded-lg px-3 py-2 shadow border border-base-200">
                            <span className="font-medium">{l.layanan?.nama}</span>
                            <span className="badge badge-info badge-sm">{l.quantity} Kg</span>
                        </div>
                    ))}
                </div>
                {transaksi?.bukti && (
                    <div className="flex flex-col items-center w-full mt-6">
                        <span className="font-semibold text-slate-600 mb-2">Bukti Pembayaran QRIS</span>
                        <div className="bg-base-200 border border-sky-200 rounded-xl p-4 shadow flex flex-col items-center">
                            <img
                                src={transaksi.bukti}
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
                    <button
                        className="btn btn-warning btn-xs rounded-full"
                        onClick={() => navigate(`/pesanan/${id}/edit`)}
                        type="button"
                    >
                        Ubah Pesanan
                    </button>
                </div>
            </div>
        </div>
    );
}