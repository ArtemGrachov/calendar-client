<template>
    <div class="calendar-root">
        <div class="preloader" v-if="pending"></div>
        <CalendarNav
            @prev="prev"
            @next="next"
            @today="today"
            @mode="setMode($event)"
            class="mb-3"
        ></CalendarNav>
        <div class="view-wrap">
            <router-view
                :date="date"
                :events="events"
                :selectionComponent="selectionComponent"
                @loadEvents="loadEvents($event)"
                @setDateAndMode="setDateAndMode($event.date, $event.mode)"
            ></router-view>
        </div>
    </div>
</template>

<script>
import CalendarNav from '../components/CalendarNav';
import { PROCESSING_PENDING } from '../config/processing';
import { EVENTS_ACTIONS_GET_EVENTS } from '../store/events/action-types';
import calendarRootMixin from '../mixins/calendar-root-mixin';
import CalendarSelection from '../components/CalendarSelection';

export default {
    mixins: [calendarRootMixin],
    data() {
        return {
            selectionComponent: CalendarSelection
        }
    },
    components: {
        CalendarNav
    },
    computed: {
        events() {
            return this.$store.getters['events/sorted'];
        },
        pending() {
            return this.$store.state.events.processing === PROCESSING_PENDING;
        }
    },
    watch: {
        mode(value) {
            this.$router.push(value);
        }
    },
    methods: {
        loadEvents({ start, end }) {
            this.$store.dispatch('events/' + EVENTS_ACTIONS_GET_EVENTS, {
                start: start.toJSON(),
                end: end.toJSON()
            });
        }
    },
    created() {
        this.mode = this.$router.currentRoute.name;
    }
}
</script>

<style lang="scss" scoped>
    .preloader {
        position: fixed;
        z-index: 5;
        right: 2em;
        bottom: 2em;
    }
</style>