<template>
    <form @submit.prevent="submit" class="relative">
        <div class="mb-3">
            <label for="email" class="mb-2">
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
            <label for="password" class="mb-2">
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
        <button :disabled="pending || $v.form.$invalid">
            Login
        </button>
        <div class="preloader form-preloader" v-if="pending"></div>
    </form>
</template>

<script>
import { FORM_ACTIONS_CLEAR } from '../store/form/action-types';
import FormErrors from './FormErrors';
import formMixinFactory from '../mixins/form-mixin-factory';
import {
    email,
    required,
    minLength,
    maxLength
} from 'vuelidate/lib/validators';

export default {
    mixins: [
        formMixinFactory(
            'login',
            () => ({
                form: {
                    email: '',
                    password: ''
                }
            })
        )
    ],
    components: {
        FormErrors
    },
    beforeCreate() {
        this.$store.dispatch('login/' + FORM_ACTIONS_CLEAR);
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
            }
        }
    }
}
</script>
