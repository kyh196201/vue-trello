<template>
    <div class="card-item">Card : {{ cid }}</div>
</template>

<script>
export default {
    data() {
        return {
            cid: "",
        };
    },
    created() {
        this.cid = this.$route.params.cid;
    },
    watch: {
        $route(to, from) {
            this.cid = to.params.cid;
        },
    },
};
</script>

<style></style>
