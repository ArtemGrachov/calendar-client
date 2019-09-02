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
                <EventDetails
                    :event="event"
                    @edit="edit(event.id)"
                    @delete="deleteEvent(event.id)"
                    @leave="leave(event.id)"
                    @invite="invite(event.id)"
                ></EventDetails>
            </div>
        </div>
    </div>
</template>

<script>
import EventDetails from './EventDetails';
import Modal from '../modal';
import ModalEventForm from './ModalEventForm';
import ModalInvite from './ModalInvite';
import modalWindowMixin from '../mixins/modal-window-mixin';
import {
    EVENTS_ACTIONS_DELETE_EVENT,
    EVENTS_ACTIONS_LEAVE_EVENT
} from '../store/events/action-types';

export default {
    mixins: [modalWindowMixin],
    components: {
        EventDetails
    },
    computed: {
        event() {
            return this.$store.getters['events/byId'](this.data);
        }
    },
    methods: {
        edit() {
            Modal.openModal({
                component: ModalEventForm,
                data: {
                    ...this.event
                }
            });
        },
        deleteEvent() {
            this.$store.dispatch(
                'events/' + EVENTS_ACTIONS_DELETE_EVENT,
                this.event
            );
        },
        leave() {
            this.$store.dispatch(
                'events/' + EVENTS_ACTIONS_LEAVE_EVENT,
                this.event
            );
        },
        invite() {
            Modal.openModal({
                component: ModalInvite,
                data: {
                    eventId: this.event.id
                }
            });
        }
    },
    created() {
        this.$options.actionSub = this.$store.subscribeAction((action) => {
            switch (action.type) {
                case 'events/' + EVENTS_ACTIONS_DELETE_EVENT:
                case 'events/' + EVENTS_ACTIONS_LEAVE_EVENT:
                    this.close();
                    break;
            }
        });
    },
    destroyed() {
        this.$options.actionSub();
    }
}
</script>
