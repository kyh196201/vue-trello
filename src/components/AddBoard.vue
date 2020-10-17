<template>
    <Modal class="addBoard">
        <div class="addBoard__header" slot="header">
            <p class="addBoard__title">Create a board</p>
            <a href="" class="addBoard__close" @click.prevent="onClose">
                &times;
            </a>
        </div>
        <div class="addBoard__form" slot="body">
            <input
                type="text"
                class="form-control"
                placeholder="제목을 입력하세요"
                v-model="boardTitle"
                @keyup.enter="onCreateBoard"
                ref="boardTitle"
            />
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
import validate from "../utils/validate.js";
import { mapActions, maoMutations, mapMutations } from "vuex";
import { KEYCODE } from "../utils/constants.js";

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
    mounted() {
        this.$refs.boardTitle.focus();
        this.setKeyupEvent();
        this.setClickcOutSideEvent();
    },
    methods: {
        ...mapMutations(["SET_IS_ADD_BOARD"]),
        ...mapActions(["CREATE_BOARD"]),
        onCreateBoard(event) {
            this.boardTitle = this.boardTitle.trim();

            if (!validate(this.boardTitle, "boardTitle")) {
                alert("제목을 제대로 입력해주세요!");
                this.boardTitle = "";
                this.$refs.boardTitle.focus();
                return false;
            }
            return this.CREATE_BOARD({ title: this.boardTitle })
                .then((item) => {
                    //CREATE_BOARD의 return 값이 item
                    this.SET_IS_ADD_BOARD(false);
                    this.$router.push(`/b/${item.id}`);
                })
                .catch((err) => console.error(err));
        },
        onClose() {
            this.SET_IS_ADD_BOARD(false);
        },
        setKeyupEvent() {
            const self = this;

            window.onkeyup = function(e) {
                if (e.keyCode !== KEYCODE.esc) return;
                self.SET_IS_ADD_BOARD(false);
                window.onkeyup = null;
            };
        },
        setClickcOutSideEvent() {
            const self = this;
            window.onclick = function(e) {
                const $target = e.target;
                if ($target.className === "modal-wrapper") {
                    self.SET_IS_ADD_BOARD(false);
                    window.onclick = null;
                }
            };
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
