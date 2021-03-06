import {
    FORM_ACTIONS_SUCCESS,
    FORM_ACTIONS_FAIL
} from '../form/action-types';
import { USER_ACTIONS_SET_DATA } from '../user/action-types';
import {
    ALERTS_ACTIONS_SUCCESS,
    ALERTS_ACTIONS_DANGER
} from '../alerts/action-types';

export default {
    [FORM_ACTIONS_SUCCESS](context, payload) {
        context.dispatch('user/' + USER_ACTIONS_SET_DATA, payload, { root: true });
        context.dispatch(
            'alerts/' + ALERTS_ACTIONS_SUCCESS,
            { description: payload.message },
            { root: true }
        );
    },
    [FORM_ACTIONS_FAIL](context, payload) {
        context.dispatch(
            'alerts/' + ALERTS_ACTIONS_DANGER,
            { description: payload.data.message },
            { root: true }
        );
    }
}
