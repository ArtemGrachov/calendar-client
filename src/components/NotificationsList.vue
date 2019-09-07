<template>
    <ul class="notifications-list overflow-hidden">
        <transition-group name="slide-x-reverse" mode="out-in">
            <li
                v-if="!notifications.length"
                class="empty p-3 text-center"
                :key="'empty'"
            >
                <i class="material-icons d-block mb-2">
                    notifications_none
                </i>
                <p class="mb-0">
                    There are no notifications
                </p>
            </li>
            <li
                v-for="notification in notifications"
                :key="notification.id"
            >
                <NotificationBlock
                    :notification="notification"
                    @delete="deleteNotification(notification.id)"
                ></NotificationBlock>
            </li>
        </transition-group>
    </ul>
</template>

<script>
import NotificationBlock from './NotificationBlock';

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
            this.$emit('delete', notificationId);
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../styles/common';

    .notifications-list {
        @extend %list;
    }
</style>
