import type { layananReducerActionType, layananReducerStateType, layananType } from "../../types/layananType";

export default function layananReducer(state: layananReducerStateType, action: layananReducerActionType) {
    switch (action.type) {
        case "get-all":
            return action.payload as layananType[]
        case "delete":
            return state.filter(s => s.id !== action.payload as number)
        default:
            return state
    }
}