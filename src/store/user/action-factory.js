import {
    USER_ACTIONS_SET_AUTH_TOKENS,
    USER_ACTIONS_CLEAR,
    USER_ACTIONS_GET_OWN_DATA,
    USER_ACTIONS_GET_STORAGE_TOKENS
} from './action-types';
import {
    USER_MUTATIONS_SET_TOKENS,
    USER_MUTATIONS_CLEAR,
    USER_MUTATIONS_SET_DATA
} from './mutations-types';

export default function(httpClient) {
    return {
        [USER_ACTIONS_GET_STORAGE_TOKENS](context) {
            context.dispatch(
                USER_ACTIONS_SET_AUTH_TOKENS,
                {
                    token: localStorage.getItem('token'),
                    refreshToken: localStorage.getItem('refreshToken')
                }
            )
        },
        [USER_ACTIONS_SET_AUTH_TOKENS](context, payload) {
            context.commit(USER_MUTATIONS_SET_TOKENS, payload);
            localStorage.setItem('token', payload.token);
            localStorage.setItem('refreshToken', payload.refreshToken);
            httpClient.setToken(payload.token);
        },
        [USER_ACTIONS_CLEAR](context) {
            context.dispatch(USER_MUTATIONS_CLEAR);
        },
        async [USER_ACTIONS_GET_OWN_DATA](context) {
            const { data } = await httpClient.getOwnData();

            context.commit(USER_MUTATIONS_SET_DATA, data);
        }
    }
}