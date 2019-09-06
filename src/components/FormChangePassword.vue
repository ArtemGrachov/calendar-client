<template>
    <form @submit.prevent="submit" class="relative">
        <div class="mb-3">
            <label
                for="firstname"
                class="mb-2"
            >
                New password:
            </label>
            <input
                id="password"
                name="password"
                type="password"
                :disabled="pending"
                v-model="form.password"
            >
        </div>
        <div class="mb-3">
            <label
                for="passwordConfirmation"
                class="mb-2"
            >
                New password confirmation:
            </label>
            <input
                id="passwordConfirmation"
                name="passwordConfirmation"
                type="password"
                :disabled="pending"
                v-model="form.passwordConfirmation"
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
        <button
            type="submit"
            class="button-yellow"
            :disabled="pending"
        >
            Update
        </button>
        <div class="preloader form-preloader" v-if="pending"></div>
    </form>
</template>

<script>
import formMixinFactory from '../mixins/form-mixin-factory';

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
    ]
}
</script>
