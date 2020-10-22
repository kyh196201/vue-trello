<template>
    <div class="setting__colors colors">
        <div class="colors__item" v-for="(color, index) in colors" :key="index">
            <a
                href=""
                :data-bg-color="color"
                ref="colorsItem"
                @click.prevent="onChangeColor"
            ></a>
        </div>
    </div>
</template>

<script>
import { COLORS } from "../utils/constants.js";
import { mapActions, mapState } from "vuex";

export default {
    name: "Colors",
    data() {
        return {
            colors: [],
        };
    },
    computed: {
        ...mapState(["board"]),
        getBgColor() {},
    },
    created() {
        this.colors = COLORS;
    },
    mounted() {
        this.$refs.colorsItem.forEach(
            (el) => (el.style.backgroundColor = el.dataset.bgColor)
        );
    },
    methods: {
        ...mapActions(["UPDATE_BOARD"]),
        onChangeColor(ev) {
            const { bgColor } = ev.target.dataset;
            const id = this.board.id;

            if (!id || !bgColor) return;

            this.UPDATE_BOARD({ id, bgColor });
        },
    },
};
</script>

<style>
.setting__colors {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
}
.colors__item {
    flex-shrink: 0;
    width: 90px;
    height: 90px;
    padding: 5px;
    box-sizing: content-box;
}

.colors__item > a {
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 5px;
}

.colors__item > a:hover {
    opacity: 0.7;
}
</style>
