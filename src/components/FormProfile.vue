<template>
    <form @submit.prevent="submit">
        <div class="mb-3">
            <label for="firstname" class="mb-2">
                First name:
                <span class="required">
                    *
                </span>
            </label>
            <input
                class="mb-2"
                type="text"
                :disabled="pending"
                @blur="$v.form.firstname.$touch()"
                v-model="form.firstname"
            >
            <template v-if="$v.form.firstname.$error">
                <p class="field-error" v-if="!$v.form.firstname.required">
                    First name is required
                </p>
            </template>
        </div>
        <div class="mb-3">
            <label for="lastname" class="mb-2">
                Last name:
                <span class="required">
                    *
                </span>
            </label>
            <input
                class="mb-2"
                type="text"
                :disabled="pending"
                @blur="$v.form.lastname.$touch()"
                v-model="form.lastname"
            >
            <template v-if="$v.form.lastname.$error">
                <p class="field-error" v-if="!$v.form.lastname.required">
                    Last name is required
                </p>
            </template>
        </div>
        <button
            type="submit"
            :disabled="pending || $v.form.$invalid"
        >
            Update
        </button>
    </form>
</template>

<script>
import formMixinFactory from '../mixins/form-mixin-factory';
import { required } from 'vuelidate/lib/validators';
import { FORM_ACTIONS_CLEAR } from '../store/form/action-types';

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
    beforeCreate() {
        this.$store.dispatch('editProfile/' + FORM_ACTIONS_CLEAR);
    },
    created() {
        this.form.firstname = this.$store.state.user.user.firstname;
        this.form.lastname = this.$store.state.user.user.lastname;
    },
    validations: {
        form: {
            firstname: {
                required
            },
            lastname: {
                required
            }
        }
    }
}
</script>
