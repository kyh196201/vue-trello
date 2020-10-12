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
</style>
