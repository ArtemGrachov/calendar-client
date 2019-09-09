<template>
    <div class="modal-backdrop px-1 py-4">
        <div class="modal modal-small text-center px-4 py-3">
            <div class="mb-3">
                {{ data.question }}
            </div>
            <button
                class="button-green mr-1"
                @click="confirm"
            >
                Yes
            </button>
            <button
                class="button-red"
                @click="reject"
            >
                No
            </button>
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
