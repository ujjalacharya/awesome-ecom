import { GET_NOTIFICATIONS, READ_NOTIFICATION } from "../types";


const initialState = {
    noOfUnseen:0,
    admin:null,
    notifications:[]
}

export default function (state = initialState, action) {
    const {type, payload} = action
    switch (type) {
        case READ_NOTIFICATION:
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
