<template>
    <div class="selection">
        <div
            class="move-top"
            v-if="includeStart"
            @mousedown="moveTop"
        >
            <div class="decoration"></div>
        </div>
        <div
            v-if="includeEnd"
            class="change-end"
            @mousedown="changeEnd"
        >
            <div class="decoration"></div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        selectionController: Object,
        date: {
            validator: value => value.constructor.name === 'Moment'
        },
        selection: Object,
        start: Number,
        end: Number
    },
    computed: {
        includeStart() {
            return this.dateInRange(this.selection.start);
        },
        includeEnd() {
            return this.dateInRange(this.selection.end);
        }
    },
    methods: {
        moveTop() {
            this.selectionController.event({
                type: 'moveTop'
            });
        },
        changeEnd() {
            this.selectionController.event({
                type: 'changeEnd'
            });
        },
        dateInRange(date) {
            const range = this.dateRange(this.date);
            return date.isSameOrAfter(range.start) && date.isSameOrBefore(range.end);
        },
        dateRange(date) {
            const start = date
                .clone()
                .startOf('day')
                .hours(this.start);
            const end = date
                .clone()
                .startOf('day')
                .hours(this.end);
            return { start, end };
        },
    }
}
</script>

<style lang="scss" scoped>
    @import '../styles/variables';

    .selection {
        position: absolute;
        background: rgba(blue, .2);
        width: 100%;
        left: 0;
        z-index: 3;
        user-select: none;
        border-radius: $borderRadius;
    }

    .move-top,
    .change-end {
        position: absolute;
        left: 0;
        width: 100%;
        height: 16px;
    }

    .move-top {
        top: 0;
        cursor: move;
    }

    .change-end {
        bottom: 0;
        cursor: s-resize;
    }

    .decoration {
        position: absolute;
        top: 7px;
        left: 20px;
        right: 20px;
        bottom: 7px;
        background: rgba(black, .25);
        border-radius: $borderRadius;
    }
</style>