import { ADMINS_TYPES, ADMIN_TYPES} from "../types";


const initialState = {
    admin : null,
    admins: [],
    multiAdminLoading: true,
    singleAdminLoading: true,
    totalCount: 0
}

export default function (state = initialState, action) {
    const {type, payload} = action
    switch (type) {
        case ADMINS_TYPES.GET_ADMINS:
            return {
                ...state,
                admins: payload.admins,
                totalCount:payload.totalCount
            };
        case ADMIN_TYPES.GET_ADMIN:
            return {
                ...state,
                admin: payload,
                singleAdminLoading: false
            };
        case ADMINS_TYPES.GET_ADMINS_INIT:
            return {
            ...state,
            multiAdminLoading: true,
            // admins:[],
            // totalCount:0
        }
        case ADMINS_TYPES.GET_ADMINS_FINISH:
            return {
            ...state,
            multiAdminLoading: false
        }
        case ADMIN_TYPES.GET_ADMIN_FINISH:
            return {
            ...state,
            singleAdminLoading: false
        }
        case ADMIN_TYPES.GET_ADMIN_INIT:
            return {
                ...state,
                singleAdminLoading: true,
                admin: null
            }
        default:
            return state;
    }
}
