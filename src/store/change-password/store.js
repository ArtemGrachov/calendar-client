import actions from './actions';
import { actionsFactory, mutations, state, getters } from '../form';
import { auth } from '../../api';

export default {
    namespaced: true,
    state,
    actions: {
        ...actionsFactory(auth, () => 'changePassword'),
        ...actions
    },
    mutations,
    getters
}
