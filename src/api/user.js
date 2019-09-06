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
        return this.client.patch(this.path, form);
    }

    async uploadAvatar(form) {
        const data = new FormData();

        data.append('avatar', form.avatar);

        return this.client.post(this.path + 'avatar', data);
    }

    async deleteAvatar() {
        return this.client.delete(this.path + 'avatar');
    }
}
