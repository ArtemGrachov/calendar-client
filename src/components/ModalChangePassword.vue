<template>
    <div class="modal-backdrop px-1 py-4" @click.self="close">
        <div class="modal">
            <div class="text-right">
                <button
                    @click="close"
                    class="button-round button-link button-grey button-small"
                >
                    <i class="material-icons">
                        clear
                    </i>
                </button>
            </div>
            <div class="px-4 py-3">
                <FormChangePassword></FormChangePassword>
            </div>
        </div>
    </div>
</template>

<script>
import FormChangePassword from './FormChangePassword';
import modalWindowMixin from '../mixins/modal-window-mixin';
import { FORM_ACTIONS_SUCCESS } from '../store/form/action-types';

export default {
    mixins: [modalWindowMixin],
    components: {
        FormChangePassword
    },
    created() {
        this.$options.actionSub = this.$store.subscribeAction((action) => {
            if (action.type === 'changePassword/' + FORM_ACTIONS_SUCCESS) {
                this.close();
            }
        });
    },
    destroyed() {
        this.$options.actionSub();
    }
}
</script>
