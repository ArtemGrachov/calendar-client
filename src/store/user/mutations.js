import {
    USER_MUTATIONS_SET_TOKENS,
    USER_MUTATIONS_CLEAR,
    USER_MUTATIONS_SET_DATA
} from './mutations-types';
import getInitialState from './state';

export default {
    [USER_MUTATIONS_SET_TOKENS](state, payload) {
        state.token = payload.token;
        state.refreshToken = payload.refreshToken;
    },
    [USER_MUTATIONS_CLEAR](state) {
        Object.assign(state, getInitialState())
    },
    [USER_MUTATIONS_SET_DATA](state, payload) {
        state.user = payload.user;
    }
}
