import {
    FORM_ACTIONS_SUCCESS,
    FORM_ACTIONS_FAIL,
    FORM_ACTIONS_DID_SUBMIT
} from '../form/action-types';
import { EVENTS_ACTIONS_UPSERT_EVENT, EVENTS_ACTIONS_EVENT_PROCESSING } from '../events/action-types';
import {
    ALERTS_ACTIONS_SUCCESS,
    ALERTS_ACTIONS_DANGER
} from '../alerts/action-types';
import {
    PROCESSING_PENDING,
    PROCESSING_FAIL
} from '../../config/processing';

export default {
    [FORM_ACTIONS_DID_SUBMIT](context, payload) {
        context.dispatch(
            'events/' + EVENTS_ACTIONS_EVENT_PROCESSING,
            { id: payload.id, processing: PROCESSING_PENDING },
            { root: true }
        );
    },
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
            { description: payload.data.message },
            { root: true }
        );
        context.dispatch(
            'events/' + EVENTS_ACTIONS_EVENT_PROCESSING,
            { id: payload.payload.id, processing: PROCESSING_FAIL },
            { root: true }
        );
    }
}