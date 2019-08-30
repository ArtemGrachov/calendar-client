import moment from 'moment';

export default {
    byRange: state => range => state.items.filter(
        (event) => {
            const start = moment(event.start);
            const end = moment(event.end);

            return start.isBefore(range.end) && end.isAfter(range.start);
        }
    ),
    iAmOwner: (state, getters, rootState) => event =>
        rootState.user.user.id === event.owner
}
