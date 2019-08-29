import {
    FORM_ACTIONS_SUBMIT,
    FORM_ACTIONS_SUCCESS,
    FORM_ACTIONS_CLEAR,
    FORM_ACTIONS_FAIL
} from './action-types';
import {
    FORM_MUTATIONS_SET_PROCESSING,
    FORM_MUTATIONS_SET_MESSAGE,
    FORM_MUTATIONS_SET_ERRORS,
    FORM_MUTATIONS_CLEAR
} from './mutation-types';
import { processing } from '../../config';

export default function(httpClient, methodSelector) {
    return {
        async [FORM_ACTIONS_SUBMIT](context, payload) {
            try {
                context.commit(
                    FORM_MUTATIONS_SET_PROCESSING,
                    { processing: processing.PROCESSING_PENDING }
                );

                const method = methodSelector(payload);
                const { data } = await httpClient[method](payload);

                context.commit(
                    FORM_MUTATIONS_SET_PROCESSING,
                    { processing: processing.PROCESSING_SUCCESS }
                );

                if (data.message) {
                    context.commit(
                        FORM_MUTATIONS_SET_MESSAGE,
                        { message: data.message }
                    );
                }

                context.dispatch(
                    FORM_ACTIONS_SUCCESS,
                    data
                );
            } catch (error) {
                const response = error.response;
                const data = response && response.data ? response.data : null;

                context.commit(
                    FORM_MUTATIONS_SET_PROCESSING,
                    { processing: processing.PROCESSING_FAIL }
                );
                if (data) {
                    if (data.message) {
                        context.commit(
                            FORM_MUTATIONS_SET_MESSAGE,
                            { message: data.message }
                        );
                    }

                    if (data.data) {
                        context.commit(
                            FORM_MUTATIONS_SET_ERRORS,
                            { errors: data.data }
                        )
                    }
                }

                context.dispatch(FORM_ACTIONS_FAIL, data);

                throw error;
            }
        },
        [FORM_ACTIONS_CLEAR](context) {
            context.commit(FORM_MUTATIONS_CLEAR);
        },
        [FORM_ACTIONS_SUCCESS]() { },
        [FORM_ACTIONS_FAIL]() { }
    }
}