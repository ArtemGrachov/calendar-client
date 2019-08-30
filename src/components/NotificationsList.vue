<template>
    <ul class="notifications">
        <li
            v-for="notification in notifications"
            :key="notification.id"
        >
            <NotificationBlock
                :notification="notification"
                @delete="deleteNotification(notification.id)"
            ></NotificationBlock>
        </li>
    </ul>
</template>

<script>
import NotificationBlock from './NotificationBlock';
import{ NOTIFICATIONS_ACTIONS_DELETE_NOTIFICATION, NOTIFICATIONS_ACTIONS_GET_NOTIFICATIONS } from '../store/notifications/action-types';

export default {
    components: {
        NotificationBlock
    },
    computed: {
        notifications() {
            return this.$store.state.notifications.items;
        }
    },
    methods: {
        deleteNotification(notificationId) {
            this.$store.dispatch(
                'notifications/' + NOTIFICATIONS_ACTIONS_DELETE_NOTIFICATION,
                { id: notificationId }
            );
        }
    },
    created() {
        this.$store.dispatch('notifications/' + NOTIFICATIONS_ACTIONS_GET_NOTIFICATIONS)
    }
}
</script>

<style lang="scss" scoped>
    @import '../styles/variables';
    @import '../styles/common';

    .notifications {
        @extend %list;
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
