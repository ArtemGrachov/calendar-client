import actionsFactory from './actions-factory';
import getters from './getters';
import { events } from '../../api';
import { state, mutations } from '../list';

export default {
    namespaced: true,
    state,
    actions: actionsFactory(events),
    mutations,
    getters
}
