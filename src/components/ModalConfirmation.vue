<template>
    <div class="modal-backdrop">
        <div class="modal">
            <div class="modal-content d-flex justify-content-between">
                <div class="mb-3">
                    {{ data.question }}
                </div>
                <button
                    class="button-success"
                    @click="confirm"
                >
                    Yes
                </button>
                <button
                    class="button-danger"
                    @click="reject"
                >
                    No
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import modalWindowMixin from '../mixins/modal-window-mixin';

export default {
    mixins: [modalWindowMixin],
    methods: {
        confirm() {
            this.resolve(true);
            this.close();
        },
        reject() {
            this.resolve(false);
            this.close();
        }
    }
}
</script>
