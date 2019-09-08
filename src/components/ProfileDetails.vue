<template>
    <div class="profile">
        <div class="avatar mb-3">
            <img
                class="avatar-img"
                v-if="user.avatarUrl"
                :src="user.avatarUrl"
            />
            <img
                class="avatar-img"
                v-else src="../assets/avatar-blank.png"
                alt="No avatar"
            >
        </div>
        <div class="title mb-3">
            {{ user.firstname }} {{ user.lastname }}
        </div>
        <div class="email">
            <strong>Email: </strong>
            {{ user.email }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        user: Object
    }
}
</script>

<style lang="scss" scoped>
    @import '../styles/variables';

    .avatar {
        width: 120px;
        height: 120px;
        margin: auto;

        &-img {
            display: block;
            width: 100%;
            height: 100%;
            border-radius: $borderRadius;
        }
    }
</style>