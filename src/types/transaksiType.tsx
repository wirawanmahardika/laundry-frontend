import type { transaksiLayananType } from "./transaksiLayananType";

export type transaksiType = {
    id: number;
    id_tenant: number;
    id_member: number | null;
    nama: string;
    status: string;
    whatsapp: string;
    total_harga: number;
    email: string;
    sudah_bayar: boolean;
    bukti: string | null;
    is_member: boolean;
    estimasi_selesai: string;
    created_at: string;
    updated_at: string;
    layanans?: transaksiLayananType[];
}

export type transaksiReducerActionType = {
    type: "get-all" | "delete",
    payload: transaksiType[] | number
}