<template>
    <div class="board">
        board {{ bid }}
        <router-link to="/b/1/c/1">1</router-link>
        <router-link to="/b/1/c/2">2</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {
            bid: "",
        };
    },
    created() {
        this.bid = this.$route.params.bid;
    },
};
</script>

<style></style>
