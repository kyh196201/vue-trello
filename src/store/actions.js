import * as api from "../api/";

const actions = {
    LOGIN({ commit }, { email, password }) {
        return api.auth.login(email, password).then((data) => {
            const { accessToken } = data;
            commit("LOGIN", accessToken);
            return accessToken;
        });
    },
    // Get Board List
    FETCH_BOARDS({ commit }) {
        return api.boards
            .fetch()
            .then((data) => commit("SET_BOARDS", data.list));
    },
    // Create Board
    CREATE_BOARD({ dispatch }, { title }) {
        return api.board
            .create(title)
            .then(({ item }) => {
                dispatch("FETCH_BOARDS");
                return item;
            })
            .catch((err) => Promise.reject(err));
    },
    //Fetch Board
    FETCH_BOARD({ commit }, { id }) {
        return api.board
            .fetch(id)
            .then((data) => commit("SET_BOARD", data.item))
            .catch((err) => Promise.reject(err));
    },
    // Delete Board
    DELETE_BOARD({ dispatch }, { id }) {
        return api.board
            .destroy(id)
            .then(() => dispatch("FETCH_BOARDS"))
            .catch((err) => Promise.reject(err));
    },
    //Create Card
    CREATE_CARD({ dispatch, state }, { title, listId, pos }) {
        return api.card
            .create({ title, listId, pos })
            .then(() => {
                dispatch("FETCH_BOARD", { id: state.board.id });
            })
            .catch((err) => Promise.reject(err));
    },
    // Get Card
    FETCH_CARD(ctx, { id }) {
        return api.card
            .fetch(id)
            .then((data) => data.item)
            .catch((err) => Promise.reject(err));
    },
    UPDATE_CARD({ dispatch, state }, { id, title, description, listId, pos }) {
        const payload = {
            title,
            description,
            listId,
            pos,
        };
        return api.card
            .update({ id, payload })
            .then(() => {
                dispatch("FETCH_BOARD", { id: state.board.id });
            })
            .catch((err) => Promise.reject(err));
    },
    DELETE_CARD({ dispatch, state }, { id }) {
        return api.card
            .destroy(id)
            .then(() => {
                dispatch("FETCH_BOARD", { id: state.board.id });
            })
            .catch((err) => Promise.reject(err));
    },
};

export default actions;
