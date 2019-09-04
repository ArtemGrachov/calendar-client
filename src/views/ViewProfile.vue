<template>
    <div class="profile-view">
        <div class="mb-3">
            <router-link
                class="button button-link"
                to="/profile/edit"
            >
                Edit
            </router-link>
        </div>
        <ProfileDetails :user="user" class="mb-3"></ProfileDetails>
        <div class="mb-3">
            <button @click="openChangePasswordModal">
                Change password
            </button>
        </div>
    </div>
</template>

<script>
import ProfileDetails from '../components/ProfileDetails';
import Modal from '../modal';
import ModalChangePassword from '../components/ModalChangePassword';

export default {
    components: {
        ProfileDetails
    },
    computed: {
        user() {
            return this.$store.state.user.user
        }
    },
    methods: {
        openChangePasswordModal() {
            Modal.openModal({
                component: ModalChangePassword
            });
        }
    }
}
</script>