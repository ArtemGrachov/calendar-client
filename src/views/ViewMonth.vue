<template>
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
                    <DayBlock :date="grid[i - 1 + (row - 1) * 7]"></DayBlock>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import fillMonth from '../utils/fill-month';
import { EVENTS_ACTIONS_GET_EVENTS } from '../store/events/action-types';

import DayBlock from '../components/DayBlock';

export default {
    components: {
        DayBlock
    },
    data() {
        return {
            grid: []
        }
    },
    methods: {
        buildGrid() {
            let date = new Date();
            this.grid = fillMonth(date);
        }
    },
    created() {
        this.buildGrid();

        this.$store.dispatch(
            'events/' + EVENTS_ACTIONS_GET_EVENTS,
            {
                start: '2019-08-01',
                end: '2019-08-31'
            }
        );
    },
    computed: {
        rows() {
            return this.grid.length / 7;
        }
    }
}
</script>

<style lang="scss" scoped>
    .month-table {
        width: 100%;
        table-layout: fixed;
        border-collapse: collapse;

        td, th {
            border: 1px solid #f3f3f3;
        }

        td {
            height: 150px;
            vertical-align: top;
        }
    }
</style>