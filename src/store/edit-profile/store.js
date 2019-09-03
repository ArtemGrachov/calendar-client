import actions from './actions';
import { actionsFactory, mutations, state, getters } from '../form';
import { user } from '../../api';

export default {
    namespaced: true,
    state,
    actions: {
        ...actionsFactory(user, () => 'update'),
        ...actions
    },
    mutations,
    getters
}
