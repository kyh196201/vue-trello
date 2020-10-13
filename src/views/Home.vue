<template>
    <div class="home">
        <header>
            <h3 class="home__title">Personal Boards</h3>
        </header>
        <section class="boards-container">
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
            </ul>
        </section>
    </div>
</template>

<script>
// @ is an alias to /src
import { boards } from "@/api/";

export default {
    name: "Home",
    data() {
        return {
            boards: [],
        };
    },
    methods: {
        fetchData() {
            boards.fetch().then((data) => {
                this.boards = data.list;
            });
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
    padding: 10px;
    flex: 1 1 auto;
    width: 100%;
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
</style>
