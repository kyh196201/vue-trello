import { setAuthInHeader } from "../api/";

const mutations = {
    LOGIN(state, token) {
        state.token = token;
        setAuthInHeader(token);
        sessionStorage.setItem("token", JSON.stringify(token));
    },
    LOGOUT(state) {
        state.token = null;
        setAuthInHeader(null);
        delete sessionStorage.token;
    },
};

export default mutations;
