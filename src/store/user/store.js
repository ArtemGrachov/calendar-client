import state from './state';
import mutations from './mutations';
import actionFactory from './action-factory';
import { user } from '../../api';

export default {
    actions: actionFactory(user),
    namespaced: true,
    state,
    mutations
}