<template>
    <div>
        <h1>{{date}}</h1>
        <CalendarNav
            @prev="prev"
            @next="next"
            @today="today"
        ></CalendarNav>
        <router-view :date="date"></router-view>
    </div>
</template>

<script>
import moment from 'moment';
import CalendarNav from '../components/CalendarNav';

export default {
    components: {
        CalendarNav
    },
    data() {
        return {
            date: moment().startOf('day')
        }
    },
    methods: {
        prev() {
            this.date = this.date.clone().subtract(1, 'day');
        },
        next() {
            this.date = this.date.clone().add(1, 'day');
        },
        today() {
            this.date = moment().startOf('day');
        }
    }
}
</script>
