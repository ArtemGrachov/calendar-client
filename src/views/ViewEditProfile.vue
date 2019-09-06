<template>
    <div class="edit-profile relative block-600 mx-auto">
        <div class="mb-3">
            <router-link to="/profile">
                <i class="material-icons align-middle">
                    arrow_back
                </i>
                Back to profile
            </router-link>
        </div>
        <div class="block mb-5 px-4 py-3">
            <FormAvatar></FormAvatar>
        </div>
        <div class="block mb-5 px-4 py-3">
            <FormProfile></FormProfile>
        </div>
        <div class="block px-4 py-3" v-if="errors.length">
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
        </div>
    </div>
</template>

<script>
import FormAvatar from '../components/FormAvatar';
import FormProfile from '../components/FormProfile';

export default {
    components: {
        FormAvatar,
        FormProfile
    },
    computed: {
        errors() {
            return this.$store.state.editProfile.errors;
        },
        message() {
            return this.$store.state.editProfile.message;
        },
        pending() {
            return this.$store.getters['editProfile/pending'];
        }
    }
}
</script>
