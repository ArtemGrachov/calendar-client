import { events } from '../../api';
import { actionsFactory, mutations, state, getters } from '../form';
import actions from './actions';

export default {
    namespaced: true,
    state,
    actions: {
        ...actionsFactory(events, payload => payload.id ? 'updateEvent' : 'createEvent'),
        ...actions
    },
    mutations,
    getters
}
