import { alertLifetime } from '../../config/index';
import {
    ALERTS_ACTIONS_CREATE_ALERT,
    ALERTS_ACITONS_DELETE_ALERT,
    ALERTS_ACTIONS_DANGER,
    ALERTS_ACTIONS_INFO,
    ALERTS_ACTIONS_SUCCESS,
    ALERTS_ACTIONS_WARNING
} from './action-types';
import { ALERTS_MUTATIONS_INCREMENT } from './mutations-types';
import { LIST_MUTATIONS_ADD_ITEM, LIST_MUTATIONS_REMOVE_ITEM } from '../list/mutation-types';

export default {
    [ALERTS_ACTIONS_CREATE_ALERT](context, payload) {
        context.commit(ALERTS_MUTATIONS_INCREMENT);

        payload.id = context.state.counter;
        context.commit(LIST_MUTATIONS_ADD_ITEM, { item: payload });

        setTimeout(() => {
            context.dispatch(
                ALERTS_ACITONS_DELETE_ALERT,
                { id: context.state.counter }
            );
        }, alertLifetime);
    },
    [ALERTS_ACITONS_DELETE_ALERT](context, payload) {
        context.commit(LIST_MUTATIONS_REMOVE_ITEM, payload);
    },
    [ALERTS_ACTIONS_DANGER](context, payload) {
        context.dispatch(
            ALERTS_ACTIONS_CREATE_ALERT,
            {
                type: 'danger',
                title: payload.title || 'Error',
                description: payload.description || ''
            }
        );
    },
    [ALERTS_ACTIONS_INFO](context, payload) {
        context.dispatch(
            ALERTS_ACTIONS_CREATE_ALERT,
            {
                type: 'info',
                title: payload.title || 'Info',
                description: payload.description || ''
            }
        );
    },
    [ALERTS_ACTIONS_SUCCESS](context, payload) {
        context.dispatch(
            ALERTS_ACTIONS_CREATE_ALERT,
            {
                type: 'success',
                title: payload.title || 'Success',
                description: payload.description || ''
            }
        );
    },
    [ALERTS_ACTIONS_WARNING](context, payload) {
        context.dispatch(
            ALERTS_ACTIONS_CREATE_ALERT,
            {
                type: 'warning',
                title: payload.title || 'Warning',
                description: payload.description || ''
            }
        );
    }
}