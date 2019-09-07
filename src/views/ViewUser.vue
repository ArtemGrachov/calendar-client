<template>
    <div class="page">
        <UserHeader></UserHeader>
        <div class="container pt-3 py-5">
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
        </div>
        <footer class="footer p-3 mt-auto text-center">
            Developed by
            <a
                href="https://github.com/ArtemGrachov/"
                target="_blank"
            >
                Artem Grachov
            </a>
        </footer>
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
