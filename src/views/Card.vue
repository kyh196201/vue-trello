<template>
    <Modal class="cardView" data-list-id="card.listId">
        <div v-if="isLoading"></div>
        <template v-else>
            <header slot="header" class="cardView__header">
                <span class="cardView__title">{{ card.title }}</span>
                <router-link :to="`/b/${board.id}`" class="cardView__close">
                    &times;
                </router-link>
            </header>
            <div slot="body" class="cardView__body">
                <div>Description</div>
                <p class="cardView__desc">
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
    components: {
        Modal: Modal,
    },
    data() {
        return {
            cid: "",
            card: {},
            isLoading: false,
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
    padding: 0 10px;
    font-size: 1.5rem;
    font-weight: bold;
    background-color: #dbe4ff;
    border-radius: 5px;
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
    padding: 5px 10px;
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
