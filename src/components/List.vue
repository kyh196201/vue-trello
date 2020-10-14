<template>
    <article class="list-item" :data-list-id="data.id" :data-pos="data.pos">
        <div class="list-item__header">
            <span class="list-item__title">
                {{ data.title }}
            </span>
        </div>
        <ul class="list-item__cardList">
            <card-item
                v-for="card in data.cards"
                :data="card"
                :key="card.pos"
            />
        </ul>
        <footer class="addCard-container">
            <div class="addCard" v-if="isAddCard"></div>
            <span v-else @click="isAddCard = true">&plus; Add a card..</span>
        </footer>
    </article>
</template>

<script>
import CardItem from "./CardItem.vue";

export default {
    props: ["data"],
    components: {
        "card-item": CardItem,
    },
    data() {
        return {
            isAddCard: false,
        };
    },
};
</script>

<style>
.list-item {
    padding: 5px;
    width: 100%;
    background-color: #e2e4e6;
    border-radius: 5px;
}

.list-item__header {
    padding: 5px;
    font-weight: bold;
}

.list-item__cardList {
    padding: 5px 0;
    margin: 0;
}
</style>
