import {
    USER_ACTIONS_SET_AUTH_TOKENS,
    USER_ACTIONS_CLEAR,
    USER_ACTIONS_GET_OWN_DATA,
    USER_ACTIONS_GET_STORAGE_TOKENS,
    USER_ACTIONS_SET_DATA,
    USER_ACTIONS_CLEAR_TOKENS,
    USER_ACTIONS_REFRESH_TOKENS
} from './action-types';
import {
    USER_MUTATIONS_SET_TOKENS,
    USER_MUTATIONS_CLEAR,
    USER_MUTATIONS_SET_DATA,
    USER_MUTATIONS_CLEAR_TOKENS
} from './mutations-types';
import { ALERTS_ACTIONS_DANGER } from '../alerts/action-types';

export default function(userClient, authClient) {
    return {
        [USER_ACTIONS_GET_STORAGE_TOKENS](context) {
            const token = localStorage.getItem('token');
            const refreshToken = localStorage.getItem('refreshToken');

            if (token && refreshToken) {
                userClient.setToken(token);
                context.commit(
                    USER_MUTATIONS_SET_TOKENS,
                    { token, refreshToken }
                );
            }
        },
        [USER_ACTIONS_CLEAR_TOKENS](context) {
            userClient.removeToken();
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            context.commit(USER_MUTATIONS_CLEAR_TOKENS);
        },
        async [USER_ACTIONS_REFRESH_TOKENS](context, payload) {
            try {
                userClient.removeToken();

                const { data } = await authClient.refreshToken(payload.refreshToken);

                context.dispatch(USER_ACTIONS_SET_AUTH_TOKENS, data);
            } catch (err) {
                const description = err.response && err.response.data ?
                    err.response.data.message :
                    err.message;

                context.dispatch(
                    'alerts/' + ALERTS_ACTIONS_DANGER,
                    { description },
                    { root: true }
                );
                context.dispatch(USER_ACTIONS_CLEAR_TOKENS);
            }
        },
        [USER_ACTIONS_SET_AUTH_TOKENS](context, payload) {
            context.commit(USER_MUTATIONS_SET_TOKENS, payload);
            localStorage.setItem('token', payload.token);
            localStorage.setItem('refreshToken', payload.refreshToken);
            userClient.setToken(payload.token);
        },
        [USER_ACTIONS_CLEAR](context) {
            context.commit(USER_MUTATIONS_CLEAR);
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
        },
        async [USER_ACTIONS_GET_OWN_DATA](context) {
            try {
                const { data } = await userClient.getOwnData();
    
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