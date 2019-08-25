<template>
    <form @submit.prevent="submit" class="relative">
        <div class="mb-3">
            <label class="mb-2" for="email">
                Email
                <span class="required">
                    *
                </span>
            </label>
            <input
                type="email"
                name="email"
                id="email"
                v-model="email"
                :disabled="pending"
            >
        </div>
        <div class="mb-3">
            <label class="mb-2" for="password">
                Password
                <span class="required">
                    *
                </span>
            </label>
            <input
                type="password"
                name="password"
                id="password"
                v-model="password"
                :disabled="pending"
            >
        </div>
        <div class="mb-3">
            <label class="mb-2" for="passwordConfirmation">
                Password confirmation
                <span class="required">
                    *
                </span>
            </label>
            <input
                type="password"
                name="passwordConfirmation"
                id="passwordConfirmation"
                v-model="passwordConfirmation"
                :disabled="pending"
            >
        </div>
        <div class="mb-3">
            <label class="mb-2" for="firstname">
                First name
                <span class="required">
                    *
                </span>
            </label>
            <input
                type="text"
                id="firstname"
                name="firstname"
                v-model="firstname"
                :disabled="pending"
            >
        </div>
        <div class="mb-3">
            <label class="mb-2" for="lastname">
                Last name
                <span class="required">
                    *
                </span>
            </label>
            <input
                type="text"
                id="lastname"
                name="lastname"
                v-model="lastname"
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
        <button type="submit">Create account</button>
        <div class="preloader form-preloader" v-if="pending"></div>
    </form>
</template>

<script>
import { FORM_ACTIONS_SUBMIT, FORM_ACTIONS_CLEAR } from '../store/form/action-types';
import FormErrors from './FormErrors';

export default {
    components: {
        FormErrors
    },
    data() {
        return {
            email: '',
            password: '',
            passwordConfirmation: '',
            firstname: '',
            lastname: ''
        }
    },
    methods: {
        submit() {
            this
                .$store
                .dispatch('registration/' + FORM_ACTIONS_SUBMIT, this.$data)
                .then(() => console.log('ok!'))
                .catch(() => console.log('catch!'));
        }
    },
    computed: {
        errors() {
            return this.$store.state.registration.errors;
        },
        message() {
            return this.$store.state.registration.message;
        },
        pending() {
            return this.$store.getters['registration/pending'];
        }
    },
    beforeCreate() {
        this.$store.dispatch('registration/' + FORM_ACTIONS_CLEAR);
    }
}
</script>

<style lang="scss" scoped>
    .preloader {
        right: 0;
        top: 100%;
    }
</style>