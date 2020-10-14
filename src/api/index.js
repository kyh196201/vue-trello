import axios from "axios";
import router from "../router/";

const DOMAIN = "http://localhost:3000";
const UNAUTHROZIED = 401;
const onUnauthorized = () => {
    router.push(`/login?rPath=${encodeURIComponent("/")}`);
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
            if (status === UNAUTHROZIED) onUnauthorized();
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
};
