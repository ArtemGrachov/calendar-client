<template>
    <div class="calendar">
        <div class="calendar-header mb-3">
            <div class="calendar-header-date">
                {{ date | moment('MMMM YYYY') }}
            </div>
        </div>
        <table class="month-table">
            <thead>
                <tr>
                    <th>
                        Monday
                    </th>
                    <th>
                        Tuesday
                    </th>
                    <th>
                        Wednesday
                    </th>
                    <th>
                        Thursday
                    </th>
                    <th>
                        Friday
                    </th>
                    <th>
                        Saturday
                    </th>
                    <th>
                        Sunday
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in rows" :key="row">
                    <td v-for="i in 7" :key="i">
                        <div class="date">
                            {{ grid[i - 1 + (row - 1) * 7] | moment('DD') }}
                        </div>
                        <EventBlock
                            v-for="event in getDateEvents(grid[i - 1 + (row - 1) * 7])"
                            :key="event.id"
                            :event="event"
                        ></EventBlock>
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
            height: 150px;
            vertical-align: top;
        }
    }

    .date {
        padding: $space;
        font-size: 18px;
        color: #ccc;
        text-align: right;
    }
</style>