<template>
    <div class="calendar">
        <div class="mb-3">
            {{ date | moment('MMMM') }}
        </div>
        <table class="month-table">
            <tbody>
                <tr v-for="row in rows" :key="row">
                    <td v-for="i in 7" :key="i">
                        <div class="date">
                            {{ grid[i - 1 + (row - 1) * 7] | moment('DD') }}
                        </div>
                        <span
                            v-for="event in getDateEvents(grid[i - 1 + (row - 1) * 7])"
                            :key="event.id"
                        >
                            +
                        </span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import fillMonth from '../utils/fill-month';
import calendarViewMixin from '../mixins/calendar-view-mixin';

import EventBlock from './EventBlock';

export default {
    components: {
        EventBlock
    },
    mixins: [calendarViewMixin],
    computed: {
        grid() {
            return fillMonth(this.date);
        },
        rows() {
            return this.grid.length / 7;
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../styles/variables';

    .month-table {
        width: 100%;
        table-layout: fixed;
        border-collapse: collapse;

        td, th {
            border: 1px solid #f3f3f3;
        }

        td {
            height: 40px;
            vertical-align: top;
            font-size: 10px;
        }
    }

    .date {
        color: #ccc;
        text-align: right;
    }
</style>