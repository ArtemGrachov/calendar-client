<template>
    <div>
        <UserHeader></UserHeader>
        <div class="container pt-3 py-5">
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