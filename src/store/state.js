const state = {
    token: "",
};

const TOKEN = sessionStorage.getItem("token");
state.token = TOKEN;

export default state;
