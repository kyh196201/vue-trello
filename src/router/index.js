import Vue from "vue";
import VueRouter from "vue-router";

import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Board from "../views/Board.vue";
import Card from "../views/Card.vue";
import NotFound from "../components/NotFound.vue";

import store from "../store/";
import { setAuthInHeader } from "../api/";

Vue.use(VueRouter);

const requireAuth = (to, from, next) => {
    const isLogin = store.getters.isAuth;

    const redirectPath = `/login?rPath=${encodeURIComponent(to.path)}`;

    if (isLogin) {
        next();
    } else {
        next(redirectPath);
    }
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
    {
        path: "/b/:bid",
        name: "Board",
        component: Board,
        children: [
            {
                path: "c/:cid",
                name: "Card",
                component: Card,
            },
        ],
        beforeEnter: requireAuth,
    },
    {
        path: "*",
        name: "NotFound",
        component: NotFound,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
