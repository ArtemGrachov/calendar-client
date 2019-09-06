<template>
    <div class="edit-profile relative">
        <router-link to="/profile">
            <i class="material-icons align-middle">
                arrow_back
            </i>
            Back to profile
        </router-link>
        <div class="block block-600 mx-auto mb-5 px-4 py-3">
            <FormAvatar></FormAvatar>
        </div>
        <div class="block block-600 mx-auto px-4 py-3">
            <FormProfile></FormProfile>
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
    }
}
</script>
