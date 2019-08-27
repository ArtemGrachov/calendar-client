<template>
    <div class="calenda">
        <div class="calendar-header mb-3">
            <div class="calendar-header-date">
                {{ grid[0] | moment('MMMM Do YYYY') }} -
                {{ grid.slice(-1)[0] | moment('MMMM Do YYYY') }}
            </div>
        </div>
        <table class="week-table">
            <thead>
                <tr>
                    <th class="hours"></th>
                    <th v-for="day in 7" :key="day" class="p-2">
                        <div class="day-date mb-1">
                            {{grid[day - 1] | moment('DD')}}
                        </div>
                        <div class="day-of-week">
                            {{grid[day - 1] | moment('dddd')}}
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td class="hours">
                        <DayHours
                            :start="start"
                            :end="end"
                            :stepMin="stepMin"
                            :stepHeightPx="stepHeightPx"
                            :date="date"
                        ></DayHours>
                    </td>
                    <td v-for="i in 7" :key="i">
                        <EventBlock
                            class="event"
                            :style="getEventPos(grid[i - 1], event)"
                            v-for="event in getDateEvents(grid[i - 1])"
                            :key="event.id"
                            :event="event"
                        ></EventBlock>
                        <DayGrid
                            :start="start"
                            :end="end"
                            :stepMin="stepMin"
                            :stepHeightPx="stepHeightPx"
                            :date="grid[i - 1]"
                        ></DayGrid>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import fillWeek from '../utils/fill-week';
import DayGrid from './DayGrid';
import DayHours from './DayHours';
import EventBlock from './EventBlock';
import calendarViewMixin from '../mixins/calendar-view-mixin';
import calendarWithHoursMixin from '../mixins/calendar-view-hours-mixin';

export default {
    mixins: [calendarViewMixin, calendarWithHoursMixin],
    components: {
        DayGrid,
        DayHours,
        EventBlock
    },
    computed: {
        grid() {
            return fillWeek(this.date);
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../styles/variables';

    .week-table {
        width: 100%;
        table-layout: fixed;
        border-collapse: collapse;

        th {
            font-weight: normal;
        }

        td, th {
            border: 1px solid #f3f3f3;
        }

        td {
            position: relative;
        }
    }

    .hours {
        width: 70px;
    }

    .event {
        position: absolute;
        width: 100%;
        left: 0;
    }

    .day-of-week {
        color: orange;
    }

    .day-date {
        font-size: 20px;
        font-weight: bold;
    }
</style>
