<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 col-md-8 col-lg-6">
                <div class="block">
                    <h1>Registration</h1>
                    <FormRegistration></FormRegistration>
                </div>
                <div class="text-center my-5">
                    <router-link to="/auth/login">
                        Already have an account?
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FormRegistration from '../components/FormRegistration.vue';

export default {
    components: {
        FormRegistration
    }
}
</script>