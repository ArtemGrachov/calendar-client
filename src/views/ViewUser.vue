<template>
    <div>
        <UserHeader></UserHeader>
        <router-view></router-view>
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