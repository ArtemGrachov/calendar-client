<template>
    <nav class="py-2 px-3">
        <div class="container d-flex align-items-center">
            <div class="mr-auto">
                <button
                    class="button-transparent button-round"
                    @click="prev"
                >
                    <i class="material-icons">
                        keyboard_arrow_left
                    </i>
                </button>
                <button
                    class="button-transparent mx-3"
                    @click="today"
                >
                    Go today
                </button>
                <button
                    class="button-transparent button-round"
                    @click="next"
                >
                    <i class="material-icons">
                        keyboard_arrow_right
                    </i>
                </button>
            </div>
            <button class="button-transparent mx-1" @click="changeMode('day')">
                Day
            </button>
            <button class="button-transparent mx-1" @click="changeMode('week')">
                Week
            </button>
            <button class="button-transparent mx-1" @click="changeMode('month')">
                Month
            </button>
            <button class="button-transparent mx-1" @click="changeMode('year')">
                Year
            </button>
        </div>
    </nav>
</template>

<script>
export default {
    methods: {
        changeMode(mode) {
            this.$emit('mode', mode);
        },
        next() {
            this.$emit('next');
        },
        prev() {
            this.$emit('prev');
        },
        today() {
            this.$emit('today');
        }
    }
}
</script>
