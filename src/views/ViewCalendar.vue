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
            @loadEvents="loadEvents($event)"
        ></router-view>
    </div>
</template>

<script>
import CalendarNav from '../components/CalendarNav';
import { EVENTS_ACTIONS_GET_EVENTS } from '../store/events/action-types';
import calendarRootMixin from '../mixins/calendar-root-mixin';

export default {
    mixins: [calendarRootMixin],
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
