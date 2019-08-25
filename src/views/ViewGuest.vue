<template>
    <div class="page">
        <header class="header p-3 mb-5">
            <div class="title">
                Calendar App
            </div>
        </header>
        <router-view></router-view>
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

<style lang="scss" scoped>
    @import '../styles/variables.scss';

    .header {
        box-shadow: $shadow;
        position: relative;

        .title {
            color: rgb(0, 119, 255);
            font-weight: bold;
            border-bottom: none;
            text-shadow: 0 2px 3px rgba(#4fe970, 1);
        }
    }

    .footer {
        box-shadow: $shadow;
    }
</style>
