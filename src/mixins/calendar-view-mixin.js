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
                .clone();
            const end = this.grid.slice(-1)[0]
                .clone();

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
        loadEvents() {
            this.$emit('loadEvents', this.gridRange());
        }
    },
    beforeMount() {
        this.loadEvents();
    }
}
