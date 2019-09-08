
import {
    USER_ACTIONS_CLEAR_TOKENS,
    USER_ACTIONS_REFRESH_TOKENS
} from './store/user/action-types';

export default class AuthInterceptor {
    constructor(httpClient, store) {
        httpClient.interceptors.response.use(
            null,
            async error => {
                try {
                    if (
                        !error.config ||
                        !error.response ||
                        error.response.status !== 401
                    ) {
                        throw error;
                    }

                    const url = error.config.url;

                    if (url.indexOf('auth') !== -1) {
                        throw error;
                    }

                    const user = store.state.user;

                    if (user.token && user.refreshToken) {
                        await store.dispatch(
                            'user/' + USER_ACTIONS_REFRESH_TOKENS,
                            { refreshToken: user.refreshToken }
                        );

                        if (user.token && user.refreshToken) {
                            error.config.headers.Authorization = `Bearer ${user.token}`;
                            return httpClient.request(error.config);
                        } 
                    }

                    throw error;
                } catch (err) {
                    if (err.response.status === 401) {
                        store.dispatch('user/' + USER_ACTIONS_CLEAR_TOKENS);
                    }
                    throw err;
                }
            }
        )
    }
}
