<template>
    <div class="modal-backdrop" @click.self="close">
        <div class="modal">
            <div class="modal-content d-flex justify-content-between">
                <div class="title">Invite user to event</div>
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
                <SearchUser>
                    <template v-slot:default="slotProps">
                        <UserInviteControls
                            :user="slotProps.user"
                            :event="data"
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
    methods: {
        invite(userId) {
            this.$store.dispatch(
                'events/' + EVENTS_ACTIONS_INVITE_USER_TO_EVENT,
                {
                    userId,
                    eventId: this.data.id
                }
            );
        },
        remove(userId) {
            this.$store.dispatch(
                'events/' + EVENTS_ACTIONS_REMOVE_USER_FROM_EVENT,
                {
                    userId,
                    eventId: this.data.id
                }
            );
        }
    }
}
</script>
