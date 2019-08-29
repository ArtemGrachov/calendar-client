<template>
    <div class="modal-backdrop" @click.self="close">
        <div class="modal">
            <div class="modal-content mb-3 d-flex justify-content-between">
                <div class="title">Create event</div>
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
                <FormEvent></FormEvent>
            </div>
        </div>
    </div>
</template>

<script>
import FormEvent from './FormEvent';
import modalWindowMixin from '../mixins/modal-window-mixin';

export default {
    mixins: [modalWindowMixin],
    components: {
        FormEvent
    }
}
</script>
