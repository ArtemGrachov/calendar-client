<template>
    <form @submit.prevent="submit" class="relative">
        <div class="mb-3">
            <label for="avatar" class="mb-2">Avatar:</label>
            <input
                type="file"
                name="avatar"
                id="avatar"
                @change="fileOnChange($event, form)"
            >
        </div>
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
                    lastname: '',
                    avatar: null
                }
            })
        )
    ],
    computed: {
        formData() {
            return this.$data.form
        }
    },
    created() {
        this.form.firstname = this.$store.state.user.user.firstname;
        this.form.lastname = this.$store.state.user.user.lastname;
    }
}
</script>
