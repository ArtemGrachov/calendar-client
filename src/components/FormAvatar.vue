<template>
    <div class="form-avatar">
        <div class="mb-2">
            <label>Avatar:</label>
        </div>
        <button
            class="mb-3 mr-2"
            :disabled="pending"
            @click="toggleUploadForm"
        >
            Upload new avatar
        </button>
        <button
            class="button-red mb-3"
            :disabled="pending"
            @click="deleteAvatar"
        >
            Delete avatar
        </button>
        <transition name="accordion">
            <form
                @submit.prevent="upload"
                v-show="showUploadForm"
            >
                <div class="d-block text-center">
                    <div class="mb-2">
                        <croppa
                            class="image-clip d-inline-block mb-2"
                            v-model="avatarCmp"
                            :file-size-limit="102400"
                            :quality="1"
                            :show-remove-button="false"
                            :placeholder-font-size="16"
                            :width="200"
                            :height="200"
                        ></croppa>
                        <p class="field-details">
                            Max: 100KB
                        </p>
                        <p class="field-error" v-if="noAvatarError">
                            Please, select avatar image
                        </p>
                    </div>
                    <button
                        type="button"
                        class="button-red button-transparent m-2"
                        :disabled="pending"
                        @click="clear()"
                    >
                        Clear
                    </button>
                    <button
                        class="m-2"
                        type="submit"
                        :disabled="pending"
                    >
                        Upload
                    </button>
                </div>
            </form>
        </transition>
    </div>
</template>

<script>
import formMixinFactory from '../mixins/form-mixin-factory';

export default {
    mixins: [
        formMixinFactory(
            'editProfile',
            () => ({
                form: {
                    avatar: null
                }
            })
        )
    ],
    data() {
        return {
            avatarCmp: null,
            showUploadForm: false,
            noAvatarError: false
        }
    },
    methods: {
        async upload() {
            const avatar = await this.avatarCmp.promisedBlob();
            this.form.avatar = avatar;

            if (avatar) {
                this.sendForm(this.form, { uploadAvatar: true });
                this.noAvatarError = false;
            } else {
                this.noAvatarError = true;
            }
        },
        clear() {
            this.avatarCmp.remove();
        },
        deleteAvatar() {
            this.sendForm(null, { deleteAvatar: true });
        },
        toggleUploadForm() {
            this.showUploadForm = !this.showUploadForm;
        }
    }
}
</script>
