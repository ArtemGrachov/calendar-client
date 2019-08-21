import {
    USER_MUTATIONS_SET_TOKENS,
    USER_MUTATIONS_CLEAR
} from './mutations-types';
import getInitialState from './state';

export default {
    [USER_MUTATIONS_SET_TOKENS](state, payload) {
        state.token = payload.token;
        state.refreshToken = payload.refreshToken;
    },
    // eslint-disable-next-line no-unused-vars
    [USER_MUTATIONS_CLEAR](state) {
        state = getInitialState();
    }
}
