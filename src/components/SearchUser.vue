<template>
    <div class="search-user">
        <form class="px-4" @submit.prevent="submit()">
            <label for="email" class="mb-2">Email:</label>
            <div class="d-flex align-items-stretch mb-3">
                <input
                    type="email"
                    name="email"
                    id="email"
                    class="mr-2"
                    v-model="form.email"
                >
                <button type="submit">Search</button>
            </div>
        </form>
        <div
            class="user-block py-2 px-3 d-flex align-items-center mb-2"
            v-for="user in users"
            :key="user.id"
        >
            <UserAvatar class="mr-3" :user="user"></UserAvatar>
            <div class="mr-auto">
                {{user.firstname}} {{user.lastname}}
            </div>
            <slot v-if="user" :user="user"></slot>
        </div>
    </div>
</template>

<script>
import { FORM_ACTIONS_SUBMIT } from '../store/form/action-types';
import UserAvatar from './UserAvatar';

export default {
    components: {
        UserAvatar
    },
    data() {
        return {
            form: {
                email: ''
            }
        }
    },
    computed: {
        users() {
            return this.$store.state.users.items
        }
    },
    methods: {
        submit() {
            this.$store.dispatch(
                'usersSearch/' + FORM_ACTIONS_SUBMIT,
                this.form
            );
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../styles/variables.scss';

    .user-block {
        &:nth-child(even) {
            background: $background;
        }
    }
</style>