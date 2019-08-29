<template>
    <div class="modal-backdrop" @click.self="close">
        <div class="modal">
            <div class="modal-content d-flex justify-content-between">
                <div class="title">New event</div>
                <button
                    @click="close"
                    class="button-round"
                >
                    <i class="material-icons">
                        clear
                    </i>
                </button>
            </div>
            <div class="modal-content">
                <FormEvent
                    :event="data"
                ></FormEvent>
            </div>
        </div>
    </div>
</template>

<script>
import FormEvent from './FormEvent';
import modalWindowMixin from '../mixins/modal-window-mixin';
import { FORM_ACTIONS_SUCCESS } from '../store/form/action-types';

export default {
    mixins: [modalWindowMixin],
    components: {
        FormEvent
    },
    created() {
        this.$options.actionSub = this.$store.subscribeAction((action) => {
            if (action.type + 'editEvent/' + FORM_ACTIONS_SUCCESS) {
                this.close();
            }
        });
    },
    destroyed() {
        this.$options.actionSub();
    }
}
</script>
