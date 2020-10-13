<template>
    <div id="app">
        <Nav />
        <router-view />
    </div>
</template>

<script>
import Nav from "./components/Nav.vue";

export default {
    components: {
        Nav,
    },
};
</script>

<style>
@import "./assets/css/styles.css";

#app {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100vh;
}
</style>
