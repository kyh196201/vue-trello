<template>
    <Modal class="addBoard">
        <div class="addBoard__header" slot="header">
            <p class="addBoard__title">Create a board</p>
            <a href="" class="addBoard__close" @click.prevent="$emit('close')">
                &times;
            </a>
        </div>
        <div class="addBoard__form" slot="body">
            <form>
                <input
                    type="text"
                    class="form-control"
                    placeholder="제목을 입력하세요"
                    v-model="boardTitle"
                    ref="boardTitle"
                />
            </form>
        </div>
        <div class="addBoard__footer" slot="footer">
            <b-button
                variant="success"
                type="submit"
                :disabled="!isValid"
                @click="onCreateBoard"
            >
                Create
            </b-button>
        </div>
    </Modal>
</template>

<script>
import Modal from "./Modal.vue";
import { board, boards } from "../api";
import validate from "../utils/validate.js";

export default {
    components: { Modal },
    data() {
        return {
            boardTitle: "",
        };
    },
    computed: {
        isValid() {
            return !!this.boardTitle.length;
        },
    },
    methods: {
        onCreateBoard(event) {
            this.boardTitle = this.boardTitle.trim();

            if (!validate(this.boardTitle, "boardTitle")) {
                alert("제목을 제대로 입력해주세요!");
                this.boardTitle = "";
                this.$refs.boardTitle.focus();
                return false;
            }
            return board
                .create(this.boardTitle)
                .then((data) => {
                    this.$emit("submit");
                })
                .catch((err) => Promise.reject(err));
        },
    },
};
</script>

<style>
.addBoard__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1 1;
}

.addBoard__title {
    margin-bottom: 0;
    font-weight: bold;
    font-size: 1.25rem;
}

.addBoard__close {
    font-size: 1.25rem;
    font-weight: bold;
    color: var(--black-color);
}

.addBoard__form .form-control {
    font-weight: bold;
}
</style>
