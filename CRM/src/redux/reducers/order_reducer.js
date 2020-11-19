import { GET_ORDERS, GET_ORDER, MULTI_ORDER_LOADING,SINGLE_ORDER_LOADING, TOGGLE_ORDER_APPROVAL, TOGGLE_TOBERETURN_ORDER, CANCEL_ORDER } from "../types";


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
        case CANCEL_ORDER:
        case GET_ORDER:
            return {
                ...state,
                order: payload,
                singleLoading: false
            };
        case TOGGLE_TOBERETURN_ORDER:
        case TOGGLE_ORDER_APPROVAL:
            return {
                ...state,
                order: payload,
                orders: state.orders.map(o=>{
                    if (o._id === payload._id) {
                        o.status = payload.status
                    }
                    return o
                })

            };
        case MULTI_ORDER_LOADING:
            return {
            ...state,
            multiLoading: true
        }
        case SINGLE_ORDER_LOADING:
            return {
                ...state,
                singleLoading: true
            }
        default:
            return state;
    }
}
