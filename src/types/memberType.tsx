export type memberType = {
    id: number;
    id_tenant: number;
    nama: string;
    email?: string;
    whatsapp?: string;
    poin?: number;
    diskon: number;
    created_at: Date;
    updated_at: Date;
    avgOrder?: number;
    orders?: any[]
}

export type memberReducerActionType = {
    type: "get-all" | "delete",
    payload: memberType[] | memberType | number
}