<template>
    <div class="card-item" :data-card-id="data.id" :data-card-pos="data.pos">
        <router-link :to="`/b/${bid}/c/${data.id}`">
            <div class="card-item__header">
                <span class="card-item__title">{{ data.title }}</span>
                <span class="card-item__detail" v-if="data.description">
                    &equiv;
                </span>
            </div>
            <button class="card-item__close" @click.prevent.stop="deleteCard">
                &times;
            </button>
        </router-link>
    </div>
</template>

<script>
import { mapActions } from "vuex";

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
    methods: {
        ...mapActions(["DELETE_CARD"]),
        deleteCard() {
            const { id, title } = this.data;

            if (!window.confirm(`${title} 카드를 삭제하시겠습니까??`)) return;

            return this.DELETE_CARD({ id }).catch((err) => console.error(err));
        },
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
    padding: 2.5px 5px;
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

.card-item__header {
    display: flex;
    align-items: center;
    flex-grow: 1;
    font-weight: bold;
}

.card-item__title {
    margin-right: 10px;
}

.card-item__detail {
    line-height: 24px;
}

.card-item__close {
    position: absolute;
    top: 50%;
    padding: 0 10px;
    right: 5px;
    transform: translateY(-50%);
    background: none;
    font-weight: bold;
    font-size: 1.25rem;
    line-height: 100%;
    z-index: 10;
    outline: none !important;
}

.card-item__close:focus {
    color: #f08c00;
}
</style>
