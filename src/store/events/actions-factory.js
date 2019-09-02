import {
    EVENTS_ACTIONS_GET_EVENTS,
    EVENTS_ACTIONS_UPSERT_EVENT,
    EVENTS_ACTIONS_DELETE_EVENT,
    EVENTS_ACTIONS_LEAVE_EVENT,
    EVENTS_ACTIONS_INVITE_USER_TO_EVENT,
    EVENTS_ACTIONS_REMOVE_USER_FROM_EVENT
} from './action-types';
import {
    LIST_MUTATIONS_SET_PROCESSING,
    LIST_MUTATIONS_SET_ITEMS,
    LIST_MUTATIONS_UPSERT_ITEM,
    LIST_MUTATIONS_SET_ITEM_PROCESSING,
    LIST_MUTATIONS_REMOVE_ITEM,
    LIST_MUTATIONS_UPDATE_ITEM
} from '../list/mutation-types';
import {
    PROCESSING_PENDING,
    PROCESSING_SUCCESS,
    PROCESSING_FAIL
} from '../../config/processing';
import {
    ALERTS_ACTIONS_SUCCESS,
    ALERTS_ACTIONS_DANGER
} from '../alerts/action-types';
import { USERS_ACTIONS_UPSERT_USERS } from '../users/action-types';

export default function (httpClient) {
    return {
        async [EVENTS_ACTIONS_GET_EVENTS](context, payload) {
            try {
                context.commit(
                    LIST_MUTATIONS_SET_PROCESSING,
                    PROCESSING_PENDING
                );

                const { data } = await httpClient.getEvents(payload);

                context.commit(
                    LIST_MUTATIONS_SET_PROCESSING,
                    PROCESSING_SUCCESS
                );
                context.commit(
                    LIST_MUTATIONS_SET_ITEMS,
                    { items: data.events }
                );
                context.dispatch(
                    'users/' + USERS_ACTIONS_UPSERT_USERS,
                    { items: data.users },
                    { root: true }
                );
            } catch (err) {
                context.commit(
                    LIST_MUTATIONS_SET_PROCESSING,
                    PROCESSING_FAIL
                );

                context.dispatch(
                    'alerts/' + ALERTS_ACTIONS_DANGER,
                    { description: err.message },
                    { root: true }
                );
            }
        },
        [EVENTS_ACTIONS_UPSERT_EVENT](context, payload) {
            context.commit(LIST_MUTATIONS_UPSERT_ITEM, payload);
        },
        async [EVENTS_ACTIONS_DELETE_EVENT](context, payload) {
            try {
                context.commit(
                    LIST_MUTATIONS_SET_ITEM_PROCESSING,
                    {
                        id: payload.id,
                        processing: PROCESSING_PENDING
                    }
                );

                const { data } = await httpClient.deleteEvent(payload.id);

                context.commit(LIST_MUTATIONS_REMOVE_ITEM, payload);

                context.dispatch(
                    'alerts/' + ALERTS_ACTIONS_SUCCESS,
                    { description: data.message },
                    { root: true }
                );
            } catch (err) {
                context.commit(
                    LIST_MUTATIONS_SET_ITEM_PROCESSING,
                    {
                        id: payload.id,
                        processing: PROCESSING_FAIL
                    }
                );

                context.dispatch(
                    'alerts/' + ALERTS_ACTIONS_DANGER,
                    { description: err.message },
                    { root: true }
                );
            }
        },
        async [EVENTS_ACTIONS_LEAVE_EVENT](context, payload) {
            try {
                context.commit(
                    LIST_MUTATIONS_SET_ITEM_PROCESSING,
                    {
                        id: payload.id,
                        processing: PROCESSING_PENDING
                    }
                );

                await httpClient.leaveEvent(payload.id);

                context.commit(LIST_MUTATIONS_REMOVE_ITEM, payload);

                context.dispatch(
                    'alerts/' + ALERTS_ACTIONS_SUCCESS,
                    { description: payload.message },
                    { root: true }
                );
            } catch(err) {
                context.commit(
                    LIST_MUTATIONS_SET_ITEM_PROCESSING,
                    {
                        id: payload.id,
                        processing: PROCESSING_FAIL
                    }
                );

                context.dispatch(
                    'alerts/' + ALERTS_ACTIONS_DANGER,
                    { description: err.message },
                    { root: true }
                );
            }
        },
        async [EVENTS_ACTIONS_INVITE_USER_TO_EVENT](context, payload) {
            try {
                context.commit(
                    LIST_MUTATIONS_SET_ITEM_PROCESSING,
                    {
                        id: payload.id,
                        processing: PROCESSING_PENDING
                    }
                );

                const { data } = await httpClient.inviteUser(
                    payload.eventId,
                    payload.userId
                );

                context.commit(
                    LIST_MUTATIONS_UPDATE_ITEM,
                    {
                        id: data.eventId,
                        update: function(event) {
                            return {
                                ...event,
                                users: [...event.users, data.userId]
                            }
                        }
                    }
                );

                context.commit(
                    LIST_MUTATIONS_SET_ITEM_PROCESSING,
                    {
                        id: payload.id,
                        processing: PROCESSING_SUCCESS
                    }
                );
            } catch (err) {
                context.commit(
                    LIST_MUTATIONS_SET_ITEM_PROCESSING,
                    {
                        id: payload.id,
                        processing: PROCESSING_FAIL
                    }
                );

                context.dispatch(
                    'alerts/' + ALERTS_ACTIONS_DANGER,
                    { description: err.message },
                    { root: true }
                );
            }
        },
        async [EVENTS_ACTIONS_REMOVE_USER_FROM_EVENT](context, payload) {
            try {
                context.commit(
                    LIST_MUTATIONS_SET_ITEM_PROCESSING,
                    {
                        id: payload.id,
                        processing: PROCESSING_PENDING
                    }
                );

                const { data } = await httpClient.removeUser(
                    payload.eventId,
                    payload.userId
                );

                context.commit(
                    LIST_MUTATIONS_UPDATE_ITEM,
                    {
                        id: data.eventId,
                        update: function(event) {
                            return {
                                ...event,
                                users: event
                                    .users
                                    .filter(userId => userId !== data.userId)
                            }
                        }
                    }
                );

                context.commit(
                    LIST_MUTATIONS_SET_ITEM_PROCESSING,
                    {
                        id: payload.id,
                        processing: PROCESSING_SUCCESS
                    }
                );
            } catch (err) {
                context.commit(
                    LIST_MUTATIONS_SET_ITEM_PROCESSING,
                    {
                        id: payload.id,
                        processing: PROCESSING_FAIL
                    }
                );

                context.dispatch(
                    'alerts/' + ALERTS_ACTIONS_DANGER,
                    { description: err.message },
                    { root: true }
                );
            }
        }
    }
}
