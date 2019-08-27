import moment from 'moment';

export default {
    data() {
        return {
            date: moment().startOf('day'),
            mode: 'week'
        }
    },
    methods: {
        prev() {
            this.date = this.date.clone().subtract(1, this.mode);
        },
        next() {
            this.date = this.date.clone().add(1, this.mode);
        },
        today() {
            this.date = moment().startOf('day');
        },
        setMode(mode) {
            this.mode = mode;
        }
    }
}