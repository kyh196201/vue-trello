import { setAuthInHeader } from "../api/";
import { DEFAULT_COLOR } from "../utils/constants.js";

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
    SET_BOARD(state, board) {
        state.board = board;
    },
    SET_BG_COLOR(state, color) {
        state.bodyColor = color ? color : DEFAULT_COLOR.body;
        state.navColor = color ? "rgba(0, 0, 0, 0.15)" : DEFAULT_COLOR.nav;
    },
};

export default mutations;
