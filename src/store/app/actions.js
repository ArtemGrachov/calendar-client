import { APP_ACTIONS_SET_INITIALIZED } from './action-types';
import { APP_MUTATIONS_SET_INITIALIZED } from './mutation-types';

export default {
    [APP_ACTIONS_SET_INITIALIZED](context) {
        context.commit(APP_MUTATIONS_SET_INITIALIZED);
    }
}