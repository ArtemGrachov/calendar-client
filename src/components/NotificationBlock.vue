<template>
    <div
        class="relative notification py-3 px-3 pr-2 d-flex align-items-center"
        :class="notification.type"
    >
        <div class="preloader" v-if="pending"></div>
        <div class="notification-body mr-3">
            <div class="notification-title mb-2">
                {{ notification.title }}
            </div>
            <div class="notification-content">
                {{ notification.content }}
            </div>
        </div>
        <button
            class="button-round button-link button-grey notification-close flex-shrink-0"
            @click="deleteNotification"
            :disabled="pending"
        >
            <i class="material-icons">
                clear
            </i>
        </button>
    </div>
</template>

<script>
import { PROCESSING_PENDING } from '../config/processing';

export default {
    props: {
        notification: Object
    },
    computed: {
        pending() {
            return this.notification.processing === PROCESSING_PENDING;
        }
    },
    methods: {
        deleteNotification() {
            this.$emit('delete');
        }
    },
}
</script>

<style lang="scss" scoped>
    @import '../styles/variables';

    .notification {
        border-left: 10px solid transparent;
        border-bottom: 1px dotted transparent;

        &-title {
            font-weight: bold;
            font-size: 16px;
        }

        &.success {
            border-color: $green;

            .notification {

                &-title {
                    color: $green;
                }
            }
        }

        &.info {
            border-color: $blue;

            .notification {

                &-title {
                    color: $blue;
                }
            }
        }

        &.danger {
            border-color: $red;

            .notification {

                &-title {
                    color: $red;
                }
            }
        }

        &.warning {
            border-color: $orange;

            .notification {

                &-title {
                    color: $orange;
                }
            }
        }
    }

    .preloader {
        position: absolute;
        font-size: 4px;
        right: 8px;
        top: 8px;
    }
</style>