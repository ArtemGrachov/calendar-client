import actions from './actions';
import { actionsFactory, mutations, state, getters } from '../form';
import { user } from '../../api';

function submitHandler(payload) {
    if (payload.options) {
        if (payload.options.uploadAvatar) {
            return 'uploadAvatar';
        } else if (payload.options.deleteAvatar) {
            return 'deleteAvatar';
        }
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
