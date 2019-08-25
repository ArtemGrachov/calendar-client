<template>
    <table class="week-table">
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
            <tr>
                <td v-for="i in 7" :key="i">
                    {{ grid[i - 1] }}
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import fillWeek from '../utils/fill-week';

export default {
    data() {
        return {
            grid: []
        }
    },
    methods: {
        buildGrid() {
            let date = new Date();
            this.grid = fillWeek(date);
        }
    },
    created() {
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
</style>