<template>
    <table class="week-table">
        <thead>
            <tr>
                <th class="hours"></th>
                <th>
                    Monday
                    {{grid[0] | moment('DD.MM')}}
                </th>
                <th>
                    Tuesday
                    {{grid[1] | moment('DD.MM')}}
                </th>
                <th>
                    Wednesday
                    {{grid[2] | moment('DD.MM')}}
                </th>
                <th>
                    Thursday
                    {{grid[3] | moment('DD.MM')}}
                </th>
                <th>
                    Friday
                    {{grid[4] | moment('DD.MM')}}
                </th>
                <th>
                    Saturday
                    {{grid[5] | moment('DD.MM')}}
                </th>
                <th>
                    Sunday
                    {{grid[6] | moment('DD.MM')}}
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
    .week-table {
        width: 100%;
        table-layout: fixed;
        border-collapse: collapse;

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
</style>
