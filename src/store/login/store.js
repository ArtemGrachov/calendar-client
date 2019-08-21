import actions from './actions';
import { actionsFactory, mutations, state } from '../form';
import { auth } from '../../api';

export default {
    namespaced: true,
    state,
    actions: {
        ...actions,
        ...actionsFactory(auth, () => 'login')
    },
    mutations
}
