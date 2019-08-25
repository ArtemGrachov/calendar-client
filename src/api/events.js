import HttpClient from './client';

export default class EventsClient extends HttpClient {
    constructor(api, client) {
        super(api, client);
        this.path = this.api + 'events/';
    }

    async getEvents(start, end) {
        return this.client.get(
            this.path,
            { params: { start, end } }
        );
    }
}
