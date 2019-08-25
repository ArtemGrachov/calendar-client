<template>
    <div>
        <UserHeader></UserHeader>
        <CalendarNav></CalendarNav>
        <div class="container py-3">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import UserHeader from '../components/UserHeader';
import CalendarNav from '../components/CalendarNav';

export default {
    components: {
        UserHeader,
        CalendarNav
    }
}
</script>

<style lang="scss" scoped>

</style>