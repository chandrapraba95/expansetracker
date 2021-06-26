import { userConstants } from "./ActionTypes";


const initialState = {
   balance_amount : 550,
   trans_amount : 0,
   transaction : []
};

export function rootReducer(state = initialState, action) {
    switch (action.type) {
        case userConstants.INPUT_REQUEST:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state
    }
}