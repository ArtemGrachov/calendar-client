import { HttpClient } from './client';

export class UserClient extends HttpClient {
    constructor(api, client) {
        super(api, client);
        this.path = this.api + 'user/';
    }

    async getOwnData() {
        return this.client.get(this.path);
    }
}
