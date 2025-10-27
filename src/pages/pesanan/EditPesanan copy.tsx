import { useState, useRef, useEffect } from 'react';
import { MdArrowBack, MdEdit, MdExpandMore, MdExpandLess } from 'react-icons/md';
import { AxiosAuth } from '../../utils/axios';
import { useNavigate, useParams } from 'react-router-dom';
import type { transaksiLayananType } from '../../types/transaksiLayananType';
import type { transaksiType } from '../../types/transaksiType';
import type { layananType } from '../../types/layananType';

// Type definitions
type LayananPesanan = {
    id: number;
    nama: string;
    satuan: string;
    quantity: number;
};

type PesananForm = Omit<transaksiType, 'layanans'> & {
    layanans: LayananPesanan[];
};

type LayananOption = Omit<layananType, 'harga' | 'id_tenant'>;

// Constants
const DEFAULT_PESANAN: PesananForm = {
    id: 0,
    id_tenant: 0,
    id_member: null,
    nama: '',
    whatsapp: '',
    email: '',
    estimasi_selesai: '',
    sudah_bayar: false,
    status: 'menunggu',
    bukti: null,
    is_member: false,
    total_harga: 0,
    created_at: '',
    updated_at: '',
    layanans: [],
};

const DEFAULT_LAYANAN_BARU: LayananPesanan = {
    id: 0,
    nama: '',
    satuan: '',
    quantity: 1,
};

const STATUS_OPTIONS = [
    { value: 'menunggu', label: 'Menunggu' },
    { value: 'proses', label: 'Proses' },
    { value: 'selesai', label: 'Selesai' },
];

// Helper components
const StatusBadge = ({ status }: { status: PesananForm['status'] }) => {
    const statusText = status.charAt(0).toUpperCase() + status.slice(1);
    const badgeClass =
        status === 'selesai'
            ? 'badge-success'
            : status === 'proses'
            ? 'badge-warning'
            : 'badge-info';

    return <span className={`badge ${badgeClass} badge-md text-center`}>{statusText}</span>;
};

const PaymentBadge = ({ paid }: { paid: boolean }) => (
    <span className={`badge ${paid ? 'badge-success' : 'badge-warning'} badge-md text-center`}>
        {paid ? 'Sudah Dibayar' : 'Belum Dibayar'}
    </span>
);

export default function EditPesanan() {
    const { id } = useParams();
    const navigate = useNavigate();

    // State management
    const [pesanan, setPesanan] = useState<PesananForm>(DEFAULT_PESANAN);
    const [layananBaru, setLayananBaru] = useState<LayananPesanan>(DEFAULT_LAYANAN_BARU);
    const [layananOptions, setLayananOptions] = useState<LayananOption[]>([]);
    const [updateMode, setUpdateMode] = useState(false);

    // Draft states
    const [statusDraft, setStatusDraft] = useState<PesananForm['status']>('menunggu');
    const [buktiDraft, setBuktiDraft] = useState<string | null>(null);
    const [sudahBayarDraft, setSudahBayarDraft] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // Data fetching
    useEffect(() => {
        const fetchLayananOptions = async () => {
            try {
                const res = await AxiosAuth.get('/layanans');
                setLayananOptions(res.data.data);
            } catch (error) {
                console.error('Failed to fetch layanan options:', error);
            }
        };

        const fetchPesananData = async () => {
            try {
                const res = await AxiosAuth.get(`/transaksi/${id}`);
                const data = res.data.data;

                const formattedPesanan: PesananForm = {
                    ...data,
                    status: data.status as PesananForm['status'],
                    layanans: data.layanans.map((l: transaksiLayananType) => ({
                        id: l.layanan?.id,
                        nama: l.layanan?.nama,
                        satuan: l.layanan?.satuan,
                        quantity: l.quantity,
                    })),
                };

                setPesanan(formattedPesanan);
                setStatusDraft(data.status);
                setBuktiDraft(data.bukti);
                setSudahBayarDraft(data.sudah_bayar);
            } catch (error) {
                console.error('Failed to fetch pesanan data:', error);
            }
        };

        fetchLayananOptions();
        fetchPesananData();
    }, [id]);

    // Handlers
    const handleUpdateSudahBayar = async () => {
        try {
            const res = await AxiosAuth.patch(`/transaksi/${id}/payment`, {
                sudah_bayar: sudahBayarDraft,
            });

            setPesanan((p) => ({ ...p, sudah_bayar: sudahBayarDraft }));
            alert(res.data.message);
        } catch (error: any) {
            alert(error.response?.data?.message ?? 'Status pembayaran diperbarui!');
        }
    };

    const handleUpdateStatus = async () => {
        try {
            const res = await AxiosAuth.patch(`/transaksi/${id}/status`, {
                status: statusDraft,
            });

            setPesanan((p) => ({ ...p, status: statusDraft }));
            alert(res.data.message);
        } catch (error: any) {
            alert(error.response?.data?.message ?? 'Gagal mengupdate status transaksi');
        }
    };

    const handleQrisChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (buktiDraft) URL.revokeObjectURL(buktiDraft);
            setBuktiDraft(URL.createObjectURL(file));
        }
    };

    const handleUpdateBukti = async () => {
        if (!fileInputRef.current?.files?.length) {
            alert('Please select a file first');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('bukti', fileInputRef.current.files[0]);

            const res = await AxiosAuth.patch(`/transaksi/${id}/bukti`, formData);
            setPesanan((p) => ({ ...p, bukti: buktiDraft }));
            alert(res.data.message ?? 'Bukti pembayaran diperbarui!');
        } catch (error: any) {
            alert(error.response?.data?.message ?? 'Gagal mengupload bukti');
        }
    };

    const handleAddLayanan = () => {
        if (!layananBaru.id || !layananBaru.quantity) return;

        setPesanan((prev) => ({
            ...prev,
            layanans: [...prev.layanans.filter((l) => l.id !== layananBaru.id), layananBaru],
        }));

        setLayananBaru(DEFAULT_LAYANAN_BARU);
    };

    const handleDeleteLayanan = (id: number) => {
        setPesanan((prev) => ({
            ...prev,
            layanans: prev.layanans.filter((l) => l.id !== id),
        }));
    };

    const handleSimpanPesanan = () => {
        console.log('Saving pesanan:', pesanan);
        alert('Data pesanan disimpan (mock)!');
    };

    return (
        <div className="container mx-auto max-w-2xl px-4 py-8 flex flex-col gap-y-6">
            <button
                className="btn btn-circle btn-sm bg-base-100/90 border border-base-300 shadow text-sky-700 hover:bg-sky-100 transition self-start mb-2"
                onClick={() => navigate('/pesanan')}
                type="button"
                title="Kembali"
            >
                <MdArrowBack size={20} />
            </button>

            <div className="bg-base-100 rounded-xl p-6 shadow-lg border border-base-200 flex flex-col items-center gap-y-6">
                <button
                    onClick={() => setUpdateMode(false)}
                    className="btn btn-ghost btn-sm w-full flex justify-between items-center border border-gray-400"
                >
                    <span>Ubah Cepat</span>
                    {!updateMode ? <MdExpandLess /> : <MdExpandMore />}
                </button>

                {!updateMode && (
                    <div className="flex flex-col gap-y-3 w-full px-4">
                        {/* Status Transaksi Section */}
                        <TransactionStatusSection
                            statusDraft={statusDraft}
                            setStatusDraft={setStatusDraft}
                            currentStatus={pesanan.status}
                            onUpdateStatus={handleUpdateStatus}
                        />

                        {/* Payment Status Section */}
                        <PaymentStatusSection
                            sudahBayarDraft={sudahBayarDraft}
                            setSudahBayarDraft={setSudahBayarDraft}
                            currentPaymentStatus={pesanan.sudah_bayar}
                            onUpdatePaymentStatus={handleUpdateSudahBayar}
                        />

                        {/* QRIS Proof Section */}
                        <QRISProofSection
                            buktiDraft={buktiDraft}
                            fileInputRef={fileInputRef}
                            onQrisChange={handleQrisChange}
                            onUpdateBukti={handleUpdateBukti}
                            onRemoveBukti={() => setBuktiDraft(null)}
                        />
                    </div>
                )}

                {/* Transaction Details Accordion */}
                <TransactionDetailsAccordion
                    showDetail={updateMode}
                    toggleDetail={() => setUpdateMode((s) => !s)}
                    pesanan={pesanan}
                    setPesanan={setPesanan}
                    layananOptions={layananOptions}
                    layananBaru={layananBaru}
                    setLayananBaru={setLayananBaru}
                    onAddLayanan={handleAddLayanan}
                    onDeleteLayanan={handleDeleteLayanan}
                    onSave={handleSimpanPesanan}
                    onCancel={() => navigate('/pesanan')}
                />
            </div>
        </div>
    );
}

// Sub-components
const TransactionStatusSection = ({
    statusDraft,
    setStatusDraft,
    currentStatus,
    onUpdateStatus,
}: {
    statusDraft: string;
    setStatusDraft: (status: string) => void;
    currentStatus: string;
    onUpdateStatus: () => void;
}) => (
    <div className="w-full flex flex-col gap-y-2">
        <span className="font-bold text-lg">Status Transaksi</span>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-x-2">
            <select
                className="select select-bordered w-full sm:w-auto"
                value={statusDraft}
                onChange={(e) => setStatusDraft(e.target.value)}
            >
                {STATUS_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <button
                className="btn btn-xs btn-primary rounded-full sm:ml-2 w-full sm:w-auto"
                onClick={onUpdateStatus}
                type="button"
                disabled={statusDraft === currentStatus}
            >
                Update Status
            </button>
            <StatusBadge status={currentStatus} />
        </div>
    </div>
);

const PaymentStatusSection = ({
    sudahBayarDraft,
    setSudahBayarDraft,
    currentPaymentStatus,
    onUpdatePaymentStatus,
}: {
    sudahBayarDraft: boolean;
    setSudahBayarDraft: (paid: boolean) => void;
    currentPaymentStatus: boolean;
    onUpdatePaymentStatus: () => void;
}) => (
    <div className="w-full flex flex-col gap-y-2 mt-4">
        <span className="font-bold text-lg">Status Pembayaran</span>
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-x-3">
            <div className="flex items-center gap-x-2">
                <input
                    type="checkbox"
                    id="sudahBayarUtama"
                    className="checkbox checkbox-primary"
                    checked={sudahBayarDraft}
                    onChange={(e) => setSudahBayarDraft(e.target.checked)}
                />
                <label
                    htmlFor="sudahBayarUtama"
                    className="font-semibold text-slate-600 cursor-pointer"
                >
                    Sudah Dibayar
                </label>
            </div>
            <button
                className="btn btn-xs btn-primary rounded-full sm:ml-2 w-full sm:w-auto"
                onClick={onUpdatePaymentStatus}
                type="button"
                disabled={sudahBayarDraft === currentPaymentStatus}
            >
                Update Status Pembayaran
            </button>
            <PaymentBadge paid={currentPaymentStatus} />
        </div>
    </div>
);

const QRISProofSection = ({
    buktiDraft,
    fileInputRef,
    onQrisChange,
    onUpdateBukti,
    onRemoveBukti,
}: {
    buktiDraft: string | null;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    onQrisChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onUpdateBukti: () => void;
    onRemoveBukti: () => void;
}) => (
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
                <MdEdit size={14} /> {buktiDraft ? 'Ganti Foto' : 'Upload Foto'}
            </button>
            <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={onQrisChange}
            />
            {buktiDraft && (
                <button
                    type="button"
                    className="btn btn-xs btn-error rounded-full"
                    onClick={onRemoveBukti}
                >
                    Hapus Bukti
                </button>
            )}
            <button
                className="btn btn-xs btn-primary rounded-full"
                onClick={onUpdateBukti}
                type="button"
                disabled={!buktiDraft}
            >
                Update Bukti
            </button>
        </div>
    </div>
);

const TransactionDetailsAccordion = ({
    showDetail,
    toggleDetail,
    pesanan,
    setPesanan,
    layananOptions,
    layananBaru,
    setLayananBaru,
    onAddLayanan,
    onDeleteLayanan,
    onSave,
    onCancel,
}: {
    showDetail: boolean;
    toggleDetail: () => void;
    pesanan: PesananForm;
    setPesanan: (pesanan: PesananForm) => void;
    layananOptions: LayananOption[];
    layananBaru: LayananPesanan;
    setLayananBaru: (layanan: LayananPesanan) => void;
    onAddLayanan: () => void;
    onDeleteLayanan: (id: number) => void;
    onSave: () => void;
    onCancel: () => void;
}) => (
    <div className="w-full">
        <button
            className="btn btn-ghost btn-sm w-full flex justify-between items-center border border-gray-400"
            type="button"
            onClick={toggleDetail}
        >
            <span>Detail Transaksi</span>
            {showDetail ? <MdExpandLess /> : <MdExpandMore />}
        </button>

        {showDetail && (
            <div className="flex flex-col gap-y-3 mt-2 px-4">
                <CustomerInfoSection pesanan={pesanan} setPesanan={setPesanan} />

                <AddServiceSection
                    layananOptions={layananOptions}
                    layananBaru={layananBaru}
                    setLayananBaru={setLayananBaru}
                    onAddLayanan={onAddLayanan}
                />

                <ServiceListSection layanans={pesanan.layanans} onDeleteLayanan={onDeleteLayanan} />

                <ActionButtons onSave={onSave} onCancel={onCancel} />
            </div>
        )}
    </div>
);

const CustomerInfoSection = ({
    pesanan,
    setPesanan,
}: {
    pesanan: PesananForm;
    setPesanan: (pesanan: PesananForm) => void;
}) => (
    <>
        <div className="flex flex-col gap-y-1">
            <label>Nama</label>
            <input
                type="text"
                className="input input-bordered w-full"
                value={pesanan.nama}
                onChange={(e) => setPesanan({ ...pesanan, nama: e.target.value })}
            />
        </div>
        <div className="flex flex-col gap-y-1">
            <label>Whatsapp</label>
            <input
                type="text"
                className="input input-bordered w-full"
                value={pesanan.whatsapp ?? ''}
                onChange={(e) => setPesanan({ ...pesanan, whatsapp: e.target.value })}
            />
        </div>
        <div className="flex flex-col gap-y-1">
            <label>Email</label>
            <input
                type="email"
                className="input input-bordered w-full"
                value={pesanan.email ?? ''}
                onChange={(e) => setPesanan({ ...pesanan, email: e.target.value })}
            />
        </div>
        <div className="flex flex-col gap-y-1">
            <label>Diambil Pada</label>
            <input
                type="datetime-local"
                className="input input-bordered w-full"
                value={pesanan.estimasi_selesai ?? ''}
                onChange={(e) => setPesanan({ ...pesanan, estimasi_selesai: e.target.value })}
            />
        </div>
        <div className="flex items-center gap-x-2">
            <input
                type="checkbox"
                id="sudahBayar"
                className="checkbox checkbox-primary"
                checked={pesanan.sudah_bayar}
                onChange={(e) => setPesanan({ ...pesanan, sudah_bayar: e.target.checked })}
            />
            <label htmlFor="sudahBayar" className="font-semibold text-slate-600 cursor-pointer">
                Sudah Dibayar
            </label>
        </div>
    </>
);

const AddServiceSection = ({
    layananOptions,
    layananBaru,
    setLayananBaru,
    onAddLayanan,
}: {
    layananOptions: LayananOption[];
    layananBaru: LayananPesanan;
    setLayananBaru: (layanan: LayananPesanan) => void;
    onAddLayanan: () => void;
}) => (
    <div className="flex flex-col gap-y-2 mt-2">
        <label>Tambah Layanan</label>
        <div className="flex gap-x-2">
            <select
                className="select w-1/2"
                value={layananBaru.id}
                onChange={(e) => {
                    const selected = layananOptions.find((l) => l.id === Number(e.target.value));
                    if (selected) {
                        setLayananBaru({
                            id: selected.id,
                            nama: selected.nama,
                            satuan: selected.satuan,
                            quantity: layananBaru.quantity,
                        });
                    } else {
                        setLayananBaru(DEFAULT_LAYANAN_BARU);
                    }
                }}
            >
                <option value={0}>Pilih Layanan</option>
                {layananOptions.map((l) => (
                    <option key={l.id} value={l.id}>
                        {l.nama}
                    </option>
                ))}
            </select>
            <input
                className="input w-1/2"
                type="number"
                min={1}
                value={layananBaru.quantity}
                onChange={(e) =>
                    setLayananBaru({
                        ...layananBaru,
                        quantity: Number(e.target.value),
                    })
                }
            />
        </div>
        <button
            type="button"
            className="btn btn-accent btn-sm w-fit self-end mt-1"
            onClick={onAddLayanan}
        >
            Tambah Layanan
        </button>
    </div>
);

const ServiceListSection = ({
    layanans,
    onDeleteLayanan,
}: {
    layanans: LayananPesanan[];
    onDeleteLayanan: (id: number) => void;
}) => (
    <div className="flex flex-col gap-y-3 bg-base-200 rounded-xl shadow-inner w-full p-4 mt-2 border border-base-300">
        <span className="font-bold text-sky-700">Daftar Layanan</span>
        {layanans.length === 0 ? (
            <span className="text-slate-400 text-sm italic">Belum ada layanan ditambahkan.</span>
        ) : (
            layanans.map((l) => (
                <div
                    key={l.id}
                    className="flex justify-between items-center text-sm bg-base-100 rounded-lg px-3 py-2 shadow border border-base-200"
                >
                    <span className="font-medium">{l.nama}</span>
                    <div className="flex items-center gap-x-2">
                        <span className="badge badge-info badge-sm">
                            {l.quantity} {l.satuan}
                        </span>
                        <button
                            type="button"
                            onClick={() => onDeleteLayanan(l.id)}
                            className="btn btn-error btn-xs text-white rounded-full"
                            title="Hapus"
                        >
                            &times;
                        </button>
                    </div>
                </div>
            ))
        )}
    </div>
);

const ActionButtons = ({ onSave, onCancel }: { onSave: () => void; onCancel: () => void }) => (
    <div className="flex gap-x-2 mt-6">
        <button className="btn btn-primary btn-xs rounded-full" onClick={onSave} type="button">
            Simpan
        </button>
        <button className="btn btn-ghost btn-xs rounded-full" onClick={onCancel} type="button">
            Batal
        </button>
    </div>
);
