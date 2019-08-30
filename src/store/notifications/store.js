import { state, mutations } from '../list';
import { notifications } from '../../api';
import actionsFactory from './actions-factory';

export default {
    namespaced: true,
    state,
    mutations,
    actions: actionsFactory(notifications)
}
