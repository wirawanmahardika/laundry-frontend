export type memberType = {
    id: number;
    id_tenant: number;
    nama: string;
    email?: string;
    whatsapp?: string;
    created_at: Date;
    updated_at: Date;
    avgOrder?: number;
    orders?: any[]
}

export type memberReducerActionType = {
    type: "get-all" | "delete",
    payload: memberType[] | memberType | number
}