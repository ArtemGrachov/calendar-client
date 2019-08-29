import { actionsFactory, mutations, state, getters } from '../form';
import { events } from '../../api';

export default {
    namespaced: true,
    state,
    actions: {
        ...actionsFactory(events, () => 'createEvent')
    },
    mutations,
    getters
}
