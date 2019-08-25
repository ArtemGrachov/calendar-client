<template>
    <div class="container py-3">
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
                        {{ grid[i * row - 1] }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import fillWeek from '../utils/fill-week';
import fillMonth from '../utils/fill-month';

export default {
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
        }
    }
</style>