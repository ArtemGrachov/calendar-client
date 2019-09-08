export default class HttpClient {
    constructor(api, client) {
        this.api = api;
        this.client = client;
    }

    setToken(token) {
        this
            .client
            .defaults
            .headers
            .common
            .Authorization = `Bearer ${token}`;
    }

    removeToken() {
        delete this
            .client
            .defaults
            .headers
            .common
            .Authorization
    }
}
