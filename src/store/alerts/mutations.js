import { ALERTS_MUTATIONS_INCREMENT } from "./mutations-types";

export default {
    [ALERTS_MUTATIONS_INCREMENT](state) {
        state.counter++;
    }
}
