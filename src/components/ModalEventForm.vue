<template>
    <div class="modal-backdrop" @click.self="closeConfirmation">
        <div class="modal">
            <div class="modal-content d-flex justify-content-between">
                <div class="title">New event</div>
                <button
                    @click="closeConfirmation"
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
import Modal from '../modal';
import ModalConfirmation from './ModalConfirmation';

export default {
    mixins: [modalWindowMixin],
    components: {
        FormEvent
    },
    methods: {
        async closeConfirmation() {
            const confirmation = await Modal.openModal({
                data: {
                    question: 'Are you sure you want to close edit form?'
                },
                component: ModalConfirmation
            });

            if (confirmation) {
                this.close();
            }

        }
    },
    created() {
        this.$options.actionSub = this.$store.subscribeAction((action) => {
            if (action.type === 'editEvent/' + FORM_ACTIONS_SUCCESS) {
                this.close();
            }
        });
    },
    destroyed() {
        this.$options.actionSub();
    }
}
</script>
