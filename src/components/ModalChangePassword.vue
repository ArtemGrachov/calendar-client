<template>
    <div class="modal-backdrop" @click.self="close">
        <div class="modal">
            <div class="modal-content text-right">
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
                <ChangePasswordForm></ChangePasswordForm>
            </div>
        </div>
    </div>
</template>

<script>
import ChangePasswordForm from './ChangePasswordForm';
import modalWindowMixin from '../mixins/modal-window-mixin';
import { FORM_ACTIONS_SUCCESS } from '../store/form/action-types';

export default {
    mixins: [modalWindowMixin],
    components: {
        ChangePasswordForm
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
