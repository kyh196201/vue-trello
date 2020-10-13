import axios from "axios";
import router from "../router/";

const DOMAIN = "http://localhost:3000";
const UNAUTHROZIED = 401;
const onUnauthorized = () => {
    // const urlParams = new URLSearchParams(window.location.search);
    // const rPath = urlParams.get("rPath") || location.pathname;

    // const pathName = location.pathname.split("/")[1];

    // console.log(pathName);

    // if (pathName !== "login") {
    //     console.log(123);
    //     router.push(`/login?rPath=${encodeURIComponent(location.pathname)}`);
    // }
    router.push(`/login?rPath=${encodeURIComponent("/")}`);
};

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

const setAuthInHeader = (token) => {
    axios.defaults.headers.common["Authorization"] = token
        ? `Bearer ${token}`
        : null;
};

const auth = {
    login(email, password) {
        return request("post", "/login", { email, password });
    },
};

const boards = {
    fetch() {
        return request("get", "/boards");
    },
};

export { auth, setAuthInHeader, boards };
