import { ORDERS_TYPES, ORDER_TYPES, TOGGLE_ORDER_APPROVAL_TYPES, TOGGLE_TOBERETURN_ORDER_TYPES, CANCEL_ORDER_TYPES} from "../types";


const initialState = {
    order : null,
    orders: [],
    multiLoading: true,
    singleLoading: true,
    orderStatusLoading: false,
    cancelOrderLoading: false,
    totalCount: 0
}

export default function (state = initialState, action) {
    const {type, payload} = action
    switch (type) {
        case ORDERS_TYPES.GET_ORDERS:
            return {
                ...state,
                orders: payload.orders,
                totalCount:payload.totalCount
            };
        case ORDER_TYPES.GET_ORDER:
            return {
                ...state,
                order: payload,
                singleLoading: false
            };
        case CANCEL_ORDER_TYPES.CANCEL_ORDER:
        case TOGGLE_TOBERETURN_ORDER_TYPES.TOGGLE_TOBERETURN_ORDER:
        case TOGGLE_ORDER_APPROVAL_TYPES.TOGGLE_ORDER_APPROVAL:
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
        case ORDERS_TYPES.GET_ORDERS_INIT:
            return {
            ...state,
            multiLoading: true,
            // orders:[],
            // totalCount:0
        }
        case ORDERS_TYPES.GET_ORDERS_FINISH:
            return {
            ...state,
            multiLoading: false
        }
        case ORDER_TYPES.GET_ORDER_FINISH:
            return {
            ...state,
            singleLoading: false
        }
        case ORDER_TYPES.GET_ORDER_INIT:
            return {
                ...state,
                singleLoading: true,
                order: null
            }
        case CANCEL_ORDER_TYPES.CANCEL_ORDER_INIT: 
            return {
                ...state,
                cancelOrderLoading: true
            }
        case CANCEL_ORDER_TYPES.CANCEL_ORDER_FINISH: 
            return {
                ...state,
                cancelOrderLoading: false
            }
        case TOGGLE_ORDER_APPROVAL_TYPES.TOGGLE_ORDER_APPROVAL_INIT: 
        case TOGGLE_TOBERETURN_ORDER_TYPES.TOGGLE_TOBERETURN_ORDER_INIT: 
        return {
            ...state,
            orderStatusLoading: true
        }
        case TOGGLE_TOBERETURN_ORDER_TYPES.TOGGLE_TOBERETURN_ORDER_FINISH: 
        case TOGGLE_ORDER_APPROVAL_TYPES.TOGGLE_ORDER_APPROVAL_FINISH: 
        return {
            ...state,
            orderStatusLoading: false
        }
        default:
            return state;
    }
}
