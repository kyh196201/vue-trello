<template>
    <Modal class="cardView" data-list-id="card.listId">
        <div v-if="isLoading"></div>
        <template v-else>
            <header slot="header" class="cardView__header">
                <b-form-input
                    v-model="inputTitle"
                    placeholder="타이틀을 입력하세요:-)"
                    class="cardView__inputTitle"
                    v-if="isEdit"
                    ref="inputTitle"
                ></b-form-input>
                <span class="cardView__title" v-else>{{ card.title }}</span>
                <router-link :to="`/b/${board.id}`" class="cardView__close">
                    &times;
                </router-link>
            </header>
            <div slot="body" class="cardView__body">
                <div>Description</div>
                <b-form-textarea
                    class="cardView__inputDesc"
                    v-if="isEdit"
                    v-model="inputDesc"
                    placeholder="상세 내용을 입력하세요:-)"
                    ref="inputDesc"
                ></b-form-textarea>
                <p class="cardView__desc" v-else>
                    {{ card.description || emptyText }}
                </p>
            </div>
            <footer slot="footer" class="cardView__footer">
                <template v-if="isEdit">
                    <b-button
                        variant="success"
                        class="cardView__button"
                        @click="onEditCard"
                    >
                        Done
                    </b-button>
                    <b-button
                        variant="dark"
                        class="cardView__button"
                        @click="restoreEdit"
                    >
                        cancel
                    </b-button>
                </template>
                <template v-else>
                    <b-button
                        variant="success"
                        class="cardView__button"
                        @click="startEdit"
                    >
                        Edit
                    </b-button>
                    <b-button
                        variant="dark"
                        class="cardView__button"
                        @click="goBoard"
                    >
                        Ok
                    </b-button>
                </template>
            </footer>
        </template>
    </Modal>
</template>

<script>
import Modal from "../components/Modal.vue";
import { mapActions, mapState } from "vuex";

export default {
    name: "Card",
    components: {
        Modal: Modal,
    },
    data() {
        return {
            cid: "",
            card: {},
            isLoading: false,
            isEdit: false,
            inputTitle: "",
            inputDesc: "",
            emptyText: "카드 상세 내용을 입력하세요:-)",
        };
    },
    computed: {
        ...mapState(["board"]),
    },
    created() {
        this.cid = this.$route.params.cid;
        this.fetchData();
    },
    watch: {
        $route(to, from) {
            this.cid = to.params.cid;
        },
    },
    methods: {
        ...mapActions(["FETCH_CARD", "UPDATE_CARD"]),
        fetchData() {
            this.FETCH_CARD({
                id: this.cid,
            })
                .then((item) => (this.card = item))
                .catch((err) => console.error(err));
        },
        goBoard() {
            const bid = this.board.id;
            this.$router.push(`/b/${bid}`);
        },
        startEdit() {
            this.isEdit = true;
            this.setEditor();
            this.$nextTick(() => this.$refs.inputTitle.focus());
        },
        // 수정 모드 실행 시 수정 데이터에 기존 Card 데이터 바인딩.
        setEditor() {
            this.inputTitle = this.card.title;
            this.inputDesc = this.card.description || "";
        },
        restoreEdit() {
            this.inputTitle = "";
            this.inputDesc = "";
            this.isEdit = false;
        },
        onEditCard() {
            const listId = this.card.listId;
            const title = this.inputTitle.trim();
            const description = this.inputDesc.length
                ? this.inputDesc.trim()
                : null;
            const id = this.cid;

            if (!this.inputTitle.length) {
                alert("카드 제목을 입력해주세요!");
                this.inputTitle = this.card.title;
                this.$nextTick(() => this.$refs.inputTitle.focus());
                return false;
            }

            this.UPDATE_CARD({ id, title, listId, description })
                .catch((err) => console.error(err))
                .finally(() => {
                    this.fetchData();
                    this.restoreEdit();
                });
        },
    },
};
</script>

<style>
.cardView .modal-container {
    width: 600px;
}

.cardView .modal-header {
    border-bottom: none;
}
.cardView .modal-footer {
    border-top: none;
}

.cardView__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.cardView__title {
    flex: 1 1;
    margin-right: 10px;
    padding: 0.375rem 0.75rem;
    font-size: 1.25rem;
    font-weight: bold;
    background-color: #dbe4ff;
    border-radius: 5px;
}

.cardView__inputTitle {
    flex: 1 1;
    margin-right: 10px;
    font-size: 1.25rem !important;
    font-weight: bold !important;
}

.cardView__inputDesc {
    font-size: 1.25rem !important;
    font-weight: bold !important;
    color: #000 !important;
}

.cardView__close {
    color: #000;
    font-weight: bold;
    font-size: 2rem;
    color: #495057;
}

.cardView__body > div {
    margin-bottom: 10px;
    font-weight: bold;
    font-size: 1.5rem;
    color: #495057;
}

.cardView__desc {
    margin-bottom: 0px;
    padding: 0.375rem 0.75rem;
    max-height: 500px;
    font-weight: bold;
    font-size: 1.25rem;
    background-color: #dbe4ff;
    border-radius: 5px;
    word-break: break-word;
    /* color: #495057; */
}

.cardView__button {
    font-weight: bold !important;
    font-size: 2rem;
}

.cardView__button:first-child {
    margin-right: 10px;
}
</style>
