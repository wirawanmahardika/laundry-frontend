import type { transaksiReducerActionType, transaksiType } from "../../types/transaksiType";

export default function transaksiReducer(state: transaksiType[], action: transaksiReducerActionType) {
    switch (action.type) {
        case "get-all":
            return action.payload as transaksiType[]
        case "delete":
            return state.filter(s => s.id !== action.payload as number)
        default:
            return state
    }
}