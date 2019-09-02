import { FORM_ACTIONS_SUCCESS } from '../form/action-types';
import { USERS_ACTIONS_UPSERT_USER } from '../users/action-types';

export default {
    [FORM_ACTIONS_SUCCESS](context, payload) {
        context.dispatch(
            'users/' + USERS_ACTIONS_UPSERT_USER,
            { item: payload.user },
            { root: true }
        )
    }
}
