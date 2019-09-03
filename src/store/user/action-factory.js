import {
    USER_ACTIONS_SET_AUTH_TOKENS,
    USER_ACTIONS_CLEAR,
    USER_ACTIONS_GET_OWN_DATA,
    USER_ACTIONS_GET_STORAGE_TOKENS,
    USER_ACTIONS_SET_DATA
} from './action-types';
import {
    USER_MUTATIONS_SET_TOKENS,
    USER_MUTATIONS_CLEAR,
    USER_MUTATIONS_SET_DATA
} from './mutations-types';

export default function(httpClient) {
    return {
        [USER_ACTIONS_GET_STORAGE_TOKENS](context) {
            const token = localStorage.getItem('token');
            const refreshToken = localStorage.getItem('refreshToken');

            if (token && refreshToken) {
                context.dispatch(
                    USER_ACTIONS_SET_AUTH_TOKENS,
                    {
                        token,
                        refreshToken
                    }
                )
            }
        },
        [USER_ACTIONS_SET_AUTH_TOKENS](context, payload) {
            context.commit(USER_MUTATIONS_SET_TOKENS, payload);
            localStorage.setItem('token', payload.token);
            localStorage.setItem('refreshToken', payload.refreshToken);
            httpClient.setToken(payload.token);
        },
        [USER_ACTIONS_CLEAR](context) {
            context.commit(USER_MUTATIONS_CLEAR);
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
        },
        async [USER_ACTIONS_GET_OWN_DATA](context) {
            try {
                const { data } = await httpClient.getOwnData();
    
                context.commit(USER_MUTATIONS_SET_DATA, data);
            } catch (err) {
                context.dispatch(USER_ACTIONS_CLEAR);
                throw err;
            }
        },
        [USER_ACTIONS_SET_DATA](context, payload) {
            context.commit(USER_MUTATIONS_SET_DATA, payload);
        }
    }
}