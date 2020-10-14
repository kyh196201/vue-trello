<template>
    <li class="card-item" :data-pos="data.pos" :data-card-id="data.id">
        <router-link :to="`/b/${bid}/c/${data.id}`">
            <div class="card-item__title">
                {{ data.title }}
            </div>
            <button class="card-item__close">
                &times;
            </button>
        </router-link>
    </li>
</template>

<script>
export default {
    props: ["data"],
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

<style>
.card-item {
    margin-bottom: 5px;
}

.card-item > a {
    display: block;
    position: relative;
    border-radius: 5px;
    padding: 5px;
    width: 100%;
    background-color: #fff;
    color: rgb(58, 49, 49);
    cursor: pointer;
    transition: all 0.2s ease;
}

.card-item > a:hover {
    background-color: rgba(0, 0, 0, 0.3);
    color: rgb(102, 97, 97);
}

.card-item:last-of-type {
    margin-bottom: 0px;
}

.card-item__title {
    display: flex;
    align-items: center;
    flex-grow: 1;
    font-weight: bold;
}

.card-item__close {
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);
    background: none;
    font-weight: bold;
    font-size: 1.25rem;
}
</style>
