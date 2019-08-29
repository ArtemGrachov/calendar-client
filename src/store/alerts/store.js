import actions from './actions';
import { mutations as listMutations } from '../list';
import mutations from './mutations';
import state from './state';

export default {
    namespaced: true,
    actions,
    mutations: {
        ...listMutations,
        ...mutations
    },
    state
}
