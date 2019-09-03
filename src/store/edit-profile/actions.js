import { FORM_ACTIONS_SUCCESS } from '../form/action-types';
import { USER_ACTIONS_SET_DATA } from '../user/action-types';
import { ALERTS_ACTIONS_SUCCESS } from '../alerts/action-types';

export default {
    [FORM_ACTIONS_SUCCESS](context, payload) {
        context.dispatch('user/' + USER_ACTIONS_SET_DATA, payload, { root: true });
        context.dispatch(
            'alerts/' + ALERTS_ACTIONS_SUCCESS,
            { description: payload.message },
            { root: true }
        );
    }
}
