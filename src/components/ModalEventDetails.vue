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
                <EventDetails :event="data"></EventDetails>
            </div>
        </div>
    </div>
</template>

<script>
import EventDetails from './EventDetails';
import modalWindowMixin from '../mixins/modal-window-mixin';

export default {
    mixins: [modalWindowMixin],
    components: {
        EventDetails
    }
}
</script>
