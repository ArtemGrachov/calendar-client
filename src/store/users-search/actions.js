import { FORM_ACTIONS_SUCCESS } from '../form/action-types';
import { USERS_SEARCH_MUTATIONS_SET_USER } from './mutations-types';

export default {
    [FORM_ACTIONS_SUCCESS](context, payload) {
        context.commit(USERS_SEARCH_MUTATIONS_SET_USER, payload);
    }
}
