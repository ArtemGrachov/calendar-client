<template>
    <div
        class="avatar"
        :style="{ backgroundImage: avatarStyle }"
    >
    </div>
</template>

<script>
export default {
    props: {
        user: Object
    },
    computed: {
        avatarStyle() {
            return `url(${this.user.avatarUrl})`;
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
        background-size: cover;
        background-position: center;
        box-shadow: $shadow;
        border: 1px solid #dedede;
    }
</style>