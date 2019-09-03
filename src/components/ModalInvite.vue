<template>
    <div class="modal-backdrop px-5 py-4" @click.self="close">
        <div class="modal">
            <div class="mb-3 d-flex justify-content-between">
                <div class="title px-4 py-3">Invite user to event</div>
                <button
                    @click="close"
                    class="button-round button-transparent button-grey button-small"
                >
                    <i class="material-icons">
                        clear
                    </i>
                </button>
            </div>
            <div class="py-3">
                <SearchUser>
                    <template v-slot:default="slotProps">
                        <UserInviteControls
                            :user="slotProps.user"
                            :event="event"
                            @invite="invite(slotProps.user.id)"
                            @remove="remove(slotProps.user.id)"
                        ></UserInviteControls>
                    </template>
                </SearchUser>
            </div>
        </div>
    </div>
</template>

<script>
import modalWindowMixin from '../mixins/modal-window-mixin';
import SearchUser from './SearchUser';
import UserInviteControls from './UserInviteControls';
import {
    EVENTS_ACTIONS_INVITE_USER_TO_EVENT,
    EVENTS_ACTIONS_REMOVE_USER_FROM_EVENT
} from '../store/events/action-types';

export default {
    mixins: [modalWindowMixin],
    components: {
        SearchUser,
        UserInviteControls
    },
    computed: {
        event() {
            return this.$store.getters['events/byId'](this.data.eventId)
        }
    },
    methods: {
        invite(userId) {
            this.$store.dispatch(
                'events/' + EVENTS_ACTIONS_INVITE_USER_TO_EVENT,
                {
                    userId,
                    eventId: this.event.id
                }
            );
        },
        remove(userId) {
            this.$store.dispatch(
                'events/' + EVENTS_ACTIONS_REMOVE_USER_FROM_EVENT,
                {
                    userId,
                    eventId: this.event.id
                }
            );
        }
    }
}
</script>
