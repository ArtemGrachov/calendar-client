import HttpClient from './client';

export default class UsersClient extends HttpClient {
    constructor(api, client) {
        super(api, client);
        this.path = this.api + 'users/';
    }

    async findByEmail({ email }) {
        return this.client.get(
            this.path + 'search/',
            { params: { email }}
        )
    }
}
