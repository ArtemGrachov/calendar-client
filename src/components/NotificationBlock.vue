<template>
    <div
        class="notification py-3 px-4 d-flex align-items-stretch"
        :class="notification.type"
    >
        <div class="notification-body mr-3">
            <div class="notification-title mb-2">
                {{ notification.title }}
            </div>
            <div class="notification-content">
                {{ notification.content }}
            </div>
        </div>
        <button
            class="button-transparent notification-close"
            @click="deleteNotification"
        >
            <i class="material-icons">
                clear
            </i>
        </button>
    </div>
</template>

<script>
export default {
    props: {
        notification: Object
    },
    methods: {
        deleteNotification() {
            this.$emit('delete');
        }
    },
}
</script>

<style lang="scss" scoped>
    .notification {
        &-title {
            font-weight: bold;
            font-size: 16px;
        }

        &.success {
            .notification {
                &-title {
                    color: green;
                }
            }
        }

        &.info {
            .notification {
                &-title {
                    color: blue;
                }
            }
        }

        &.danger {
            .notification {
                &-title {
                    color: red;
                }
            }
        }

        &.warning {
            .notification {
                &-title {
                    color: orangered;
                }
            }
        }
    }
</style>