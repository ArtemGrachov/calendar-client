<template>
    <div>
        <CalendarNav
            @prev="prev"
            @next="next"
            @today="today"
            @mode="setMode($event)"
            class="mb-3"
        ></CalendarNav>
        <router-view
            :date="date"
            :events="events"
            :selectionComponent="selectionComponent"
            @loadEvents="loadEvents($event)"
            @setDateAndMode="setDateAndMode($event.date, $event.mode)"
        ></router-view>
    </div>
</template>

<script>
import CalendarNav from '../components/CalendarNav';
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
            return this.$store.state.events.items;
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
    }
}
</script>
