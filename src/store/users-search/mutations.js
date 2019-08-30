import {
    USERS_SEARCH_MUTATIONS_SET_USER,
    USERS_SEARCH_MUTATIONS_CLEAR_USER
} from './mutations-types';

export default {
    [USERS_SEARCH_MUTATIONS_SET_USER](state, payload) {
        state.user = payload.user;
    },
    [USERS_SEARCH_MUTATIONS_CLEAR_USER](state) {
        state.user = null;
    }
}
