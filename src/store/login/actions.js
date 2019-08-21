import { FORM_ACTIONS_SUCCESS } from '../form/action-types';
import { USER_ACTIONS_SET_AUTH_TOKENS, USER_ACTIONS_GET_OWN_DATA } from '../user/action-types';

export default {
    [FORM_ACTIONS_SUCCESS](context, payload) {
        context.dispatch('user/' + USER_ACTIONS_SET_AUTH_TOKENS, payload, { root: true });
        context.dispatch('user/' + USER_ACTIONS_GET_OWN_DATA, null, { root: true });
    }
}
