import {
    NOTIFICATIONS_ACTIONS_GET_NOTIFICATIONS,
    NOTIFICATIONS_ACTIONS_DELETE_NOTIFICATION
} from './action-types';
import {
    LIST_MUTATIONS_SET_ITEMS,
    LIST_MUTATIONS_SET_PROCESSING,
    LIST_MUTATIONS_REMOVE_ITEM,
    LIST_MUTATIONS_SET_ITEM_PROCESSING
} from '../list/mutation-types';
import {
    ALERTS_ACTIONS_DANGER
} from '../alerts/action-types';
import {
    PROCESSING_PENDING,
    PROCESSING_SUCCESS,
    PROCESSING_FAIL
} from '../../config/processing';

export default function(httpClient) {
    return {
        async [NOTIFICATIONS_ACTIONS_GET_NOTIFICATIONS](context, payload) {
            try {
                context.commit(LIST_MUTATIONS_SET_PROCESSING, PROCESSING_PENDING);
    
                const { data } = await httpClient.getNotifications();
    
                context.commit(LIST_MUTATIONS_SET_PROCESSING, PROCESSING_SUCCESS);
                context.commit(LIST_MUTATIONS_SET_ITEMS, { items: data.notifications });
            } catch (err) {
                context.commit(LIST_MUTATIONS_SET_PROCESSING, PROCESSING_FAIL);
                context.dispatch(
                    'alerts/' + ALERTS_ACTIONS_DANGER,
                    { description: err.message },
                    { root: true }
                );
            }
        },
        async [NOTIFICATIONS_ACTIONS_DELETE_NOTIFICATION](context, payload) {
            try {
                context.commit(
                    LIST_MUTATIONS_SET_ITEM_PROCESSING,
                    {
                        id: payload.id,
                        processing: PROCESSING_PENDING
                    }
                );

                await httpClient.deleteNotification(payload.id);

                context.commit(LIST_MUTATIONS_REMOVE_ITEM, payload);
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
                    { description: payload.message },
                    { root: true }
                );
            }
        }
    }
}
