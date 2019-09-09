<template>
    <div class="profile-view">
        <div class="mb-3">
            <router-link to="/">
                <i class="material-icons align-middle">
                    arrow_back
                </i>
                Go to calendar
            </router-link>
        </div>
        <div class="block block-600 mx-auto px-4 py-3">
            <ProfileDetails :user="user" class="mb-3"></ProfileDetails>
            <div class="mb-3">
                <router-link
                    class="button button-link m-2"
                    to="/profile/edit"
                >
                    Edit
                </router-link>
                <button @click="openChangePasswordModal" class="button-violet m-2">
                    Change password
                </button>
            </div>
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
