<template>
    <div class="avatar">
        <img
            class="avatar-img"
            v-if="avatar"
            :src="avatar"
        />
        <img
            class="avatar-img"
            v-else
            src="../assets/avatar-blank.png"
            alt="No avatar"
        >
    </div>
</template>

<script>
import { apiDomain } from '../config';

export default {
    props: {
        user: Object
    },
    computed: {
        avatar() {
            const avatarUrl = this.user.avatarUrl;
            return avatarUrl ? `${apiDomain}uploads/${avatarUrl}` : avatarUrl;
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../styles/variables';

    .avatar {
        $size: 40px;
        width: $size;
        height: $size;
        display: inline-block;
        vertical-align: middle;
        border-radius: $borderRadius;
        box-shadow: $shadow;
        border: 1px solid #dedede;

        &-img {
            display: block;
            width: 100%;
            height: 100%;
        }
    }
</style>