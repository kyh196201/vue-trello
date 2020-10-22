<template>
    <section class="board-setting setting">
        <header class="setting__header">
            <span>Menu</span>
            <button class="setting__close" @click.prevent="$emit('close')">
                &times;
            </button>
        </header>
        <div class="setting__body">
            <div class="setting__item">
                <a
                    href=""
                    class="setting__delete"
                    @click.prevent="onDeleteBoard"
                >
                    Delete Board
                </a>
            </div>
            <div class="setting__item">
                <Colors />
            </div>
        </div>
    </section>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Colors from "./Colors.vue";

export default {
    name: "BoardSetting",
    components: {
        Colors,
    },
    computed: {
        ...mapState(["board"]),
    },
    methods: {
        ...mapActions(["DELETE_BOARD"]),
        onDeleteBoard() {
            const { title, id } = this.board;

            if (!window.confirm(`${title}보드를 삭제하시겠습니까?`)) return;

            this.DELETE_BOARD({ id })
                .then(() => this.goMain())
                .catch((err) => console.error(err));
        },
        goMain() {
            this.$router.push("/");
        },
    },
};
</script>

<style>
.board-setting {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 0;
    right: -100%;
    bottom: 0;
    width: 200px;
    height: 100vh;
    background-color: #edeff0;
    z-index: 9999;
    opacity: 0;
    transition: all 0.5s linear 0s;
}

.board-setting.opened {
    opacity: 1;
    right: 0;
}

.setting .setting__header {
    position: relative;
    margin-bottom: 10px;
    padding: 5px 10px;
    text-align: center;
    font-weight: bolder;
    border-bottom: 1px solid lightgray;
}

.setting .setting__header > span {
    font-size: 1.15rem;
}

.setting .setting__header > .setting__close {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    font-weight: bolder;
    font-size: 1.25rem;
    cursor: pointer;
}

.setting .setting__header > .setting__close:hover {
    opacity: 0.5;
}

/* Setting body */
.setting__body {
    flex: 1 1;
}

.setting__item .setting__delete {
    display: block;
    padding: 5px;
    color: #000;
    font-weight: 500;
    text-align: center;
}

.setting__item .setting__delete:hover {
    background-color: rgba(0, 0, 0, 0.4);
    color: #fff;
}
</style>
