import { FORM_ACTIONS_SUCCESS } from '../form/action-types';
import { EVENTS_ACTIONS_ADD_EVENT } from '../events/action-types';

export default {
    [FORM_ACTIONS_SUCCESS](context, payload) {
        context.dispatch(
            'events/' + EVENTS_ACTIONS_ADD_EVENT,
            { item: payload.event },
            { root: true }
        );
    }
}