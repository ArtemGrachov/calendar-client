import { USER_ACTIONS_CLEAR } from '../store/user/action-types';
import { FORM_ACTIONS_SUCCESS } from '../store/form/action-types';
import { WS_EVENT_UPDATED, WS_EVENT_DELETED, WS_USER_INVITED_TO_EVENT, WS_USER_REMOVED_FROM_EVENT, WS_USER_LEAVE_EVENT } from '../config/ws-events';
import { NOTIFICATIONS_ACTIONS_ADD_NOTIFICATION } from '../store/notifications/action-types';
import { EVENTS_ACTIONS_UPSERT_EVENT, EVENTS_ACTIONS_STORE_DELETE_EVENT, EVENTS_ACTIONS_ADD_EVENT, EVENTS_ACTIONS_STORE_REMOVE_USER_FROM_EVENT } from '../store/events/action-types';
import { ALERTS_ACTIONS_CREATE_ALERT } from '../store/alerts/action-types';

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

        this.socket.onerror = () => {
            console.error('WebSocket error');
        }

        this.socket.onmessage = event => {
            this.onMessage(event);
        }

        this.socket.onclose = () => {
            console.warn('Connection closed');
        }
    }

    disconnect() {
        if (this.socket) {
            this.socket.close();
        } else {
            console.warn('Socket connecton was not initialized');
        }
    }

    onMessage(event) {
        const data = JSON.parse(event.data);

        this.store.dispatch(
            'notifications/' + NOTIFICATIONS_ACTIONS_ADD_NOTIFICATION,
            { item: data.notification },
            { root: true }
        );

        this.store.dispatch(
            'alerts/' + ALERTS_ACTIONS_CREATE_ALERT,
            {
                title: data.notification.title,
                description: data.notification.content,
                type: data.notification.type
            },
            { root: true }
        );

        switch (data.type) {
            case WS_EVENT_UPDATED: {
                this.store.dispatch(
                    'events/' + EVENTS_ACTIONS_UPSERT_EVENT,
                    { item: data.event },
                    { root: true }
                );
                break;
            }
            case WS_EVENT_DELETED: {
                this.store.dispatch(
                    'events/' + EVENTS_ACTIONS_STORE_DELETE_EVENT,
                    { id: data.eventId   },
                    { root: true }
                );
                break;
            }
            case WS_USER_INVITED_TO_EVENT: {
                this.store.dispatch(
                    'events/' + EVENTS_ACTIONS_ADD_EVENT,
                    { item: data.event },
                    { root: true }
                );
                break;
            }
            case WS_USER_REMOVED_FROM_EVENT: {
                this.store.dispatch(
                    'events/' + EVENTS_ACTIONS_STORE_DELETE_EVENT,
                    { id: data.eventId   },
                    { root: true }
                );
                break;
            }
            case WS_USER_LEAVE_EVENT: {
                this.store.dispatch(
                    'events/' + EVENTS_ACTIONS_STORE_REMOVE_USER_FROM_EVENT,
                    {
                        eventId: data.eventId,
                        userId: data.userId
                    },
                    { root: true }
                );
                break;
            }
        }
    }
}