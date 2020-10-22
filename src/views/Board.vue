<template>
    <div class="board-wrapper">
        <div class="loading" v-if="isLoading">Loading...</div>
        <div class="board" v-else>
            <header class="board__header">
                <span class="board__title">{{ board.title }}</span>
                <a
                    href=""
                    class="board__show-menu"
                    @click.prevent="isSetting = true"
                >
                    ...Show Menu
                </a>
            </header>
            <section class="board__content">
                <div
                    class="board__list-wrapper"
                    :data-list-id="list.id"
                    :data-list-pos="list.pos"
                    v-for="list in lists"
                    :key="list.pos"
                >
                    <List :data="list" />
                </div>
            </section>
        </div>
        <board-setting :class="isOpenSetting" @close="isSetting = false" />
        <router-view></router-view>
    </div>
</template>

<script>
import List from "../components/List.vue";
import BoardSetting from "../components/BoardSetting.vue";
import { mapActions, mapState } from "vuex";

export default {
    components: {
        List,
        "board-setting": BoardSetting,
    },
    data() {
        return {
            bid: "",
            isLoading: false,
            isSetting: false,
        };
    },
    computed: {
        ...mapState(["board", "bgColor"]),
        lists() {
            return this.board.lists;
        },
        isOpenSetting() {
            return {
                opened: this.isSetting,
            };
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
        setColor(color) {
            document.body.style.backgroundColor = color ? color : "#fff";
            document.querySelector("#nav-bar").style.backgroundColor = color
                ? "rgba(0, 0, 0, 0.15)"
                : "#026aa7";
        },
    },
    updated() {
        // 보드 데이터를 받아온 후 갱신된 스토어의 bgColor를 이용해서 배경색상 설정
        this.setColor(this.bgColor);
    },
    destroyed() {
        this.$store.commit("SET_BG_COLOR", null);
        this.setColor(null);
    },
};
</script>

<style>
.board-wrapper {
    display: flex;
    position: relative;
    padding: 10px;
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
    margin-bottom: 10px;
}

.board__show-menu {
    font-size: 1.25rem;
    font-weight: bold;
    color: rgb(58, 58, 58);
    text-decoration: underline;
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
