<template>
    <header class="header py-3 px-5">
        <div class="container d-flex align-items-center" v-if="user">
            <router-link to="/profile">
                <UserAvatar :user="user"></UserAvatar>
            </router-link>
            <div class="username ml-3">
                {{ user.firstname }}
                {{ user.lastname }}
            </div>
            <div class="controls ml-auto">
                <popper
                    trigger="click"
                    :boundaries-selector="'body'"
                >
                    <NotificationsList></NotificationsList>
                    <button class="button-flat" slot="reference">
                        <i class="material-icons">
                            notifications_none
                        </i>
                    </button>
                </popper>
                <button class="button-flat ml-4" @click="logout">
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
import NotificationsList from './NotificationsList';

export default {
    components: {
        UserAvatar,
        NotificationsList,
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
    }
    .username {
        font-weight: bold;
    }
</style>
