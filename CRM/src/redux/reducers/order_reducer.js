import { GET_ORDERS, GET_ORDER } from "../types";


const initialState = {
    order : null,
    orders: [],
    multiLoading: true,
    singleLoading: true,
    totalCount: 0
}

export default function (state = initialState, action) {
    const {type, payload} = action
    switch (type) {
        case GET_ORDERS:
            return {
                ...state,
                orders: payload.orders,
                multiLoading: false,
                totalCount:payload.totalCount
            };
        case GET_ORDER:
            return {
                ...state,
                order: payload,
                singleLoading: false
            };

        default:
            return state;
    }
}
