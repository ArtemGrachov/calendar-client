<template>
    <div class="calendar">
        <div class="mb-2 title-sm month">
            {{ date | moment('MMMM') }}
        </div>
        <table class="month-table">
            <tbody>
                <tr v-for="(week, wIndex) in weekGrid" :key="wIndex">
                    <td
                        class="month-table-cell"
                        v-for="(day, rIndex) in week"
                        :key="rIndex"
                        :class="{ 'today': isToday(day) }"
                    >
                        <div class="wrap" v-if="isCurrentMonth(day)">
                            <div class="date">
                                {{ day | moment('DD') }}
                            </div>
                            <div
                                class="event"
                                :style="{ 'background-color': event.color }"
                                v-for="event in getDateEvents(day)"
                                :key="event.id"
                            ></div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import moment from 'moment';
import fillMonth from '../utils/fill-month';
import calendarViewMixin from '../mixins/calendar-view-mixin';

export default {
    mixins: [calendarViewMixin],
    computed: {
        grid() {
            return fillMonth(this.date);
        },
        weekGrid() {
            return this.grid.reduce((acc, curr) => {
                if (acc[acc.length - 1].length === 7) {
                    acc.push([]);
                }

                acc[acc.length - 1].push(curr);

                return acc;
            }, [[]]);
        }
    },
    methods: {
        isCurrentMonth(date) {
            return date.month() === this.date.month();
        },
        isToday(date) {
            return date.startOf('day').isSame(moment().startOf('day'));
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
        line-height: 1;

        &-cell {
            border: 1px solid #f3f3f3;
            vertical-align: top;
            font-size: 10px;
        }
    }

    .today {
        background: rgba($blue, .75);
        color: white;

        .date {
            color: white;
        }
    }

    .wrap {
        height: 40px;
        overflow: hidden;
    }

    .date {
        color: $mediumgrey;
        text-align: right;
    }

    .event {
        $size: 8px;
        width: $size;
        height: $size;
        display: inline-block;
        vertical-align: middle;
        border-radius: 50%;
        margin: 1px;
        border: 1px solid rgba(black, .1);
        background-color: $lightgrey;
    }
</style>