<template>
    <article class="list-item" :data-list-id="data.id" :data-pos="data.pos">
        <div class="list-item__header">
            <span class="list-item__title">
                {{ data.title }}
            </span>
        </div>
        <draggable
            class="list-item__cardList list-group"
            :list="data.cards"
            :data-list-id="data.id"
            draggable=".card-item"
            group="cardItem"
            @end="onEnd"
        >
            <card-item
                v-for="card in data.cards"
                :data="card"
                :key="card.pos"
            />
        </draggable>
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
import draggable from "vuedraggable";
import CardItem from "./CardItem.vue";
import AddCard from "./AddCard.vue";
import { mapActions } from "vuex";

export default {
    props: ["data"],
    components: {
        "card-item": CardItem,
        "add-card": AddCard,
        draggable: draggable,
    },
    data() {
        return {
            isAddCard: false,
        };
    },
    methods: {
        ...mapActions(["UPDATE_CARD"]),
        onEnd(event) {
            const { to, item, newIndex } = event;

            const listId = to.dataset.listId;
            const siblings = Array.from(to.querySelectorAll(".card-item"));

            const currentCard = {
                id: item.dataset.cardId * 1,
                pos: 65535,
                listId: listId * 1,
            };

            // FIXME 카드 포지션 구하는 로직 수정 필요
            const prevCard = newIndex === 0 ? null : siblings[newIndex - 1];
            const nextCard =
                newIndex === siblings.length - 1
                    ? null
                    : siblings[newIndex + 1];

            if (!prevCard && !nextCard) {
                currentCard.pos = 65535;
            } else if (!prevCard && nextCard) {
                currentCard.pos = nextCard.dataset.cardPos / 2;
            } else if (prevCard && !nextCard) {
                currentCard.pos = prevCard.dataset.cardPos * 2;
            } else if (prevCard && nextCard) {
                const prevPos = prevCard.dataset.cardPos * 1;
                const nextPos = nextCard.dataset.cardPos * 1;
                currentCard.pos = (prevPos + nextPos) / 2;
            }

            this.UPDATE_CARD(currentCard);
        },
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
    padding: 5px 10px !important;
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
