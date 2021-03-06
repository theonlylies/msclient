import {LOGIN_STATUS} from "../actions/loginActions";

const initialStore = {
        status: false,
        login: ""
};

export default function user(state = initialStore, action) {
    switch (action.type) {
        case LOGIN_STATUS:
            return {
                ...state,
                ...action
            };
        case "USER_LOGOUT":
            return initialStore;
        default:
            return state;
    }
}