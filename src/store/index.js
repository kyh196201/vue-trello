import Vue from "vue";
import Vuex from "vuex";
import state from "./state.js";
import getters from "./getters.js";
import actions from "./actions.js";
import mutations from "./mutations.js";

Vue.use(Vuex);

const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
});

if (sessionStorage.getItem("token")) {
    const token = JSON.parse(sessionStorage.getItem("token"));
    store.commit("LOGIN", token);
}

export default store;
