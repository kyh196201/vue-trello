import * as api from "../api/";

const actions = {
    LOGIN({ commit }, { email, password }) {
        return api.auth.login(email, password).then((data) => {
            const { accessToken } = data;
            commit("LOGIN", accessToken);
            return accessToken;
        });
    },
};

export default actions;
