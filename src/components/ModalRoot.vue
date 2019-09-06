<template>
    <div class="modals-root">
        <transition-group name="modal">
            <component
                v-for="modal in modals"
                :key="modal.id"
                :is="modal.component"
                :data="modal.data"
                @resolve="modal.resolve($event)"
                @reject="modal.reject($event)"
                @close="modal.close(modal.id)"
            ></component>
        </transition-group>
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
