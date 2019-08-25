<template>
    <form @submit.prevent="submit" class="relative">
        <div class="mb-3">
            <label for="email" class="mb-2">Email</label>
            <input
                type="email"
                name="email"
                id="email"
                v-model="email"
                :disabled="pending"
            >
        </div>
        <div class="mb-3">
            <label for="password" class="mb-2">Password</label>
            <input
                type="password"
                name="password"
                id="password"
                v-model="password"
                :disabled="pending"
            >
        </div>
        <div
            class="form-message mb-2"
            v-if="message"
        >
            {{ message }}
        </div>
        <FormErrors
            :errors="errors"
            v-if="errors.length"
            class="mb-3"
        ></FormErrors>
        <button :disabled="pending">
            Login
        </button>
        <div class="preloader form-preloader" v-if="pending"></div>
    </form>
</template>

<script>
import { FORM_ACTIONS_SUBMIT, FORM_ACTIONS_CLEAR } from '../store/form/action-types';
import FormErrors from './FormErrors';
import { PROCESSING_PENDING } from '../config/processing';

export default {
    components: {
        FormErrors
    },
    data() {
        return {
            email: '',
            password: '',
            prPending: PROCESSING_PENDING
        }
    },
    methods: {
        submit() {
            this.$store.dispatch('login/' + FORM_ACTIONS_SUBMIT, this.$data);
        }
    },
    computed: {
        errors() {
            return this.$store.state.login.errors;
        },
        message() {
            return this.$store.state.login.message;
        },
        pending() {
            return this.$store.getters['login/pending'];
        }
    },
    beforeCreate() {
        this.$store.dispatch('login/' + FORM_ACTIONS_CLEAR);
    }
}
</script>