<template>
    <div>
        <div
            class="step"
            :style="{ height }"
            v-for="step in steps"
            :key="step"
        >
            {{stepTime(step) | moment('HH:mm')}}
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import timeTableMixin from '../mixins/time-table-mixin';

export default {
    mixins: [timeTableMixin],
    methods: {
        stepTime(step) {
            const time = moment(this.$props.date)
                .startOf('day')
                .hours(this.$props.start)
                .add((step - 1) * this.$props.stepMin, 'minutes')

            return time;
        }
    }
}
</script>

<style lang="scss" scoped>
    .step {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #a1a1a1;
        font-size: 12px;
    }
</style>