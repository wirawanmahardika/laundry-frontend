import type { memberReducerActionType, memberType } from "../../types/memberType";

export default function memberReducer(state: memberType[], action: memberReducerActionType) {
    switch (action.type) {
        case "get-all":
            return action.payload as memberType[]
        case "delete":
            return state.filter(s =>s.id !== action.payload as number)
        default:
            return state
    }
}