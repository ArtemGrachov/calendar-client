<template>
    <div
        class="empty p-3 text-center"
        :key="'empty'"
    >
        <i class="material-icons d-block mb-2">
            notifications_none
        </i>
        <p class="mb-0">
            There are no notifications
        </p>
    </div>
</template>

<script>
export default { }
</script>

<style lang="scss" scoped>
    @import '../styles/variables';

    .empty {
        font-size: 16px;
        color: $blue;
    }
</style>