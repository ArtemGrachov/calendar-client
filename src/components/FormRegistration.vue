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
                class="mb-2"
                type="email"
                name="email"
                id="email"
                v-model="form.email"
                @blur="$v.form.email.$touch()"
                :disabled="pending"
            >
            <template v-if="$v.form.email.$error">
                <p class="field-error" v-if="!$v.form.email.email">
                    Incorrect email format
                </p>
                <p class="field-error" v-if="!$v.form.email.required">
                    Email is required
                </p>
            </template>
        </div>
        <div class="mb-3">
            <label class="mb-2" for="password">
                Password
                <span class="required">
                    *
                </span>
            </label>
            <input
                class="mb-2"
                type="password"
                name="password"
                id="password"
                v-model="form.password"
                @blur="$v.form.password.$touch()"
                :disabled="pending"
            >
            <template v-if="$v.form.password.$error">
                <p class="field-error" v-if="!$v.form.password.minLength || !$v.form.password.maxLength">
                    Password must contain at least 8 and less than 18 characters
                </p>
                <p class="field-error" v-if="!$v.form.password.required">
                    Password is required
                </p>
            </template>
        </div>
        <div class="mb-3">
            <label class="mb-2" for="passwordConfirmation">
                Password confirmation
                <span class="required">
                    *
                </span>
            </label>
            <input
                class="mb-2"
                type="password"
                name="passwordConfirmation"
                id="passwordConfirmation"
                v-model="form.passwordConfirmation"
                @blur="$v.form.passwordConfirmation.$touch()"
                :disabled="pending"
            >
            <template v-if="$v.form.passwordConfirmation.$error">
                <p class="field-error" v-if="!$v.form.passwordConfirmation.required">
                    Password confirmation is required
                </p>
                <p class="field-error" v-if="!$v.form.passwordConfirmation.sameAs">
                    Passwords are not equal
                </p>
            </template>
        </div>
        <div class="mb-3">
            <label class="mb-2" for="firstname">
                First name
                <span class="required">
                    *
                </span>
            </label>
            <input
                class="mb-2"
                type="text"
                id="firstname"
                name="firstname"
                v-model="form.firstname"
                @blur="$v.form.firstname.$touch()"
                :disabled="pending"
            >
            <template v-if="$v.form.firstname.$error">
                <p class="field-error" v-if="!$v.form.firstname.required">
                    First name is required
                </p>
            </template>
        </div>
        <div class="mb-3">
            <label class="mb-2" for="lastname">
                Last name
                <span class="required">
                    *
                </span>
            </label>
            <input
                class="mb-2"
                type="text"
                id="lastname"
                name="lastname"
                v-model="form.lastname"
                @blur="$v.form.lastname.$touch()"
                :disabled="pending"
            >
            <template v-if="$v.form.lastname.$error">
                <p class="field-error" v-if="!$v.form.lastname.required">
                    Last name is required
                </p>
            </template>
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
        <button
            type="submit"
            :disabled="pending || $v.form.$invalid"
        >
            Create account
        </button>
        <div class="preloader form-preloader" v-if="pending"></div>
    </form>
</template>

<script>
import FormErrors from './FormErrors';
import formMixinFactory from '../mixins/form-mixin-factory';
import { FORM_ACTIONS_CLEAR } from '../store/form/action-types';
import {
    email,
    required,
    minLength,
    maxLength,
    sameAs
} from 'vuelidate/lib/validators';

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
    },
    validations: {
        form: {
            email: {
                email,
                required
            },
            password: {
                minLength: minLength(8),
                maxLength: maxLength(18),
                required
            },
            passwordConfirmation: {
                sameAs: sameAs('password'),
                required
            },
            firstname: {
                required
            },
            lastname: {
                required
            }
        }
    }
}
</script>
