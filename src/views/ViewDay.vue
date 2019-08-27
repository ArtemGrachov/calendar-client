<template>
    <table class="day-table">
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
            <td>
                <EventBlock
                    class="event"
                    :style="getEventPos(date, event)"
                    v-for="event in getDateEvents(date)"
                    :key="event.id"
                    :event="event"
                ></EventBlock>
                <DayGrid
                    :start="start"
                    :end="end"
                    :stepMin="stepMin"
                    :stepHeightPx="stepHeightPx"
                    :date="date"
                ></DayGrid>
            </td>
        </tr>
    </table>
</template>

<script>
import moment from 'moment';
import fillWeek from '../utils/fill-week';
import DayGrid from '../components/DayGrid';
import DayHours from '../components/DayHours';
import EventBlock from '../components/EventBlock';
import { EVENTS_ACTIONS_GET_EVENTS } from '../store/events/action-types';
import calendarViewMixin from '../mixins/calendar-view-mixin';
import calendarWithHoursMixin from '../mixins/calendar-view-hours-mixin';

export default {
    mixins: [calendarViewMixin, calendarWithHoursMixin],
    components: {
        DayGrid,
        DayHours,
        EventBlock
    },
    props: {
        date: {
            validator: value => value.constructor.name === 'Moment'
        }
    },
    computed: {
        grid() {
            return [this.date]
        }
    },
    methods: {
        getEventsByRange(range) {
            return this
                .$store
                .getters['events/byRange'](range);
        },
        loadEventsByRange(range) {
            const { start, end } = range;
            this.$store.dispatch('events/' + EVENTS_ACTIONS_GET_EVENTS, {
                start: start.toJSON(),
                end: end.toJSON()
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    .day-table {
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
