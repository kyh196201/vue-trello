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
export default {
    data() {
        return {
            loginEmail: "",
            loginPw: "",
        };
    },
    computed: {
        isValid() {
            return this.loginEmail.length && this.loginPw.length;
        },
    },
    methods: {
        onLogin() {
            console.log(this.loginEmail, this.loginPw);
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
