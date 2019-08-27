import moment from 'moment';

export default {
    data() {
        return {
            start: 6,
            end: 22,
            stepMin: 15,
            stepHeightPx: 32,
        }
    },
    computed: {
        minutePx() {
            return this.stepHeightPx / this.stepMin;
        }
    },
    methods: {
        getEventPos(date, event) {
            const start = date.clone()
                .startOf('day')
                .hours(this.start);

            const eventStart = moment(event.start);
            const eventEnd = moment(event.end);

            const diffM = moment.duration(
                eventStart.diff(start)
            ).asMinutes();

            const lengthM = moment.duration(
                eventEnd.diff(eventStart)
            ).asMinutes();

            const topPx = diffM * this.minutePx;
            const heightPx = lengthM * this.minutePx;

            return {
                top: topPx + 'px',
                height: heightPx + 'px'
            }
        },
        dateRange(date) {
            const start = date
                .clone()
                .startOf('day')
                .hours(this.start);
            const end = date
                .clone()
                .startOf('day')
                .hours(this.end);
            return { start, end };
        },
        gridRange() {
            const start = this.grid[0]
                .clone()
                .startOf('day')
                .hours(this.start);
            const end = this.grid.slice(-1)[0]
                .clone()
                .startOf('day')
                .hours(this.end);

            return { start, end }
        }
    }
}
