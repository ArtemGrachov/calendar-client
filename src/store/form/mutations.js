import { PROCESSING_INIT } from '../../config/processing';
import {
    FORM_MUTATIONS_CLEAR,
    FORM_MUTATIONS_SET_MESSAGE,
    FORM_MUTATIONS_SET_ERRORS,
    FORM_MUTATIONS_SET_PROCESSING
} from './mutation-types';

export default {
    [FORM_MUTATIONS_CLEAR](state) {
        state.errors = [];
        state.message = [];
        state.processing = PROCESSING_INIT;
    },
    [FORM_MUTATIONS_SET_ERRORS](state, payload) {
        state.errors = payload.errors;
    },
    [FORM_MUTATIONS_SET_MESSAGE](state, payload) {
        state.message = payload.message;
    },
    [FORM_MUTATIONS_SET_PROCESSING](state, payload) {
        state.processing = payload.processing;
    }
}
