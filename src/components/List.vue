<template>
    <article class="list-item" :data-list-id="data.id" :data-pos="data.pos">
        <div class="list-item__header">
            <input
                type="text"
                class="list-item__input form-control"
                v-model="inputTitle"
                v-if="isEdit"
                @blur="onBlur"
                @keyup.enter="onKeyUp"
                ref="inputTitle"
            />
            <span class="list-item__title" v-else @click="startEdit">
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
import getSibling from "../utils/dragger.js";

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
            isEdit: false,
            inputTitle: "",
        };
    },
    methods: {
        ...mapActions(["UPDATE_CARD", "UPDATE_LIST"]),
        onEnd({ to, item, newIndex }) {
            const listId = to.dataset.listId;
            const siblings = Array.from(to.querySelectorAll(".card-item"));

            const currentCard = {
                id: item.dataset.cardId * 1,
                listId: listId * 1,
                pos: 65535,
            };

            const { prev, next } = getSibling(item, siblings, newIndex, "card");

            if (!prev && next) {
                currentCard.pos = next.pos / 2;
            } else if (prev && !next) {
                currentCard.pos = prev.pos * 2;
            } else if (prev && next) {
                currentCard.pos = (prev.pos + next.pos) / 2;
            }
            this.UPDATE_CARD(currentCard);
        },
        startEdit() {
            this.isEdit = true;
            this.inputTitle = this.data.title;
            this.$nextTick(() => {
                this.$refs.inputTitle.focus();
            });
        },
        onKeyUp() {
            this.inputTitle = this.inputTitle.trim();
            const { id, title } = this.data;

            if (!this.inputTitle) {
                alert("리스트 제목을 입력해주세요!");
                this.inputTitle = title;
                return false;
            }

            if (this.inputTitle === title) {
                this.onBlur();
            }

            this.UPDATE_LIST({
                id: id,
                title: this.inputTitle,
            })
                .then(() => this.onBlur())
                .catch((err) => console.error(err));
        },
        onBlur() {
            this.restore();
        },
        restore() {
            this.inputTitle = "";
            this.isEdit = false;
            return false;
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

.list-item__header > span {
    display: inline-block;
    width: 100%;
}

.list-item__cardList {
    padding: 5px 10px !important;
    margin: 0;
}

.list-item__header .form-control {
    font-weight: bold !important;
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
