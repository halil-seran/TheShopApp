import { Switch } from "react-native-gesture-handler";
import { AUTHENTICATE, LOGOUT } from "../actions/auth";

const initialState = {
    token: null,
    userId: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                token: action.token,
                userId: action.userId
            };
        case LOGOUT:
            return initialState;

        //case SIGNUP:          
        //    return {                              yukardaki de login di değiştirdim
        //        token: action.token,                   
        //        userId: action.userId
        //    };
        default:
            return state;
    }
};