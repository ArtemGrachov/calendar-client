import { USER_ACTIONS_CLEAR } from "../store/user/action-types";
import { FORM_ACTIONS_SUCCESS } from "../store/form/action-types";

export default class WebSocketClient {
    path = null;

    store = null;

    socket = null;

    constructor(path, store) {
        this.path = path;
        this.store = store;

        store.subscribeAction(action => {
            switch (action.type) {
                case 'login/' + FORM_ACTIONS_SUCCESS: {
                    this.connect(action.payload.token);
                    break;
                }
                case 'user/' + USER_ACTIONS_CLEAR: {
                    this.disconnect();
                    break;
                }
            }
        })
    }

    connect(token) {
        if (this.socket) {
            this.socket.close();
        }

        this.socket = new WebSocket(`${this.path}?token=${token}`);

        this.socket.onopen = () => {
            console.log('Connection established!');
        }

        this.socket.onerror = () => {
            console.log('Error!');
        }

        this.socket.onmessage = ev => {
            console.log('New message', ev);
        }

        this.socket.onclose = () => {
            console.log('Connection closed');
        }
    }

    disconnect() {
        if (this.socket) {
            this.socket.close();
        } else {
            console.warn('Socket connecton was not initialized');
        }
    }
}