<template>
    <form @submit.prevent="submit">
        <div class="mb-3">
            <label for="firstname" class="mb-2">First name:</label>
            <input
                type="text"
                :disabled="pending"
                v-model="form.firstname"
            >
        </div>
        <div class="mb-3">
            <label for="lastname" class="mb-2">Last name:</label>
            <input
                type="text"
                :disabled="pending"
                v-model="form.lastname"
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
            'editProfile',
            () => ({
                form: {
                    firstname: '',
                    lastname: ''
                }
            })
        )
    ],
    created() {
        this.form.firstname = this.$store.state.user.user.firstname;
        this.form.lastname = this.$store.state.user.user.lastname;
    }
}
</script>
