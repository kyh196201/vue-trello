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
            <add-card
                v-if="isAddCard"
                @close="isAddCard = false"
                :list-id="data.id"
            ></add-card>
            <a v-else class="addCard__toggle" @click="isAddCard = true">
                &plus; Add a card..
            </a>
        </footer>
    </article>
</template>

<script>
import CardItem from "./CardItem.vue";
import AddCard from "./AddCard.vue";

export default {
    props: ["data"],
    components: {
        "card-item": CardItem,
        "add-card": AddCard,
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
    width: 100%;
    background-color: #e2e4e6;
    border-radius: 5px;
}

.list-item__header {
    padding: 10px;
    font-weight: bold;
}

.list-item__cardList {
    padding: 5px 10px;
    margin: 0;
}

.addCard__toggle {
    display: block;
    padding: 10px;
    color: gray;
    font-weight: bold;
    cursor: pointer;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
}

.addCard__toggle:hover {
    background-color: rgba(0, 0, 0, 0.25);
    /* color: gray; */
}
</style>
