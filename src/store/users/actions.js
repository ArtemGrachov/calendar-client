import {
    USERS_ACTIONS_UPSERT_USERS,
    USERS_ACTIONS_UPSERT_USER
} from './action-types';
import {
    LIST_MUTATIONS_UPSERT_ITEMS,
    LIST_MUTATIONS_UPSERT_ITEM
} from '../list/mutation-types';

export default {
    [USERS_ACTIONS_UPSERT_USERS](context, payload) {
        context.commit(
            LIST_MUTATIONS_UPSERT_ITEMS,
            payload
        );
    },
    [USERS_ACTIONS_UPSERT_USER](context, payload) {
        context.commit(
            LIST_MUTATIONS_UPSERT_ITEM,
            payload
        );
    },
}
