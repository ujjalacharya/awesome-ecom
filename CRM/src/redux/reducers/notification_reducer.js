import { GET_PROFILE, UPDATE_BANK, GET_BANK_INFO } from "../types";


const initialState = {
    noofUnseen:0,
    admin:null,
    notifications:[]
}

export default function (state = initialState, action) {
    const {type, payload} = action
    switch (type) {
        case GET_PROFILE:
            return {
                ...state,
                profile: payload,
            };
        case GET_BANK_INFO:
        case UPDATE_BANK:
            return {
                ...state,
                bank: payload,
            };

        default:
            return state;
    }
}
