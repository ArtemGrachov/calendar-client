<template>
    <div class="modal-backdrop px-1 py-4" @click.self="closeConfirmation">
        <div class="modal">
            <div class="mb-3 d-flex justify-content-between">
                <div class="title px-4 py-3">New event</div>
                <button
                    @click="closeConfirmation"
                    class="button-round button-link button-grey button-small"
                >
                    <i class="material-icons">
                        clear
                    </i>
                </button>
            </div>
            <div class="px-4 py-3">
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
