export default {
    props: {
        date: {
            validator: value => value.constructor.name === 'Moment'
        }
    },
    data() {
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
            return this.getEventsByRange(this.dateRange(date));
        },
        loadEvents() {
            this.loadEventsByRange(this.gridRange());
        }
    },
    beforeMount() {
        this.loadEvents();
    }
}
