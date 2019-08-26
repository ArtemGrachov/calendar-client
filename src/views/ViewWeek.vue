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
                    <DayGrid
                        :start="start"
                        :end="end"
                        :stepMin="stepMin"
                        :stepHeightPx="stepHeightPx"
                        :date="grid[i]"
                    ></DayGrid>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import fillWeek from '../utils/fill-week';
import DayGrid from '../components/DayGrid';
import DayHours from '../components/DayHours';

export default {
    components: {
        DayGrid,
        DayHours
    },
    data() {
        return {
            grid: [],
            start: 6,
            end: 22,
            stepMin: 15,
            stepHeightPx: 32,
            date: new Date()
        }
    },
    methods: {
        buildGrid() {
            this.grid = fillWeek(this.date);
        }
    },
    beforeMount() {
        this.buildGrid();
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
        }
    }

    .hours {
        width: 70px;
    }
</style>
