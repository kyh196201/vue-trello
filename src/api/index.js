import axios from "axios";
import router from "../router/";

const DOMAIN = "http://localhost:3000";
const UNAUTHROZIED = 401;
const NOTFOUND = 404;
const onUnauthorized = () => {
    router.push(`/login?rPath=${encodeURIComponent("/")}`);
};

const noNotFound = () => {
    alert("존재하지 않는 보드입니다.");
    router.push("/");
};

// Axios warpping
const request = (method, url, data) => {
    return axios({
        method,
        url: DOMAIN + url,
        data,
    })
        .then((result) => result.data)
        .catch((result) => {
            const { status } = result.response;

            if (status === UNAUTHROZIED) {
                onUnauthorized();
            } else if (status === NOTFOUND) {
                noNotFound();
            }
            throw result.response;
        });
};

// Axios에 Beaerer토큰 설정
export const setAuthInHeader = (token) => {
    axios.defaults.headers.common["Authorization"] = token
        ? `Bearer ${token}`
        : null;
};

export const auth = {
    login(email, password) {
        return request("post", "/login", { email, password });
    },
};

export const boards = {
    fetch() {
        return request("get", "/boards");
    },
};

export const board = {
    fetch(id) {
        return request("get", `/boards/${id}`);
    },
    create(title) {
        return request("post", "/boards", { title });
    },
    destroy(id) {
        return request("delete", `/boards/${id}`);
    },
    update({ id, payload }) {
        return request("put", `/boards/${id}`, payload);
    },
};

export const card = {
    /**
     *
     * @param {*} payload object => title : string, listId : number, pos : number(optional)
     */
    create(payload) {
        return request("post", "/cards", payload);
    },
    fetch(id) {
        return request("get", `/cards/${id}`);
    },
    update({ id, payload }) {
        return request("put", `/cards/${id}`, payload);
    },
    destroy(id) {
        return request("delete", `/cards/${id}`);
    },
};

export const list = {
    create(payload) {
        return request("post", "/lists", payload);
    },
    update({ id, payload }) {
        return request("put", `/lists/${id}`, payload);
    },
};
