<template>
    <div class="calendar">
        <div class="calendar-header mb-3">
            <div class="calendar-header-date">
                {{ grid[0] | moment('MMMM Do YYYY') }} -
                {{ grid.slice(-1)[0] | moment('MMMM Do YYYY') }}
            </div>
        </div>
        <div class="table-outer">

            <div class="table-wrap">
                <table class="week-table">
                    <thead>
                        <tr>
                            <th class="hours-cell"></th>
                            <th
                                class="week-table-header-cell"
                                v-for="day in 7"
                                :key="day"
                            >
                                <div class="day-date mb-1">
                                    {{grid[day - 1] | moment('DD')}}
                                </div>
                                <div class="day-of-week">
                                    {{grid[day - 1] | moment('dddd')}}
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="week-table-body">
                        <tr>
                            <td class="hours-cell">
                                <DayHours
                                    class="hours"
                                    :start="start"
                                    :end="end"
                                    :stepMin="stepMin"
                                    :stepHeightPx="stepHeightPx"
                                    :date="date"
                                ></DayHours>
                            </td>
                            <td
                                class="week-table-cell"
                                v-for="i in 7"
                                :key="i"
                            >
                                <MouseCatcher
                                    :date="grid[i - 1]"
                                    :selectionController="selectionController"
                                ></MouseCatcher>
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
                                <component
                                    :is="selectionComponent"
                                    v-if="selection && isSelectionInRange(grid[i - 1], selection)"
                                    :style="getEventPos(grid[i - 1], selection)"
                                    :selectionController="selectionController"
                                    :date="grid[i - 1]"
                                    :selection="selection"
                                    :start="start"
                                    :end="end"
                                    @close="closeSelection"
                                >
                                </component>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import fillWeek from '../utils/fill-week';
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
            return fillWeek(this.date);
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../styles/variables';

    .week-table {
        width: 100%;
        min-width: 800px;
        border-collapse: collapse;
        table-layout: fixed;

        &-cell,
        &-header-cell {
            border: 1px solid $lightgrey;

            &:nth-child(2) {
                border-left: none;
            }

            &:last-child {
                border-right: none;
            }
        }

        &-cell {
            position: relative;
        }

        &-header-cell {
            font-weight: normal;
        }
    }

    .hours {
        width: 70px;
        left: 0;
        top: auto;
        position: absolute;
    }

    .hours-cell {
        width: 0;
        vertical-align: top;
    }

    .table-outer {
        position: relative;
    }

    .table-wrap {
        overflow-x: auto;
        margin-left: 70px;
        border-left: 1px solid $lightgrey;
        border-right: 1px solid $lightgrey;
    }

    .event {
        position: absolute;
        width: 100%;
        left: 0;
        z-index: 2;
    }

    .day-of-week {
        color: orange;
    }

    .day-date {
        font-size: 20px;
        font-weight: bold;
    }
</style>
