<template>
    <div class="calendar">
        <div class="calendar-header mb-3">
            <div class="calendar-header-date">
                {{ grid[0] | moment('YYYY') }}
            </div>
        </div>
        <div class="row">
            <MonthBlock
                class="col-12 col-sm-6 col-md-4 col-lg-3 mb-3"
                v-for="(date, index) in grid"
                :key="index"
                :events="events"
                :date="date"
            ></MonthBlock>
        </div>
    </div>
</template>

<script>
import calendarViewMixin from '../mixins/calendar-view-mixin';
import MonthBlock from './MonthBlock';

export default {
    mixins: [calendarViewMixin],
    components: {
        MonthBlock
    },
    props: {
        date: {
            validator: value => value.constructor.name === 'Moment'
        }
    },
    computed: {
        grid() {
            const date = this.date.clone().startOf('year');
            const result = [];

            for (let i = 0; i < 12; i++) {
                result.push(date.clone().add(i, 'month'))
            }

            return result;
        }
    },
    methods: {
        gridRange() {
            const start = this.date.clone().startOf('year');
            const end = this.date.clone().startOf('year').add(1, 'year').subtract(1, 'milliseconds')

            return {start, end}
        }
    }
}
</script>
