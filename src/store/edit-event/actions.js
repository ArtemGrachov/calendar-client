import { FORM_ACTIONS_SUCCESS } from '../form/action-types';
import { EVENTS_ACTIONS_UPSERT_EVENT } from '../events/action-types';
import { ALERTS_ACTIONS_CREATE_ALERT } from '../alerts/action-types';

export default {
    [FORM_ACTIONS_SUCCESS](context, payload) {
        context.dispatch(
            'events/' + EVENTS_ACTIONS_UPSERT_EVENT,
            { item: payload.event },
            { root: true }
        );

        context.dispatch(
            'alerts/' + ALERTS_ACTIONS_CREATE_ALERT,
            {
                item: {
                    title: payload.event.title,
                    description: payload.message,
                    type: 'success'
                }
            },
            { root: true }
        )
    }
}