<template>
    <div class="notifications">
        <transition name="fade" mode="out-in">
            <component
                :is="cmp"
                @delete="deleteNotification($event)"
            ></component>
        </transition>
    </div>
</template>

<script>
import NotificationsEmpty from './NotificationsEmpty';
import NotificationsList from './NotificationsList';
import {
    NOTIFICATIONS_ACTIONS_GET_NOTIFICATIONS,
    NOTIFICATIONS_ACTIONS_DELETE_NOTIFICATION
} from '../store/notifications/action-types';

export default {
    computed: {
        cmp() {
            return this.$store.state.notifications.items.length ?
                NotificationsList :
                NotificationsEmpty
        }
    },
    created() {
        this.$store.dispatch('notifications/' + NOTIFICATIONS_ACTIONS_GET_NOTIFICATIONS)
    },
    methods: {
        deleteNotification(notificationId) {
            this.$store.dispatch(
                'notifications/' + NOTIFICATIONS_ACTIONS_DELETE_NOTIFICATION,
                { id: notificationId }
            );
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../styles/variables';
    @import '../styles/common';

    .notifications {
        background: white;
        box-shadow: $shadow;
        border-radius: $borderRadius * 2;
        width: 100%;
        max-width: 300px;
        max-height: 400px;
        overflow-y: auto;
        z-index: 200;
    }
</style>
