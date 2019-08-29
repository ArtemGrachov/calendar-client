import actionsFactory from './actions-factory';
import getters from './getters';
import { events } from '../../api';
import { state, mutations, getters as listGetters } from '../list';

export default {
    namespaced: true,
    state,
    actions: actionsFactory(events),
    mutations,
    getters: {
        ...listGetters,
        ...getters
    }
}
