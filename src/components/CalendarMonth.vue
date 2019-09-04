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
                        <div class="wrap" v-overflowed>
                            <div class="date">
                                {{ grid[i - 1 + (row - 1) * 7] | moment('DD') }}
                            </div>
                            <EventBlockSmall
                                v-for="event in getDateEvents(grid[i - 1 + (row - 1) * 7])"
                                :key="event.id"
                                :event="event"
                            ></EventBlockSmall>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import fillMonth from '../utils/fill-month';
import calendarViewMixin from '../mixins/calendar-view-mixin';
import overflowed from '../directives/overflowed-directive';
import EventBlockSmall from './EventBlockSmall';

export default {
    components: {
        EventBlockSmall
    },
    directives: {
        overflowed
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
    $cellHeight: 150px;

    .month-table {
        width: 100%;
        table-layout: fixed;
        border-collapse: collapse;

        td, th {
            border: 1px solid #f3f3f3;
        }

        td {
            vertical-align: top;
            height: $cellHeight;
            position: relative;
        }
    }

    .wrap {
        height: $cellHeight;
        overflow: hidden;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;

        &.overflowed {
            &:hover {
                height: auto;
                box-shadow: $shadow;
                background: white;
                z-index: 1;
            }
        }

    }

    .date {
        font-size: 18px;
        color: #ccc;
        text-align: right;
    }

    @media (max-width: 991px) {
        .month-table {
            display: block;

            tbody, tr, td {
                display: block;
            }

            td {
                height: auto;
            }

            thead {
                display: none;
            }
        }

        .wrap {
            height: auto;
            min-height: $cellHeight;
            position: static;
        }

        .event {
            font-size: 14px;
        }
    }
</style>
