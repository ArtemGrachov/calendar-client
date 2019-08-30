import { users } from '../../api';
import {
    mutations as formMutations,
    actionsFactory,
    getters
} from '../form';
import mutations from './mutations';
import state from './state';
import actions from './actions';

export default {
    namespaced: true,
    actions: {
        ...actionsFactory(users, () => 'findByEmail'),
        ...actions
    },
    mutations: {
        ...formMutations,
        ...mutations
    },
    getters,
    state
}
