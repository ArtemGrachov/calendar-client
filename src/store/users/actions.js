import { USERS_ACTIONS_UPSERT_USERS } from './action-types';
import { LIST_MUTATIONS_UPSERT_ITEMS } from '../list/mutation-types';

export default {
    [USERS_ACTIONS_UPSERT_USERS](context, payload) {
        context.commit(
            LIST_MUTATIONS_UPSERT_ITEMS,
            payload
        );
    }
}
