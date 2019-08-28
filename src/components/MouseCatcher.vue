<template>
    <div
        class="mouse-catcher"
        :class="{ 'keep-on-top': keepOnTop }"
        @mousemove="mousemove($event)"
        @mousedown="mousedown($event)"
    >
        {{mode}}
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
                    type: 'mousemove',
                    y: event.offsetY,
                    date: this.date
                });
            }
        },
        mousedown(event) {
            this.selectionController.event({
                type: 'mousedown',
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
        background: rgba(yellow, .3);

        &.keep-on-top {
            z-index: 3;
        }
    }
</style>