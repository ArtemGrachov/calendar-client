import moment from 'moment';

export default {
    data() {
        return {
            date: moment().startOf('day')
        }
    },
    methods: {
        prev() {
            this.date = this.date.clone().subtract(1, 'day');
        },
        next() {
            this.date = this.date.clone().add(1, 'day');
        },
        today() {
            this.date = moment().startOf('day');
        },
    }
}