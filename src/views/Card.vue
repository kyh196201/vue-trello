<template>
    <Modal class="cardView" data-list-id="card.listId">
        <div v-if="isLoading"></div>
        <template v-else>
            <header slot="header" class="cardView__header">
                <b-form-input
                    v-model="inputTitle"
                    placeholder="타이틀을 입력하세요:-)"
                    class="cardView__inputTitle"
                    v-if="isEditTitle"
                    ref="inputTitle"
                ></b-form-input>
                <span class="cardView__title" v-else @click="setEditTitle">{{
                    card.title
                }}</span>
                <router-link :to="`/b/${board.id}`" class="cardView__close">
                    &times;
                </router-link>
            </header>
            <div slot="body" class="cardView__body">
                <div>Description</div>
                <b-form-textarea
                    class="cardView__inputDesc"
                    v-if="isEditDesc"
                    v-model="inputDesc"
                    placeholder="상세 내용을 입력하세요:-)"
                    ref="inputDesc"
                ></b-form-textarea>
                <p class="cardView__desc" v-else @click="setEditDesc">
                    {{ card.discription || emptyText }}
                </p>
            </div>
            <footer slot="footer" class="cardView__footer">
                <b-button
                    variant="dark"
                    class="cardView__button"
                    @click="goBoard"
                    >Ok</b-button
                >
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
            isEditTitle: false,
            inputTitle: "",
            isEditDesc: false,
            inputDesc: "",
            emptyText: "클릭해서 카드 내용을 입력하세요:-)",
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
        ...mapActions(["FETCH_CARD"]),
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
        // Edit Title 시작 함수
        setEditTitle() {
            this.isEditTitle = true;
            this.inputTitle = this.card.title.trim();
            // NOTE nextTick()
            this.$nextTick(() => {
                this.$refs.inputTitle.focus();
            });
        },
        setEditDesc() {
            this.isEditDesc = true;
            this.inputDesc = this.card.description
                ? this.card.description.trim()
                : "";
            this.$nextTick(() => {
                this.$refs.inputDesc.focus();
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
</style>
