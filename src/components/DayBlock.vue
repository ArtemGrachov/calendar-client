<template>
    <div>
        <EventBlock
            class="small"
            v-for="event in events"
            :key="event.id"
            :event="event"
        ></EventBlock>
    </div>
</template>

<script>
import EventBlock from '../components/EventBlock';

export default {
    components: {
        EventBlock
    },
    props: {
        date: {
            validator: value => value.constructor.name === 'Moment'
        }
    },
    computed: {
        strDate() {
            return `${this.date.getDate()}.${this.date.getMonth()}`
        },
        events() {
            if (this.date) {
                const start = new Date(this.date);
                start.getHours(0);
                start.setMinutes(0);
                start.setSeconds(0);
                start.setMilliseconds(0);

                const end = new Date(this.date);
                end.getHours(0);
                end.setMinutes(0);
                end.setSeconds(0);
                end.setMilliseconds(0);
                end.setDate(end.getDate() + 1);
                return this.$store.getters['events/byRange']({ start, end })
            } else {
                return [];
            }
        }
    }
}
</script>