import { useEffect, useState } from 'react';
import { MdArrowBack, MdExpandLess, MdExpandMore } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosAuth } from '../../utils/axios';
import type { transaksiType } from '../../types/transaksiType';
import {
    BuktiPembayaranQRIS,
    UpdatePaymentStatus,
    UpdateStatusTransaksi,
} from '../../components/pesanan/EditPesananComp';

export default function EditPesanan() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [isQuickMode, setIsQuickMode] = useState(true);
    const [dataPesanan, setDataPesanan] = useState<transaksiType | null>(null);

    // Data fetching
    useEffect(() => {
        // const fetchLayananOptions = async () => {
        //     try {
        //         const res = await AxiosAuth.get('/layanans');
        //         console.log(res.data);
        //     } catch (error) {
        //         console.error('Failed to fetch layanan options:', error);
        //     }
        // };

        const fetchPesananData = async () => {
            try {
                const res = await AxiosAuth.get(`/transaksi/${id}`);
                setDataPesanan(res.data.data);
            } catch (error) {
                console.error('Failed to fetch pesanan data:', error);
            }
        };

        // fetchLayananOptions();
        fetchPesananData();
    }, []);

    console.log(dataPesanan);

    if (!id) return navigate(-1);
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

            <div className="bg-base-100 rounded-xl p-6 shadow-lg border border-base-200 flex flex-col items-center gap-y-2">
                <button
                    onClick={() => setIsQuickMode((p) => !p)}
                    className={`btn btn-outline w-full justify-between flex ${
                        isQuickMode && 'btn-primary'
                    }`}
                >
                    <span>Ubah Cepat</span>
                    {!isQuickMode ? <MdExpandLess /> : <MdExpandMore />}
                </button>
                {isQuickMode && dataPesanan && (
                    <>
                        <UpdateStatusTransaksi id={id} prevStatus={dataPesanan.status} />
                        <UpdatePaymentStatus id={id} sudahBayar={dataPesanan.sudah_bayar} />
                        <BuktiPembayaranQRIS id={id} bukti={dataPesanan.bukti} />
                    </>
                )}
            </div>
        </div>
    );
}
