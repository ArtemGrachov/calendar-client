<template>
    <form @submit.prevent="submit">
        <div>
            <label for="email">Email</label>
            <input
                type="email"
                name="email"
                id="email"
                v-model="email"
            >
        </div>
        <div>
            <label for="password">Password</label>
            <input
                type="password"
                name="password"
                id="password"
                v-model="password"
            >
        </div>
        <button>
            Login
        </button>
    </form>
</template>

<script>
import { FORM_ACTIONS_SUBMIT } from '../store/form/action-types';

export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        submit() {
            this.$store.dispatch('login/' + FORM_ACTIONS_SUBMIT, this.$data);
        }
    }
}
</script>