import {
    FORM_ACTIONS_SUBMIT,
    FORM_ACTIONS_SUCCESS
} from './action-types';
import {
    FORM_MUTATIONS_SET_PROCESSING,
    FORM_MUTATIONS_SET_MESSAGE,
    FORM_MUTATIONS_SET_ERRORS
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
            } catch ({ response }) {
                context.commit(
                    FORM_MUTATIONS_SET_PROCESSING,
                    { processing: processing.PROCESSING_FAIL }
                );
                if (response.data) {
                    if (response.data.message) {
                        context.commit(
                            FORM_MUTATIONS_SET_MESSAGE,
                            { message: response.data.message }
                        );
                    }

                    if (response.data.errors) {
                        context.commit(
                            FORM_MUTATIONS_SET_ERRORS,
                            { errors: response.data.errors }
                        )
                    }
                }
            }
        }
    }
}