<template>
    <form @submit.prevent="submit">
        <div class="mb-3">
            <label for="firstname" class="mb-2">New password:</label>
            <input
                id="password"
                name="password"
                type="password"
                :disabled="pending"
                v-model="form.password"
            >
        </div>
        <div class="mb-3">
            <label for="passwordConfirmation" class="mb-2">New password confirmation:</label>
            <input
                id="passwordConfirmation"
                name="passwordConfirmation"
                type="password"
                :disabled="pending"
                v-model="form.passwordConfirmation"
            >
        </div>
        <button
            type="submit"
            :disabled="pending"
        >
            Update
        </button>
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
    ],
    computed: {
        formData() {
            return this.$data.form
        }
    }
}
</script>
