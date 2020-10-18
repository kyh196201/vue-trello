<template>
    <div class="board-wrapper">
        <div class="loading" v-if="isLoading">Loading...</div>
        <div class="board" v-else>
            <header class="board__header">
                <span class="board__title">{{ board.title }}</span>
                <a href="" class="board__show-menu">...Show Menu</a>
            </header>
            <section class="board__content">
                <div
                    class="board__list-wrapper"
                    v-for="list in lists"
                    :key="list.pos"
                >
                    <List :data="list" />
                </div>
            </section>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import List from "../components/List.vue";
import { mapActions, mapState } from "vuex";

export default {
    components: {
        List,
    },
    data() {
        return {
            bid: "",
            isLoading: false,
        };
    },
    computed: {
        ...mapState(["board"]),
        lists() {
            return this.board.lists;
        },
    },
    created() {
        this.bid = this.$route.params.bid;
        this.fetchData();
    },
    methods: {
        ...mapActions(["FETCH_BOARD"]),
        fetchData() {
            const id = this.bid;
            this.isLoading = true;
            this.FETCH_BOARD({ id })
                .catch((err) => console.error(err))
                .finally(() => (this.isLoading = false));
        },
    },
};
</script>

<style>
.board-wrapper {
    display: flex;
    height: 100%;
}

.board {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: 100%;
}

.board__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: none;
}

.board__title {
    font-weight: bold;
    font-size: 1.25rem;
}

.board__content {
    overflow-y: hidden;
    overflow-x: auto;
    flex: 1 1;
    white-space: nowrap;
}

.board__list-wrapper {
    display: inline-block;
    overflow-x: hidden;
    overflow-y: auto;
    margin-right: 10px;
    width: 250px;
    height: 100%;
}
</style>
