<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 col-md-8 col-lg-6">
                <div class="block">
                    <h1>Login</h1>
                    <FormLogin></FormLogin>
                </div>
                <div class="text-center my-5">
                    <router-link to="/auth/registration">
                        Don't have an account?
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FormLogin from '../components/FormLogin';

export default {
    components: {
        FormLogin
    }
}
</script>