import { alertLifetime } from '../../config/index';
import {
    ALERTS_ACTIONS_CREATE_ALERT,
    ALERTS_ACITONS_DELETE_ALERT
} from './action-types';
import { ALERTS_MUTATIONS_INCREMENT } from './mutations-types';
import { LIST_MUTATIONS_ADD_ITEM, LIST_MUTATIONS_REMOVE_ITEM } from '../list/mutation-types';

export default {
    [ALERTS_ACTIONS_CREATE_ALERT](context, payload) {
        context.commit(ALERTS_MUTATIONS_INCREMENT);

        payload.item.id = context.state.counter;
        context.commit(LIST_MUTATIONS_ADD_ITEM, payload);

        setTimeout(() => {
            context.dispatch(
                ALERTS_ACITONS_DELETE_ALERT,
                { id: context.state.counter }
            );
        }, alertLifetime);
    },
    [ALERTS_ACITONS_DELETE_ALERT](context, payload) {
        context.commit(LIST_MUTATIONS_REMOVE_ITEM, payload);
    }
}