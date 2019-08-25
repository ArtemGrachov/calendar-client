<template>
    <header class="header py-3 px-5">
        <UserAvatar :avatarUrl="user.avatarUrl"></UserAvatar>
        <div class="username ml-3">
            {{ user.firstname }}
            {{ user.lastname }}
        </div>
        <div class="controls ml-auto">
            <button class="button-flat" @click="logout">
                <i class="material-icons">
                    exit_to_app
                </i>
            </button>
        </div>
    </header>
</template>

<script>
import { USER_ACTIONS_CLEAR } from '../store/user/action-types';
import UserAvatar from '../components/UserAvatar';

export default {
    components: {
        UserAvatar
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
        display: flex;
        align-items: center;
    }
    .username {
        font-weight: bold;
    }
</style>
