import sortEvents from '../../utils/sort-events';

export default {
    sorted: state => state.items.sort(sortEvents),
    iAmOwner: (state, getters, rootState) => event =>
        rootState.user.user.id === event.owner
}
