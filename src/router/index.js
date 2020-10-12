import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Login from "../views/Login.vue";

import store from "../store/";

Vue.use(VueRouter);

const requireAuth = (to, from, next) => {
    const isLogin = store.getters.isAuth;

    const redirectPath = `/login?rPath=${encodeURIComponent(to.path)}`;

    isLogin ? next() : next(redirectPath);
};

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
        beforeEnter: requireAuth,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
