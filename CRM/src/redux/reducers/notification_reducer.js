import { GET_NOTIFICATIONS } from "../types";


const initialState = {
    noofUnseen:null,
    admin:null,
    notifications:[]
}

export default function (state = initialState, action) {
    const {type, payload} = action
    switch (type) {
        case GET_NOTIFICATIONS:
            return {
                ...state,
                notifications: payload.notifications,
                admin: payload.admin,
                noOfUnseen: payload.noOfUnseen
            };
        default:
            return state;
    }
}
