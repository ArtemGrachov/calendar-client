<template>
    <header class="header py-3 px-5">
        <div class="container d-flex align-items-center" v-if="user">
            <router-link to="/profile">
                <UserAvatar :user="user"></UserAvatar>
            </router-link>
            <div class="username ml-3 d-none d-md-block">
                <router-link to="/profile">
                    {{ user.firstname }}
                    {{ user.lastname }}
                </router-link>
            </div>
            <div class="controls ml-auto">
                <popper
                    trigger="click"
                    :boundaries-selector="'body'"
                >
                    <NotificationsDropdown></NotificationsDropdown>
                    <button
                        class="button-link button-round notifications-button"
                        slot="reference"
                    >
                        <i class="material-icons">
                            {{
                                notifications.length ?
                                    'notifications' :
                                    'notifications_none'
                            }}
                        </i>
                        <div class="notifications-counter" v-if="notifications.length">
                            {{ notifications.length }}
                        </div>
                    </button>
                </popper>
                <button class="button-link button-round ml-4" @click="logout">
                    <i class="material-icons">
                        exit_to_app
                    </i>
                </button>
            </div>
        </div>
    </header>
</template>

<script>
import { USER_ACTIONS_CLEAR } from '../store/user/action-types';
import Popper from 'vue-popperjs';
import UserAvatar from './UserAvatar';
import NotificationsDropdown from './NotificationsDropdown';

export default {
    components: {
        UserAvatar,
        NotificationsDropdown,
        Popper
    },
    data() {
        return {
            showNotifications: false
        }
    },
    computed: {
        user() {
            return this.$store.state.user.user;
        },
        notifications() {
            return this.$store.state.notifications.items;
        }
    },
    methods: {
        logout() {
            this.$store.dispatch('user/' + USER_ACTIONS_CLEAR)
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../styles/variables.scss';

    .header {
        box-shadow: $shadow;
        animation-duration: 500ms;
        animation-name: header-animation;
    }

    .username {
        font-weight: bold;
    }

    .notifications {
        &-button {
            position: relative;
        }

        &-counter {
            $size: 20px;
            position: absolute;
            bottom: 0;
            right: 0;
            font-size: 10px;
            background: $violet;
            color: white;
            width: $size;
            height: $size;
            line-height: $size;
            padding-left: 2px;
            padding-top: 1px;
            border-radius: 50%;
            text-align: center;
            box-shadow: $shadow;
        }
    }

    @keyframes header-animation {
        0% {
            transform: translateY(-100%);
        }
        100% {
            transform: translateY(0);
        }
    }
</style>
