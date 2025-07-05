import { useState, useRef, useEffect } from "react";
import { MdArrowBack, MdEdit, MdExpandMore, MdExpandLess } from "react-icons/md";
import { AxiosAuth } from "../../utils/axios";
import { useNavigate, useParams } from "react-router-dom";

type Layanan = {
    id: number;
    nama: string;
    satuan: string;
    quantity: number;
};

type Pesanan = {
    id: number;
    nama: string;
    whatsapp: string | null;
    email: string | null;
    estimasi_selesai: string;
    status: "menunggu" | "proses" | "selesai";
    sudah_bayar: boolean;
    bukti: string | null;
    layanans: Layanan[];
};

const defaultPesanan: Pesanan = {
    id: 0,
    nama: "",
    whatsapp: "",
    email: "",
    estimasi_selesai: "",
    sudah_bayar: false,
    status: "menunggu",
    bukti: null,
    layanans: []
};
const defaultLayananBaru = {
    id: 0,
    nama: "",
    satuan: "",
    quantity: 1,
}

export default function EditPesanan() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [pesanan, setPesanan] = useState<Pesanan>(defaultPesanan);
    const [layananBaru, setLayananBaru] = useState<Layanan>(defaultLayananBaru);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [layananOptions, setLayananOptions] = useState<Omit<Layanan, "quantity">[]>([])

    // Draft untuk status transaksi dan bukti
    const [statusDraft, setStatusDraft] = useState<Pesanan["status"]>("menunggu");
    const [buktiDraft, setBuktiDraft] = useState<string | null>(null);
    const [sudahBayarDraft, setSudahBayarDraft] = useState<boolean>(false);

    // Accordion state
    const [showDetail, setShowDetail] = useState(false);

    useEffect(() => {
        AxiosAuth.get("/layanans")
            .then(res => { setLayananOptions(res.data.data) })
    }, [])

    useEffect(() => {
        AxiosAuth.get("/transaksi/" + id)
            .then(res => {
                setPesanan({
                    ...res.data.data,
                    status: res.data.data.status as Pesanan["status"],
                    layanans: (res.data.data.layanans).map((l: any) => {
                        return { id: l.layanan.id, nama: l.layanan.nama, satuan: l.layanan.satuan, quantity: l.quantity }
                    })
                });
                setStatusDraft(res.data.data.status as Pesanan["status"]);
                setBuktiDraft(res.data.data.bukti);
                setSudahBayarDraft(res.data.data.sudah_bayar);
            })
    }, [id])


    // Handler update sudah_bayar
    const handleUpdateSudahBayar = async () => {
        setPesanan(p => ({ ...p, sudah_bayar: sudahBayarDraft }));
        try {
            const res = await AxiosAuth.patch(`/transaksi/${id}/payment`, { sudah_bayar: sudahBayarDraft })
            alert(res.data.message)
        } catch (error: any) {
            alert(error.response?.data?.message ?? "Status pembayaran diperbarui!");
        }
    };

    // Handler status transaksi
    const handleUpdateStatus = async () => {
        try {
            const res = await AxiosAuth.patch("/transaksi/" + id + "/status", { status: statusDraft })
            alert(res.data.message)
            setPesanan(p => ({ ...p, status: statusDraft }));
        } catch (error: any) {
            alert(error.response?.data?.message ?? "Gagal mengupdate status transaksi, terjadi kesalahan")
        }
    };

    // Handler bukti
    const handleQrisChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (buktiDraft) URL.revokeObjectURL(buktiDraft)
            const url = URL.createObjectURL(file);
            setBuktiDraft(url);
        }
    };
    const handleUpdateBukti = async () => {
        setPesanan(p => ({ ...p, bukti: buktiDraft }));
        if (!fileInputRef.current?.files?.length) {
            alert('Please select a file first');
            return;
        }

        const selectedFile = fileInputRef.current.files[0];
        try {
            const formData = new FormData()
            formData.append("bukti", selectedFile)

            const res = await AxiosAuth.patch(`transaksi/${id}/bukti`, formData)
            alert(res.data.message ?? "Bukti pembayaran diperbarui!");
        } catch (error: any) {
            alert(error.response?.data?.message ?? "Bukti pembayaran diperbarui!");
        }
    };

    // Handler layanan
    const handleAddLayanan = () => {
        if (!layananBaru.id || !layananBaru.quantity) return;
        const unduplicatedLayanan = pesanan.layanans.filter(l => l.id !== layananBaru.id)
        setPesanan(prev => ({
            ...prev,
            layanans: [...unduplicatedLayanan, layananBaru]
        }));
        setLayananBaru({ id: 0, nama: "", satuan: "", quantity: 1 });
    };

    const handleDeleteLayanan = (id: number) => {
        setPesanan(prev => ({
            ...prev,
            layanans: prev.layanans.filter(l => l.id !== id)
        }));
    };

    const handleSimpanPesanan = () => {
        console.log(pesanan);
        alert("Data pesanan disimpan (mock)!");
    }

    return (
        <div className="container mx-auto max-w-2xl px-4 py-8 flex flex-col gap-y-6">
            <button
                className="btn btn-circle btn-sm bg-base-100/90 border border-base-300 shadow text-sky-700 hover:bg-sky-100 transition self-start mb-2"
                onClick={() => navigate("/pesanan")}
                type="button"
                title="Kembali"
            >
                <MdArrowBack size={20} />
            </button>
            <div className="bg-base-100 rounded-xl p-6 shadow-lg border border-base-200 flex flex-col items-center gap-y-6">
                <div className="w-full flex flex-col gap-y-2">
                    <span className="font-bold text-lg">Status Transaksi</span>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-x-2">
                        <select
                            className="select select-bordered w-full sm:w-auto"
                            value={statusDraft}
                            onChange={e => setStatusDraft(e.target.value as Pesanan["status"])}
                        >
                            <option value="menunggu">Menunggu</option>
                            <option value="proses">Proses</option>
                            <option value="selesai">Selesai</option>
                        </select>
                        <button
                            className="btn btn-xs btn-primary rounded-full sm:ml-2 w-full sm:w-auto"
                            onClick={handleUpdateStatus}
                            type="button"
                            disabled={statusDraft === pesanan.status}
                        >
                            Update Status
                        </button>
                        <span className={`badge badge-${pesanan.status === "selesai" ? "success" : pesanan.status === "proses" ? "warning" : "info"} badge-md sm:ml-2 w-full sm:w-auto text-center`}>
                            {pesanan.status.charAt(0).toUpperCase() + pesanan.status.slice(1)}
                        </span>
                    </div>
                </div>

                {/* === Bagian Status Sudah Bayar === */}
                <div className="w-full flex flex-col gap-y-2 mt-4">
                    <span className="font-bold text-lg">Status Pembayaran</span>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-x-3">
                        <div className="flex items-center gap-x-2">
                            <input
                                type="checkbox"
                                id="sudahBayarUtama"
                                className="checkbox checkbox-primary"
                                checked={!!sudahBayarDraft}
                                onChange={e => setSudahBayarDraft(e.target.checked)}
                            />
                            <label htmlFor="sudahBayarUtama" className="font-semibold text-slate-600 cursor-pointer">
                                Sudah Dibayar
                            </label>
                        </div>
                        <button
                            className="btn btn-xs btn-primary rounded-full sm:ml-2 w-full sm:w-auto"
                            onClick={handleUpdateSudahBayar}
                            type="button"
                            disabled={sudahBayarDraft === pesanan.sudah_bayar}
                        >
                            Update Status Pembayaran
                        </button>
                        <span className={`badge badge-${pesanan.sudah_bayar ? "success" : "warning"} badge-md sm:ml-2 w-full sm:w-auto text-center`}>
                            {pesanan.sudah_bayar ? "Sudah Dibayar" : "Belum Dibayar"}
                        </span>
                    </div>
                </div>

                {/* === Bagian Upload Bukti QRIS === */}
                <div className="w-full flex flex-col gap-y-2 mt-4">
                    <span className="font-bold text-lg">Bukti Pembayaran QRIS</span>
                    <div className="flex flex-wrap items-center gap-2">
                        {buktiDraft && (
                            <img
                                src={buktiDraft}
                                alt="Bukti QRIS"
                                className="w-24 h-24 object-cover rounded-lg border border-sky-200 shadow"
                            />
                        )}
                        <button
                            type="button"
                            className="btn btn-xs btn-info rounded-full flex items-center gap-x-1"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <MdEdit size={14} /> {buktiDraft ? "Ganti Foto" : "Upload Foto"}
                        </button>
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            ref={fileInputRef}
                            onChange={handleQrisChange}
                        />
                        {buktiDraft && (
                            <button
                                type="button"
                                className="btn btn-xs btn-error rounded-full"
                                onClick={() => setBuktiDraft(null)}
                            >
                                Hapus Bukti
                            </button>
                        )}
                        <button
                            className="btn btn-xs btn-primary rounded-full"
                            onClick={handleUpdateBukti}
                            type="button"
                            disabled={!(!!buktiDraft)}
                        >
                            Update Bukti
                        </button>
                    </div>
                </div>
                {/* === Accordion Detail Transaksi === */}
                <div className="w-full mt-6">
                    <button
                        className="btn btn-ghost btn-sm w-full flex justify-between items-center border border-gray-400"
                        type="button"
                        onClick={() => setShowDetail(s => !s)}
                    >
                        <span>Detail Transaksi</span>
                        {showDetail ? <MdExpandLess /> : <MdExpandMore />}
                    </button>
                    {showDetail && (
                        <div className="flex flex-col gap-y-3 mt-2">
                            <div className="flex flex-col gap-y-1">
                                <label>Nama</label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={pesanan.nama}
                                    onChange={e => setPesanan(p => ({ ...p, nama: e.target.value }))}
                                />
                            </div>
                            <div className="flex flex-col gap-y-1">
                                <label>Whatsapp</label>
                                <input
                                    type="text"
                                    className="input input-bordered w-full"
                                    value={pesanan.whatsapp ?? ""}
                                    onChange={e => setPesanan(p => ({ ...p, whatsapp: e.target.value }))}
                                />
                            </div>
                            <div className="flex flex-col gap-y-1">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="input input-bordered w-full"
                                    value={pesanan.email ?? ""}
                                    onChange={e => setPesanan(p => ({ ...p, email: e.target.value }))}
                                />
                            </div>
                            <div className="flex flex-col gap-y-1">
                                <label>Diambil Pada</label>
                                <input
                                    type="datetime-local"
                                    className="input input-bordered w-full"
                                    value={pesanan.estimasi_selesai ?? ""}
                                    onChange={e => setPesanan(p => ({ ...p, estimasi_selesai: e.target.value }))}
                                />
                            </div>
                            {showDetail && (
                                <div className="flex flex-col gap-y-3 mt-2">
                                    {/* ...input lain... */}
                                    <div className="flex items-center gap-x-2">
                                        <input
                                            type="checkbox"
                                            id="sudahBayar"
                                            className="checkbox checkbox-primary"
                                            checked={!!pesanan.sudah_bayar}
                                            onChange={e => setPesanan(p => ({ ...p, sudah_bayar: e.target.checked }))}
                                        />
                                        <label htmlFor="sudahBayar" className="font-semibold text-slate-600 cursor-pointer">
                                            Sudah Dibayar
                                        </label>
                                    </div>
                                    {/* ...input layanan dan daftar layanan... */}
                                </div>
                            )}
                            {/* Tambah layanan */}
                            <div className="flex flex-col gap-y-2 mt-2">
                                <label>Tambah Layanan</label>
                                <div className="flex gap-x-2">
                                    <select
                                        className="select w-1/2"
                                        value={layananBaru.id}
                                        onChange={e => {
                                            const selected = layananOptions.find(l => l.id === Number(e.target.value));
                                            if (selected) {
                                                setLayananBaru({
                                                    id: selected.id,
                                                    nama: selected.nama,
                                                    satuan: selected.satuan,
                                                    quantity: layananBaru.quantity,
                                                });
                                            } else {
                                                setLayananBaru({ id: 0, nama: "", satuan: "", quantity: 1 });
                                            }
                                        }}
                                    >
                                        <option value={0}>Pilih Layanan</option>
                                        {layananOptions.map(l => (
                                            <option key={l.id} value={l.id}>{l.nama}</option>
                                        ))}
                                    </select>
                                    <input
                                        className="input w-1/2"
                                        type="number"
                                        min={1}
                                        value={layananBaru.quantity}
                                        onChange={e => setLayananBaru(l => ({ ...l, quantity: Number(e.target.value) }))}
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-accent btn-sm w-fit self-end mt-1"
                                    onClick={handleAddLayanan}
                                >
                                    Tambah Layanan
                                </button>
                            </div>
                            {/* Daftar layanan */}
                            <div className="flex flex-col gap-y-3 bg-base-200 rounded-xl shadow-inner w-full p-4 mt-2 border border-base-300">
                                <span className="font-bold text-sky-700">Daftar Layanan</span>
                                {pesanan.layanans.length === 0 && (
                                    <span className="text-slate-400 text-sm italic">Belum ada layanan ditambahkan.</span>
                                )}
                                {pesanan.layanans.map(l => (
                                    <div key={l.id} className="flex justify-between items-center text-sm bg-base-100 rounded-lg px-3 py-2 shadow border border-base-200">
                                        <span className="font-medium">{l.nama}</span>
                                        <div className="flex items-center gap-x-2">
                                            <span className="badge badge-info badge-sm">{l.quantity} {l.satuan}</span>
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
                            {/* Tombol Simpan/Batal */}
                            <div className="flex gap-x-2 mt-6">
                                <button className="btn btn-primary btn-xs rounded-full" onClick={handleSimpanPesanan} type="button">
                                    Simpan
                                </button>
                                <button className="btn btn-ghost btn-xs rounded-full" onClick={() => navigate("/pesanan")} type="button">
                                    Batal
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}