import HttpClient from './client';

export default class AuthClient extends HttpClient {
    constructor(api, client) {
        super(api, client);
        this.path = this.api + 'auth/';
    }

    async login(payload) {
        return this.client.post(this.path + 'login', payload);
    }

    async registration(payload) {
        return this.client.post(this.path + 'registration', payload);
    }

    async changePassword(payload) {
        return this.client.patch(this.path + 'password', payload);
    }

    async refreshToken(refreshToken) {
        return this.client.post(
            this.path + 'refresh-token',
            { refreshToken }
        );
    }
}
