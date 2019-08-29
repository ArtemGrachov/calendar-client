<template>
    <div v-if="modals.length">
        <component
            v-for="modal in modals"
            :key="modal.id"
            :is="modal.component"
            @resolve="modal.resolve($event)"
            @reject="modal.reject($event)"
            @close="modal.close(modal.id)"
        ></component>
    </div>
</template>

<script>
import Modal from '../modal';

export default {
    computed: {
        modals() {
            return Modal.modals;
        }
    }
}
</script>
