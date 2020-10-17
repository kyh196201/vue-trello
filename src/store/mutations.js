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

    SET_IS_ADD_BOARD(state, toggle) {
        state.showAddBoard = toggle;
    },

    SET_BOARDS(state, boards) {
        state.boards = boards;
    },
};

export default mutations;
