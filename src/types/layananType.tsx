export type layananType = {
    id: number,
    id_tenant: number,
    nama: string,
    satuan: string,
    harga: number,
    created_at: string,
    updated_at: string,
}

export type layananReducerStateType = layananType[]
export type layananReducerActionType = {
    type: "get-all" | "delete",
    payload: layananType[] | layananType | number
}
