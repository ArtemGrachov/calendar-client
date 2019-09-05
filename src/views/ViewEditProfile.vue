<template>
    <div class="edit-profile">
        <router-link to="/profile">
            <i class="material-icons align-middle">
                arrow_back
            </i>
            Back to profile
        </router-link>
        <div class="block block-600 mx-auto px-4 py-3">
            <FormProfile></FormProfile>
        </div>
    </div>
</template>

<script>
import FormProfile from '../components/FormProfile';

export default {
    components: {
        FormProfile
    }
}
</script>
