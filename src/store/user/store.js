import state from './state';
import mutations from './mutations';
import actionFactory from './action-factory';
import getters from './getters';
import { user, auth } from '../../api';

export default {
    actions: actionFactory(user, auth),
    namespaced: true,
    state,
    mutations,
    getters
}