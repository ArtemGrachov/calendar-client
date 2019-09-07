<template>
    <div class="calendar">
        <div class="calendar-header mb-3">
            <div class="calendar-header-date">
                {{ date | moment('MMMM D, YYYY') }}
            </div>
            <div class="calendar-header-day">
                {{ date | moment('dddd') }}
            </div>
        </div>
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
                    <MouseCatcher
                        :date="date"
                        :selectionController="selectionController"
                    ></MouseCatcher>
                    <CalendarSelection
                        :is="selectionComponent"
                        v-if="selection && isSelectionInRange(date, selection)"
                        :style="getEventPos(date, selection)"
                        :selectionController="selectionController"
                        :date="date"
                        :selection="selection"
                        :start="start"
                        :end="end"
                        @close="closeSelection"
                    >
                    </CalendarSelection>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import DayGrid from './DayGrid';
import DayHours from './DayHours';
import EventBlock from './EventBlock';
import MouseCatcher from './MouseCatcher';
import calendarViewMixin from '../mixins/calendar-view-mixin';
import calendarWithHoursMixin from '../mixins/calendar-view-hours-mixin';
import calendarViewSelectionMixin from '../mixins/calendar-view-selection-mixin';

export default {
    mixins: [
        calendarViewMixin,
        calendarWithHoursMixin,
        calendarViewSelectionMixin
    ],
    components: {
        DayGrid,
        DayHours,
        EventBlock,
        MouseCatcher
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
        z-index: 2;
    }
</style>
