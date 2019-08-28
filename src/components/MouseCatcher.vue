<template>
    <div
        class="mouse-catcher"
        :class="{ 'keep-on-top': keepOnTop }"
        @mousemove="mousemove($event)"
        @mousedown="mousedown($event)"
    >
    </div>
</template>

<script>
export default {
    props: {
        selectionController: Object,
        date: {
            validator: value => value.constructor.name === 'Moment'
        }
    },
    data() {
        return {
            mode: 'idle'
        }
    },
    computed: {
        keepOnTop() {
            return this.mode === 'watch';
        }
    },
    methods: {
        mousemove(event) {
            if (this.mode === 'watch') {
                this.selectionController.event({
                    type: 'newPosition',
                    y: event.offsetY,
                    date: this.date
                });
            }
        },
        mousedown(event) {
            this.selectionController.event({
                type: 'create',
                y: event.offsetY,
                date: this.date
            });
        },
        updateMode(mode) {
            this.mode = mode;
        }
    },
    created() {
        this.$options.selWatcher = this
            .selectionController
            .watch(mode => this.updateMode(mode));
    },
    destroyed() {
        this.$options.selWatcher();
    }
}
</script>

<style lang="scss" scoped>
    .mouse-catcher {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        user-select: none;

        &.keep-on-top {
            z-index: 4;
        }
    }
</style>