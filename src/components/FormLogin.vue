<template>
    <form @submit.prevent="submit" class="relative">
        <div class="mb-3">
            <label for="email" class="mb-2">Email</label>
            <input
                type="email"
                name="email"
                id="email"
                v-model="form.email"
                :disabled="pending"
            >
        </div>
        <div class="mb-3">
            <label for="password" class="mb-2">Password</label>
            <input
                type="password"
                name="password"
                id="password"
                v-model="form.password"
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
        <button :disabled="pending">
            Login
        </button>
        <div class="preloader form-preloader" v-if="pending"></div>
    </form>
</template>

<script>
import { FORM_ACTIONS_CLEAR } from '../store/form/action-types';
import FormErrors from './FormErrors';
import formMixinFactory from '../mixins/form-mixin-factory';

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
    }
}
</script>
