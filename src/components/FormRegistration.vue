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
                v-model="form.email"
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
                v-model="form.password"
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
                v-model="form.passwordConfirmation"
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
                v-model="form.firstname"
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
                v-model="form.lastname"
                :disabled="pending"
            >
        </div>
        <div
            class="form-message mb-2 p-3"
            v-if="message"
        >
            {{ message }}
        </div>
        <FormErrors
            :errors="errors"
            v-if="errors.length"
            class="mb-3 p-3"
        ></FormErrors>
        <button type="submit">Create account</button>
        <div class="preloader form-preloader" v-if="pending"></div>
    </form>
</template>

<script>
import FormErrors from './FormErrors';
import formMixinFactory from '../mixins/form-mixin-factory';
import { FORM_ACTIONS_CLEAR } from '../store/form/action-types';

export default {
    mixins: [
        formMixinFactory(
            'registration',
            () => ({
                form: {
                    email: '',
                    password: '',
                    passwordConfirmation: '',
                    firstname: '',
                    lastname: ''
                }
            })
        )
    ],
    components: {
        FormErrors
    },
    beforeCreate() {
        this.$store.dispatch('registration/' + FORM_ACTIONS_CLEAR);
    }
}
</script>
