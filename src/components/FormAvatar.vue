<template>
    <div class="form-avatar">
        <div class="mb-2">
            <label>Avatar:</label>
        </div>
        <button
            class="mb-3 mr-2"
            @click="toggleUploadForm"
        >
            Upload new avatar
        </button>
        <button
            class="button-red mb-3"
            @click="deleteAvatar"
        >
            Delete avatar
        </button>
        <form
            @submit.prevent="prepareForm"
            v-show="showUploadForm"
        >
            <div class="d-block text-center">
                <div class="mb-2">
                    <croppa
                        class="image-clip d-inline-block"
                        v-model="avatarCmp"
                        :file-size-limit="102400"
                        :quality="1"
                        :show-remove-button="false"
                        :placeholder-font-size="16"
                        :width="200"
                        :height="200"
                    ></croppa>
                </div>
                <button
                    type="button"
                    class="button-red button-transparent m-2"
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
                    avatar: null,
                    deleteAvatar: false
                }
            })
        )
    ],
    data() {
        return {
            avatarCmp: null,
            showUploadForm: false
        }
    },
    methods: {
        async prepareForm() {
            const avatar = await this.avatarCmp.promisedBlob();
            this.form.avatar = avatar;
            this.form.deleteAvatar = false;
            this.submit();
        },
        clear() {
            this.avatarCmp.remove();
        },
        deleteAvatar() {
            this.form.avatar = null;
            this.form.deleteAvatar = true;
            this.submit();
        },
        toggleUploadForm() {
            this.showUploadForm = !this.showUploadForm;
        }
    },
    computed: {
        formData() {
            return this.form;
        }
    },
}
</script>
