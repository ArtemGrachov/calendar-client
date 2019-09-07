<template>
    <form @submit.prevent="submit" class="relative">
        <div class="mb-3">
            <label
                for="firstname"
                class="mb-2"
            >
                New password:
                <span class="required">
                    *
                </span>
            </label>
            <input
                id="password"
                name="password"
                type="password"
                :disabled="pending"
                @blur="$v.form.password.$touch()"
                v-model="form.password"
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
            <label
                for="passwordConfirmation"
                class="mb-2"
            >
                New password confirmation:
                <span class="required">
                    *
                </span>
            </label>
            <input
                id="passwordConfirmation"
                name="passwordConfirmation"
                type="password"
                :disabled="pending"
                @blur="$v.form.passwordConfirmation.$touch()"
                v-model="form.passwordConfirmation"
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
            class="button-yellow"
            :disabled="pending || $v.form.$invalid"
        >
            Update
        </button>
        <div class="preloader form-preloader" v-if="pending"></div>
    </form>
</template>

<script>
import formMixinFactory from '../mixins/form-mixin-factory';
import { FORM_ACTIONS_CLEAR } from '../store/form/action-types';
import {
    required,
    minLength,
    maxLength,
    sameAs
} from 'vuelidate/lib/validators';

export default {
    mixins: [
        formMixinFactory(
            'changePassword',
            () => ({
                form: {
                    password: '',
                    passwordConfirmation: ''
                }
            })
        )
    ],
    validations: {
        form: {
            password: {
                minLength: minLength(8),
                maxLength: maxLength(18),
                required
            },
            passwordConfirmation: {
                sameAs: sameAs('password'),
                required
            }
        }
    },
    beforeCreate() {
        this.$store.dispatch('changePassword/' + FORM_ACTIONS_CLEAR);
    }
}
</script>
