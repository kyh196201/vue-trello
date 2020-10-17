<template>
    <div class="home">
        <header>
            <h3 class="home__title">{{ boardTitle }}</h3>
        </header>
        <div class="loader" v-if="isLoading">Loading...</div>
        <section class="boards-container" v-else>
            <ul class="boards-list">
                <li
                    class="boards-item"
                    v-for="board in boards"
                    :key="board.id"
                    :data-bg-color="board.bgColor"
                    ref="boardItem"
                >
                    <router-link
                        :to="`/b/${board.id}`"
                        class="boards-item__link"
                    >
                        <span class="boards-item__title">
                            {{ board.title }}
                        </span>
                    </router-link>
                </li>
                <li class="boards-item add-board">
                    <a
                        href=""
                        class="boards-item__link"
                        @click.prevent="SET_IS_ADD_BOARD(true)"
                    >
                        <span class="boards-item__title">Add Board</span>
                    </a>
                </li>
            </ul>
        </section>
        <AddBoard
            v-if="showAddBoard"
            @close="showAddBoard = false"
            @submit="onCreateBoard"
        />
    </div>
</template>

<script>
// @ is an alias to /src
import AddBoard from "../components/AddBoard.vue";
import { mapState, mapActions, mapMutations } from "vuex";
import { boards } from "../api";

export default {
    name: "Home",
    components: { AddBoard },
    data() {
        return {
            boardTitle: "Personal Board",
            isLoading: false,
        };
    },
    computed: {
        ...mapState(["boards", "showAddBoard"]),
    },
    methods: {
        ...mapMutations(["SET_IS_ADD_BOARD"]),
        ...mapActions(["FETCH_BOARDS"]),
        fetchData() {
            this.isLoading = true;
            this.FETCH_BOARDS().then(() => (this.isLoading = false));
        },
        onCreateBoard() {
            this.showAddBoard = false;
            this.fetchData();
        },
    },
    created() {
        this.fetchData();
    },
    updated() {
        this.$refs.boardItem.forEach((el) => {
            el.style.backgroundColor = el.dataset.bgColor;
        });
    },
};
</script>

<style>
.home {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.boards-container {
    flex: 1 1 auto;
}

.boards-list {
    display: flex;
    flex: 1 1;
    justify-content: flex-start;
    flex-wrap: wrap;
    width: 100%;
}

.boards-item {
    width: 270px;
    height: 100px;
    margin-right: 15px;
    margin-bottom: 10px;
    border-radius: 5px;
}

.boards-item:hover {
    opacity: 0.7;
}

.boards-item__link {
    display: block;
    padding: 8px;
    width: 100%;
    height: 100%;
}

.boards-item__title {
    font-size: 1.25rem;
    font-weight: bold;
    color: #fff;
}

.add-board {
    background-color: #dddddd;
}

.add-board .boards-item__link {
    display: flex;
    flex: 1 1;
    justify-content: center;
    align-items: center;
}

.add-board .boards-item__title {
    vertical-align: middle;
    color: gray;
}
</style>
