<template>
    <div>
        <UserHeader></UserHeader>
        <div class="container py-3">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import UserHeader from '../components/UserHeader';

export default {
    components: {
        UserHeader
    }
}
</script>

<style lang="scss" scoped>

</style>