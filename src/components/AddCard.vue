<template>
    <article class="addCard">
        <div class="addCard__header">
            <input
                type="text"
                class="addCard__input form-control"
                v-model="cardTitle"
                @keyup.enter="onSubmit"
                ref="inputTitle"
            />
        </div>
        <div class="addCard__footer">
            <b-button variant="success" size="sm" @click="onSubmit">
                Add Card
            </b-button>
            <a href="" class="addCard__close" @click.prevent="$emit('close')">
                &times;
            </a>
        </div>
    </article>
</template>

<script>
import { mapActions } from "vuex";

export default {
    props: ["listId"],
    data() {
        return {
            cardTitle: "",
        };
    },
    mounted() {
        this.focusInput();
        this.bindEvent();
    },
    destroyed() {
        const self = this;
        document
            .querySelector("body")
            .removeEventListener("click", this.onClickOutSide, false);
    },
    methods: {
        ...mapActions(["CREATE_CARD"]),
        focusInput() {
            this.$refs.inputTitle.focus();
        },
        onSubmit() {
            this.cardTitle = this.cardTitle.trim();

            if (!this.cardTitle) {
                alert("제목을 입력해주세요!");
                return this.focusInput();
            }

            this.CREATE_CARD({
                title: this.cardTitle,
                listId: Number(this.listId),
            })
                .catch((err) => {
                    console.error(err);
                    alert("카드를 다시 생성해주세요");
                    this.focusInput();
                })
                .finally(() => this.$emit("close"));
        },
        bindEvent() {
            const self = this;
            document
                .querySelector("body")
                .addEventListener("click", this.onClickOutSide, false);
        },
        onClickOutSide(event) {
            const $target = event.target;
            const $parent = this.$el.closest(".list-item");
            if (
                $parent.contains($target) ||
                $target.classList.contains("addCard__toggle")
            )
                return;
            this.$emit("close");
        },
    },
};
</script>

<style>
.addCard {
    display: flex;
    flex-direction: column;
    flex: 1 1;
    padding: 10px;
}

.addCard__header {
    margin-bottom: 0.5rem;
}

.addCard__footer {
    display: flex;
    flex-direction: row;
    /* align-self: center; */
    justify-content: space-between;
}

.addCard__close {
    color: #000;
    font-weight: bold;
    font-size: 1.25rem;
}
</style>
