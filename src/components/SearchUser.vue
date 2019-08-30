<template>
    <form class="search-us" @submit.prevent="submit()">
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
        <div class="user d-flex align-items-center" v-if="user">
            <UserAvatar class="mr-3" :user="user"></UserAvatar>
            <div class="mr-auto">
                {{user.firstname}} {{user.lastname}}
            </div>
            <slot name="controls" v-if="user" :user="user"></slot>
        </div>
    </form>
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
        user() {
            return this.$store.state.usersSearch.user
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
