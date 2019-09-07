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
        getMomentPos(date, time) {
            const range = this.dateRange(date);
            const start = date.clone()
                .startOf('day')
                .hours(this.start);

            const posTime = time.isSameOrAfter(range.start) ?
                time :
                range.start;

            const diffM = moment.duration(
                posTime.diff(start)
            ).asMinutes();

            const topPx = diffM * this.minutePx;

            const result = { top: topPx + 'px' };

            return result;
        },
        getEventPos(date, event) {
            const range = this.dateRange(date);
            const start = date.clone()
                .startOf('day')
                .hours(this.start);

            const eventStart = moment(event.start);
            const eventEnd = moment(event.end);

            const posStart = eventStart.isSameOrAfter(range.start) ?
                eventStart :
                range.start;
            const posEnd = eventEnd.isSameOrBefore(range.end) ?
                eventEnd :
                range.end;

            const diffM = moment.duration(
                posStart.diff(start)
            ).asMinutes();

            const lengthM = moment.duration(
                posEnd.diff(posStart)
            ).asMinutes();

            const topPx = diffM * this.minutePx;
            const heightPx = lengthM * this.minutePx;

            const result = {
                top: topPx + 'px',
                height: heightPx + 'px'
            }

            return result;
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
