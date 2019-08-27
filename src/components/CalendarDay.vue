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
            return [this.date]
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
