import moment from 'moment';

export default {
    props: {
        date: {
            validator: value => value.constructor.name === 'Moment'
        },
        events: Array
    },
    watch: {
        grid() {
            this.loadEvents();
        }
    },
    methods: {
        dateRange(date) {
            const start = date
                .startOf('day')
                .clone();
            const end = start
                .clone()
                .add(1, 'days');
            return { start, end };
        },
        gridRange() {
            const start = this.grid[0]
                .startOf('day')
                .clone();
            const end = this.grid.slice(-1)[0]
                .clone()
                .hours(23)
                .minutes(59)
                .seconds(59)
                .milliseconds(999);

            return { start, end }
        },
        getDateEvents(date) {
            const range = this.dateRange(date);
            return this
                .events
                .filter(
                    (event) => {
                        const start = moment(event.start);
                        const end = moment(event.end);

                        return start.isBefore(range.end) && end.isAfter(range.start);
                    })
        },
        isDateInRange(date, range) {
            return range.start.isBefore(date) && range.end.isAfter(date);
        },
        isSelectionInRange(date, selection) {
            const { start, end } = this.dateRange(date);

            return selection.start.isBefore(end) && selection.end.isAfter(start);
        },
        loadEvents() {
            this.$emit('loadEvents', this.gridRange());
        }
    },
    beforeMount() {
        this.loadEvents();
    }
}
