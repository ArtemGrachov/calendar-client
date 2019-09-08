import { APP_MUTATIONS_SET_INITIALIZED } from "./mutation-types";

export default {
    [APP_MUTATIONS_SET_INITIALIZED](state) {
        state.initialized = true;
    }
}
