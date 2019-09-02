import { users } from '../../api';
import {
    mutations,
    actionsFactory,
    getters
} from '../form';
import state from './state';
import actions from './actions';

export default {
    namespaced: true,
    actions: {
        ...actionsFactory(users, () => 'findByEmail'),
        ...actions
    },
    mutations,
    getters,
    state
}
