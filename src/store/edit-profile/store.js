import actions from './actions';
import { actionsFactory, mutations, state, getters } from '../form';
import { user } from '../../api';

function submitHandler(payload) {
    if (payload.avatar) {
        return 'uploadAvatar';
    } else if (payload.deleteAvatar) {
        return 'deleteAvatar';
    }
    return 'update';
}

export default {
    namespaced: true,
    state,
    actions: {
        ...actionsFactory(user, submitHandler),
        ...actions
    },
    mutations,
    getters
}
