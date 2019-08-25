import { actionsFactory, mutations, state, getters } from '../form';
import { auth } from '../../api';

export default {
    namespaced: true,
    state,
    actions: {
        ...actionsFactory(auth, () => 'registration')
    },
    mutations,
    getters
}
