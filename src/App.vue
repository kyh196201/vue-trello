<template>
    <div id="app">
        <Nav />
        <div class="app-content">
            <router-view />
        </div>
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

.app-content {
    display: flex;
    overflow: hidden;
    flex-direction: column;
    padding: 10px;
    flex: 1 1 auto;
    width: 100%;
}
</style>
