<template>
    <table class="week-table">
        <thead>
            <tr>
                <th class="hours"></th>
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
                        :date="grid[i + 1]"
                    ></DayGrid>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import moment from 'moment';
import fillWeek from '../utils/fill-week';
import DayGrid from '../components/DayGrid';
import DayHours from '../components/DayHours';
import EventBlock from '../components/EventBlock';
import { EVENTS_ACTIONS_GET_EVENTS } from '../store/events/action-types';

export default {
    components: {
        DayGrid,
        DayHours,
        EventBlock
    },
    data() {
        return {
            grid: [],
            start: 6,
            end: 22,
            stepMin: 15,
            stepHeightPx: 32,
            date: moment()
        }
    },
    computed: {
        minutePx() {
            return this.stepHeightPx / this.stepMin;
        }
    },
    methods: {
        buildGrid() {
            this.grid = fillWeek(this.date);
        },
        getDateEvents(date) {
            const start = date
                .clone()
                .startOf('day')
                .hours(this.start);
            const end = date
                .clone()
                .startOf('day')
                .hours(this.end);
            return this.$store.getters['events/byRange']({
                start, end
            });
        },
        getEventPos(date, event) {
            const start = date.clone()
                .startOf('day')
                .hours(this.start);

            const eventStart = moment(event.start);
            const eventEnd = moment(event.end);

            const diffM = moment.duration(
                eventStart.diff(start)
            ).asMinutes();

            const lengthM = moment.duration(
                eventEnd.diff(eventStart)
            ).asMinutes();

            const topPx = diffM * this.minutePx;
            const heightPx = lengthM * this.minutePx;

            return {
                top: topPx + 'px',
                height: heightPx + 'px'
            }
        },
        loadEvents() {
            const start = this.grid[0]
                .clone()
                .startOf('day')
                .hours(this.start);
            const end = this.grid.slice(-1)[0]
                .clone()
                .startOf('day')
                .hours(this.end);

            this.$store.dispatch('events/' + EVENTS_ACTIONS_GET_EVENTS, {
                start: start.toJSON(),
                end: end.toJSON()
            });
        }
    },
    beforeMount() {
        this.buildGrid();
        this.loadEvents();
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
            height: 150px;
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
