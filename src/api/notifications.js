import HttpClient from './client';

export default class NotificationsClient extends HttpClient {
    constructor(api, client) {
        super(api, client);
        this.path = this.api + 'notifications';
    }

    async getNotifications() {
        return this.client.get(this.path);
    }

    async deleteNotification(notificationId) {
        return this.client.delete(this.path + `/${notificationId}`);
    }
}
