<template>
    <div id="login" class="login">
        <b-form @submit.prevent="onLogin">
            <b-form-group label="Email address:" label-for="loginEmail">
                <b-form-input
                    id="loginEmail"
                    v-model="loginEmail"
                    type="email"
                    required
                    placeholder="test@test.com"
                    ref="loginEmail"
                ></b-form-input>
            </b-form-group>
            <b-form-group label="Password:" label-for="loginPw">
                <b-form-input
                    id="loginPw"
                    v-model="loginPw"
                    type="password"
                    required
                    placeholder="123123"
                ></b-form-input>
            </b-form-group>
            <b-button type="submit" :disabled="!isValid">Login</b-button>
        </b-form>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    data() {
        return {
            loginEmail: "",
            loginPw: "",
            rPath: "",
        };
    },
    computed: {
        isValid() {
            return this.loginEmail.length && this.loginPw.length;
        },
    },
    created() {
        this.rPath = this.$route.query.rPath || "/";
    },
    mounted() {
        this.$refs.loginEmail.focus();
    },
    methods: {
        ...mapActions(["LOGIN"]),
        onLogin() {
            this.loginEmail = this.loginEmail.trim();
            this.loginPw = this.loginPw.trim();

            if (!this.loginPw || !this.loginEmail) return;

            this.LOGIN({
                email: this.loginEmail,
                password: this.loginPw,
            })
                .then((token) => {
                    if (token) {
                        this.$router.push(this.rPath);
                    }
                })
                .catch((err) => {
                    const _error = err.data.error;
                    this.onLoginFailed();
                });
        },
        onLoginFailed() {
            alert("아이디와 비밀번호를 확인해주세요!");
            this.loginPw = "";
            this.$refs.loginEmail.focus();
        },
    },
};
</script>

<style>
.login {
    padding: 1.5rem 0;
    margin: 0 auto;
    width: 50%;
    max-width: 600px;
}
</style>
