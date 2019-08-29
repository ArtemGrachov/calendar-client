import HttpClient from './client';

export default class EventsClient extends HttpClient {
    constructor(api, client) {
        super(api, client);
        this.path = this.api + 'events/';
    }

    async getEvents(range) {
        return this.client.get(
            this.path,
            { params: range }
        );
    }

    async createEvent(event) {
        return this.client.post(
            this.path,
            event
        );
    }

    async updateEvent(event) {
        return this.client.patch(
            this.path + `/${event.id}`,
            event
        );
    }

    async deleteEvent(eventId) {
        return this.client.delete(this.path + `/${eventId}`);
    }
}
