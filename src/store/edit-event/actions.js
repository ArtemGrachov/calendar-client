import {
    FORM_ACTIONS_SUCCESS,
    FORM_ACTIONS_FAIL
} from '../form/action-types';
import { EVENTS_ACTIONS_UPSERT_EVENT } from '../events/action-types';
import {
    ALERTS_ACTIONS_SUCCESS,
    ALERTS_ACTIONS_DANGER
} from '../alerts/action-types';

export default {
    [FORM_ACTIONS_SUCCESS](context, payload) {
        context.dispatch(
            'events/' + EVENTS_ACTIONS_UPSERT_EVENT,
            { item: payload.event },
            { root: true }
        );

        context.dispatch(
            'alerts/' + ALERTS_ACTIONS_SUCCESS,
            {
                title: payload.event.title,
                description: payload.message,
            },
            { root: true }
        );
    },
    [FORM_ACTIONS_FAIL](context, payload) {
        context.dispatch(
            'alerts/' + ALERTS_ACTIONS_DANGER,
            { description: payload.message },
            { root: true }
        );
    }
}