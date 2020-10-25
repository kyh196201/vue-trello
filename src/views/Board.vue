<template>
    <div class="board-wrapper">
        <div class="loading" v-if="isLoading">Loading...</div>
        <div class="board" v-else>
            <header class="board__header">
                <input
                    type="text"
                    class="form-control board__inputTitle"
                    v-model="inputTitle"
                    v-if="isEdit"
                    ref="inputTitle"
                    @blur="onBlur"
                    @keyup.enter="onKeyup"
                />
                <span class="board__title" v-else @click="startEdit">{{
                    board.title
                }}</span>
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
                <div class="board__addList-wrapper">
                    <add-list v-if="isAddList" @close="isAddList = false" />
                    <a href="" v-else @click.prevent="isAddList = true">
                        &plus; Add another list
                    </a>
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
import AddList from "../components/AddList.vue";
import { mapActions, mapState } from "vuex";

export default {
    components: {
        List,
        "board-setting": BoardSetting,
        "add-list": AddList,
    },
    data() {
        return {
            bid: "",
            inputTitle: "",
            isEdit: false,
            isLoading: false,
            isSetting: false,
            isAddList: false,
            firingEvent: null,
        };
    },
    computed: {
        ...mapState(["board"]),
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
        ...mapActions(["FETCH_BOARD", "UPDATE_BOARD"]),
        fetchData() {
            const id = this.bid;
            this.isLoading = true;
            this.FETCH_BOARD({ id })
                .catch((err) => console.error(err))
                .finally(() => (this.isLoading = false));
        },
        startEdit() {
            this.isEdit = true;
            this.inputTitle = this.board.title;
            this.$nextTick(() => this.$refs.inputTitle.focus());
        },
        onBlur() {
            if (this.firingEvent) return;
            this.restore();
        },
        onKeyup(ev) {
            this.updateBoard(ev);
        },
        updateBoard(ev) {
            this.firingEvent = ev.type;
            console.log(this.firingEvent);
            const id = this.bid;

            if (!this.inputTitle) {
                alert("제목을 입력해주세요!");
                this.$refs.inputTitle.focus();
                this.inputTitle = this.board.title;
                return false;
            }

            this.inputTitle = this.inputTitle.trim();

            if (this.inputTitle === this.board.title) return false;

            return this.UPDATE_BOARD({
                id,
                title: this.inputTitle,
            })
                .catch((err) => console.error(err))
                .finally(() => {
                    this.restore();
                });
        },
        restore() {
            this.isEdit = false;
            this.inputTitle = "";
            this.firingEvent = null;
        },
    },
    destroyed() {
        this.$store.commit("SET_BG_COLOR", null);
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

.form-control.board__inputTitle {
    max-width: 200px;
    font-weight: bold;
    font-size: 1.25rem;
}

.form-control.board__inputTitle:focus {
    border-color: lightseagreen;
    box-shadow: none;
}

.board__show-menu {
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

.board__addList-wrapper {
    display: inline-block;
    width: 250px;
    margin-right: 10px;
    vertical-align: top;
    background-color: rgba(0, 0, 0, 0.25);
    border-radius: 5px;
}

.board__addList-wrapper > a {
    display: block;
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    color: #fff;
    transition: all 0.2s linear;
}

.board__addList-wrapper > a:hover {
    opacity: 0.5;
    color: #fff;
}
</style>
