<template>
    <div class="profile-view">
        <div class="mb-3">
            <router-link
                class="button button-flat"
                to="/profile/edit"
            >
                Edit
            </router-link>
        </div>
        <ProfileDetails :user="user"></ProfileDetails>
    </div>
</template>

<script>
import ProfileDetails from '../components/ProfileDetails';

export default {
    components: {
        ProfileDetails
    },
    computed: {
        user() {
            return this.$store.state.user.user
        }
    }
}
</script>