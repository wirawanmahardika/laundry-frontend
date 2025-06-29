import type { layananType } from "./layananType";

export type transaksiLayananType = {
    id: number;
    id_transaksi: number;
    id_layanan: number;
    quantity: number;
    harga: number;
    layanan?: layananType;
}