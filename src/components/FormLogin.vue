<template>
    <form @submit.prevent="submit">
        <div class="mb-3">
            <label for="email" class="mb-2">Email</label>
            <input
                type="email"
                name="email"
                id="email"
                v-model="email"
            >
        </div>
        <div class="mb-3">
            <label for="password" class="mb-2">Password</label>
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