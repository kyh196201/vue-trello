<template>
    <nav id="nav-bar" class="nav-bar clearFix">
        <router-link to="/" class="home-btn">Home</router-link>
        <a href="" class="logout-btn" v-if="isAuth" @click.prevent="onLogout">
            Logout
        </a>
        <router-link to="/login" class="login-btn" v-else>Login</router-link>
    </nav>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
    computed: {
        ...mapGetters(["isAuth"]),
    },
    methods: {
        ...mapMutations(["LOGOUT"]),
        onLogout() {
            this.LOGOUT();
            this.$router.push("/login");
        },
    },
};
</script>

<style>
#nav-bar {
    position: relative;
    padding: 0.25rem;
    background-color: #026aa7;
    text-align: center;
}

.nav-bar .home-btn,
.nav-bar .login-btn,
.nav-bar .logout-btn {
    font-weight: bold;
}

.nav-bar .home-btn {
    color: rgba(255, 255, 255, 0.25);
    font-size: 1.5rem;
}

.nav-bar .home-btn:hover,
.nav-bar .home-btn:focus {
    color: var(--white);
}

.nav-bar .login-btn,
.nav-bar .logout-btn {
    float: right;
    padding: 5px;
    color: var(--white);
    background-color: rgba(255, 255, 255, 0.4);
    font-size: 1.25rem;
    border-radius: 5px;
    transition: background-color 0.3s;
}

.nav-bar .login-btn:hover,
.nav-bar .login-btn:focus,
.nav-bar .logout-btn:hover,
.nav-bar .logout-btn:focus {
    background-color: rgba(255, 255, 255, 0.2);
}
</style>
