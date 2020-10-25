<template>
    <article class="addCard">
        <div class="addCard__header">
            <input
                type="text"
                class="addCard__input form-control"
                v-model="inputTitle"
                @keyup.enter="onSubmit"
                ref="inputTitle"
            />
        </div>
        <div class="addCard__footer">
            <b-button variant="success" size="sm" @click="onSubmit">
                Add List
            </b-button>
            <a href="" class="addCard__close" @click.prevent="$emit('close')">
                &times;
            </a>
        </div>
    </article>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { getLastElement } from "../utils/helper.js";

export default {
    data() {
        return {
            inputTitle: "",
        };
    },
    computed: {
        ...mapState(["board"]),
    },
    mounted() {
        this.$refs.inputTitle.focus();
        this.$nextTick(() => {
            setTimeout(() => {
                this.setClickOutSide();
            }, 100);
        });
    },
    methods: {
        ...mapActions(["CREATE_LIST"]),
        onSubmit() {
            this.inputTitle = this.inputTitle.trim();

            if (!this.inputTitle) {
                alert("제목을 입력해주세요!");
                this.$refs.inputTitle.focus();
                return false;
            }

            const boardId = this.board.id;

            const lastList = getLastElement(this.board.lists);
            const pos = lastList && lastList.pos ? lastList.pos * 2 : 65535;

            this.CREATE_LIST({
                title: this.inputTitle,
                boardId: boardId,
                pos: pos,
            })
                .then(() => this.onClose())
                .catch((err) => console.error(err));
        },
        setClickOutSide() {
            window.onclick = (e) => {
                e.stopPropagation();
                if (this.$el.contains(e.target)) return;
                this.onClose();
            };
        },
        onClose() {
            this.$emit("close");
            window.onclick = null;
        },
    },
};
</script>
