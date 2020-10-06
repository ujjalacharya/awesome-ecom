import {SAVE_SOCKET_USER } from "../types";


const initialState = {}

export default function (state = initialState, action) {
    const { type, payload } = action
    switch (type) {
        case SAVE_SOCKET_USER:
            return payload;

        default:
            return state;
    }
}
