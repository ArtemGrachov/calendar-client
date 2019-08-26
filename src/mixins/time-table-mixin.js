import moment from 'moment';

export default {
    props: {
        start: Number,
        end: Number,
        date: Date,
        stepMin: Number,
        stepHeightPx: Number
    },
    computed: {
        steps() {
            const startDate = moment(this.$props.date)
                .startOf('day')
                .hours(this.$props.start);
            const endDate = moment(startDate).hour(this.$props.end);

            const minutesDiff = moment
                    .duration(endDate.diff(startDate))
                    .asMinutes();

            return Math.ceil(minutesDiff / this.$props.stepMin);
        },
        height() {
            return this.$props.stepHeightPx + 'px';
        }
    }

}