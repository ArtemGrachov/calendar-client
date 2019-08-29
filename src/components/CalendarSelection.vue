<template>
    <div class="selection">
        <div
            class="move-top"
            v-if="includeStart"
            @mousedown="moveTop"
        >
            <div class="decoration"></div>
        </div>
        <div class="controls">
            <button
                class="button-round button-transparent mr-2"
                @click="openCreateEventModal"
            >
                <i class="material-icons">
                    add
                </i>
            </button>
            <button
                class="button-round button-transparent"
                @click="close"
            >
                <i class="material-icons">
                    clear
                </i>
            </button>
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
import Modal from '../modal';
import ModalEventForm from './ModalEventForm';
import { FORM_ACTIONS_SUCCESS } from '../store/form/action-types';

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
        openCreateEventModal() {
            Modal.openModal({
                component: ModalEventForm,
                data: {
                    ...this.selection
                }
            });
        },
        close() {
            this.$emit('close');
        }
    },
    created() {
        this.$options.actionSub = this.$store.subscribeAction(action => {
            if (action.type === 'editEvent/' + FORM_ACTIONS_SUCCESS) {
                this.close();
            }
        })
    },
    destroyed() {

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

    .controls {
        position: absolute;
        bottom: 100%;
        left: 0;
        margin-bottom: $space;
    }
</style>