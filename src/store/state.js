import store from "./index.js";
import { DEFAULT_COLOR } from "../utils/constants.js";

const state = {
    token: null,
    boards: [],
    board: {},
    showAddBoard: false,
    bodyColor: DEFAULT_COLOR.body,
    navColor: DEFAULT_COLOR.nav,
};

export default state;
