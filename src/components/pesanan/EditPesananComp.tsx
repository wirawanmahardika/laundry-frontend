import { useRef, useState } from 'react';
import type { transaksiType } from '../../types/transaksiType';
import Swal from 'sweetalert2';
import { AxiosAuth } from '../../utils/axios';
import { MdEdit } from 'react-icons/md';

// status transaksi
const StatusBadge = ({ status }: { status: any }) => {
    const statusText = status.charAt(0).toUpperCase() + status.slice(1);
    const badgeClass =
        status === 'selesai' ? 'btn-success' : status === 'proses' ? 'btn-warning' : 'btn-info';

    return (
        <span className={`btn ${badgeClass} btn-xs rounded-full text-center`}>{statusText}</span>
    );
};

export const UpdateStatusTransaksi = ({
    id,
    prevStatus,
}: {
    id: string;
    prevStatus: transaksiType['status'];
}) => {
    const [status, setStatus] = useState<'menunggu' | 'proses' | 'selesai' | ''>('');
    const [displayStatus, setDisplayStatus] = useState<'menunggu' | 'proses' | 'selesai'>(
        prevStatus
    );

    const updateStatus = async () => {
        if (!status) return Swal.fire({ icon: 'error', text: 'Pilih status terlebih dahulu' });
        try {
            const res = await AxiosAuth.patch(`/transaksi/${id}/status`, { status });
            Swal.fire({ title: 'Sukses', icon: 'success', text: res.data.message });
            setDisplayStatus(status);
        } catch (error: any) {
            Swal.fire({
                title: 'Error',
                icon: 'error',
                text: error.response?.data.message ?? 'Terjadi kesalahan',
            });
        }
    };

    return (
        <div className="w-full flex flex-col gap-y-2">
            <span className="font-semibold text-sm">Status Transaksi</span>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-x-2">
                <select
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="select select-sm select-bordered w-full sm:w-auto"
                    defaultValue={displayStatus}
                >
                    <option value={''}>-- Pilih --</option>
                    <option value={'menunggu'}>menunggu</option>
                    <option value={'proses'}>proses</option>
                    <option value={'selesai'}>selesai</option>
                </select>

                <div className="flex justify-evenly gap-x-3">
                    <button
                        onClick={updateStatus}
                        className="btn btn-xs btn-primary rounded-full sm:ml-2 sm:w-auto"
                        type="button"
                    >
                        Update Status
                    </button>
                    <StatusBadge status={displayStatus} />
                </div>
            </div>
        </div>
    );
};

// payment status
const PaymentBadge = ({ paid }: { paid: boolean }) => (
    <span className={`btn ${paid ? 'btn-success' : 'btn-warning'} btn-xs rounded-full text-center`}>
        {paid ? 'Sudah Dibayar' : 'Belum Dibayar'}
    </span>
);

export const UpdatePaymentStatus = ({ id, sudahBayar }: { id: string; sudahBayar: boolean }) => {
    const [statusPembayaran, setStatusPembayaran] = useState(sudahBayar);
    const [displayStatusPembayaran, setDisplayStatusPembayaran] = useState(sudahBayar);

    const updateStatusPembayaran = async () => {
        try {
            const res = await AxiosAuth.patch(`/transaksi/${id}/payment`, {
                sudah_bayar: statusPembayaran,
            });
            Swal.fire({ icon: 'success', text: res.data.message });
            setDisplayStatusPembayaran(statusPembayaran);
        } catch (error: any) {
            console.log(error);
            Swal.fire({ icon: 'error', text: error.response?.data.message ?? 'Terjadi kesalahan' });
        }
    };

    return (
        <div className="w-full flex flex-col gap-y-2 mt-4">
            <span className="font-bold text-sm">Status Pembayaran</span>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-x-3">
                <div className="flex items-center gap-x-2">
                    <input
                        type="checkbox"
                        id="sudahBayarUtama"
                        className={`checkbox ${
                            statusPembayaran ? 'checkbox-primary' : 'checkbox-error'
                        }`}
                        checked={statusPembayaran}
                        onChange={(e) => setStatusPembayaran(e.target.checked)}
                    />
                    <label
                        htmlFor="sudahBayarUtama"
                        className="font-semibold text-sm text-slate-600 cursor-pointer"
                    >
                        Sudah Dibayar
                    </label>
                </div>
                <button
                    className="btn btn-xs btn-primary rounded-full sm:ml-2 w-full sm:w-auto"
                    type="button"
                    onClick={updateStatusPembayaran}
                >
                    Update Status Pembayaran
                </button>
                <PaymentBadge paid={displayStatusPembayaran} />
            </div>
        </div>
    );
};

// bukti pembayaran qris
export const BuktiPembayaranQRIS = ({ id, bukti }: { id: string; bukti: string | null }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [buktiExistence, setBuktiExistence] = useState(!!bukti);
    const [currentBuktiImage, setCurrentBuktiImage] = useState<string>(bukti || '');

    const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;
        if (currentBuktiImage) URL.revokeObjectURL(currentBuktiImage);
        const url = URL.createObjectURL(e.target.files[0]);
        setCurrentBuktiImage(url);
    };

    const hapusBukti = async () => {
        try {
            const res = await AxiosAuth.delete(`/transaksi/${id}/payment/bukti`);
            Swal.fire({ icon: 'success', text: res.data.message });
            setBuktiExistence(false);
            if (fileInputRef.current) fileInputRef.current.value = '';

            URL.revokeObjectURL(currentBuktiImage);
            setCurrentBuktiImage('');
        } catch (error: any) {
            Swal.fire({ icon: 'error', text: error.response?.data.message ?? 'Terjadi kesalahan' });
        }
    };

    const updateBukti = async () => {
        const image = fileInputRef.current?.files?.[0];
        if (!image) return Swal.fire({ icon: 'error', text: 'Upload bukti terlebih dahulu' });

        const formData = new FormData();
        formData.append('bukti', image);
        try {
            const res = await AxiosAuth.patch(`/transaksi/${id}/bukti`, formData);
            Swal.fire({ icon: 'success', text: res.data.message });
            setBuktiExistence(true);
        } catch (error: any) {
            console.log(error);
            Swal.fire({ icon: 'error', text: error.response?.data.message ?? 'Terjadi kesalahan' });
        }
    };

    return (
        <div className="w-full flex flex-col gap-y-2 mt-4">
            <span className="font-bold text-sm">Bukti Pembayaran QRIS</span>
            <div className="flex flex-wrap items-center gap-2">
                {currentBuktiImage && (
                    <img
                        src={currentBuktiImage}
                        alt="Bukti QRIS"
                        className="w-24 h-24 object-cover rounded-lg border border-sky-200 shadow"
                    />
                )}
                <button
                    type="button"
                    className="btn btn-xs btn-info rounded-full flex items-center gap-x-1"
                    onClick={() => fileInputRef.current?.click()}
                >
                    <MdEdit size={14} /> {buktiExistence ? 'Ganti Foto' : 'Upload Foto'}
                </button>

                <input
                    ref={fileInputRef}
                    onChange={handleImageInput}
                    type="file"
                    accept="image/*"
                    className="hidden"
                />
                {buktiExistence && (
                    <button
                        onClick={hapusBukti}
                        type="button"
                        className="btn btn-xs btn-error rounded-full"
                    >
                        Hapus Bukti
                    </button>
                )}
                <button
                    className="btn btn-xs btn-primary rounded-full"
                    type="button"
                    disabled={!fileInputRef.current?.files?.[0]}
                    onClick={updateBukti}
                >
                    Update Bukti
                </button>
            </div>
        </div>
    );
};
