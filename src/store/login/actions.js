import { FORM_ACTIONS_SUCCESS } from '../form/action-types';
import { USER_MUTATIONS_SET_TOKENS } from '../user/mutations-types';

export  default {
    [FORM_ACTIONS_SUCCESS](context, payload) {
        context.commit('user/' + USER_MUTATIONS_SET_TOKENS, payload, { root: true });
    }
}
