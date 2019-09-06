import HttpClient from './client';

export default class UserClient extends HttpClient {
    constructor(api, client) {
        super(api, client);
        this.path = this.api + 'user/';
    }

    async getOwnData() {
        return this.client.get(this.path);
    }

    async update(form) {
        const data = new FormData();
        
        for (let key in form) {
            data.append(key, form[key]);
        }

        return this.client.patch(this.path, data);
    }
}
