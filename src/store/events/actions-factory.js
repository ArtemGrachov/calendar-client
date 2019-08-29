import {
    EVENTS_ACTIONS_GET_EVENTS,
    EVENTS_ACTIONS_UPSERT_EVENT
} from './action-types';
import {
    LIST_MUTATIONS_SET_PROCESSING,
    LIST_MUTATIONS_SET_ITEMS,
    LIST_MUTATIONS_UPSERT_ITEM
} from '../list/mutation-types';
import {
    PROCESSING_PENDING,
    PROCESSING_SUCCESS,
    PROCESSING_FAIL
} from '../../config/processing';

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
                )
            } catch (err) {
                context.commit(
                    LIST_MUTATIONS_SET_PROCESSING,
                    PROCESSING_FAIL
                );
            }
        },
        [EVENTS_ACTIONS_UPSERT_EVENT](context, payload) {
            context.commit(LIST_MUTATIONS_UPSERT_ITEM, payload);
        }
    }
}
