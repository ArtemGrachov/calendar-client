<template>
    <nav class="px-3 mb-5">
        <div class="container">
            <div class="row">
                <div class="col-12 col-lg-4 mb-3 mb-lg-0 left">
                    <button
                        class="button-transparent button-round"
                        @click="prev"
                    >
                        <i class="material-icons">
                            keyboard_arrow_left
                        </i>
                    </button>
                    <button
                        class="button-transparent mx-1 mx-sm-3"
                        @click="today"
                    >
                        Today
                    </button>
                    <button
                        class="button-transparent button-round"
                        @click="next"
                    >
                        <i class="material-icons">
                            keyboard_arrow_right
                        </i>
                    </button>
                    <div class="d-md-none mt-3">
                        <button
                            class="button-transparent button-round toggle-mode-controls"
                            :class="{ show: showMode }"
                            @click="toggleShowControls"
                        >
                            <i class="material-icons">
                                keyboard_arrow_down
                            </i>
                        </button>
                    </div>
                </div>
                <div
                    class="col-12 col-lg-8 right mode-controls"
                    v-show="showMode || !isMd"
                >
                    <button
                        class="mode-button button-transparent button-grey mx-md-1 my-2 my-md-0"
                        @click="changeMode('day')"
                    >
                        Day
                    </button>
                    <button
                        class="mode-button button-transparent button-grey mx-md-1 my-2 my-md-0"
                        @click="changeMode('week')"
                    >
                        Week
                    </button>
                    <button
                        class="mode-button button-transparent button-grey mx-md-1 my-2 my-md-0"
                        @click="changeMode('month')"
                    >
                        Month
                    </button>
                    <button
                        class="mode-button button-transparent button-grey mx-sm-1"
                        @click="changeMode('year')"
                    >
                        Year
                    </button>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            showMode: false,
            isMd: false
        }
    },
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
        },
        toggleShowControls() {
            this.showMode = !this.showMode;
        }
    },
    created() {
        const cmp = this;

        this.$options.widthListener = function() {
            if (window.innerWidth >= 768) {
                cmp.isMd = false;
            } else {
                cmp.isMd = true;
            }
        }

        window.addEventListener('resize', this.$options.widthListener);
    },
    destroyed() {
        window.removeEventListener('resize', this.$options.widthListener);
    }
}
</script>

<style lang="scss" scoped>
    @import '../styles/variables';

    .left,
    .right {
        text-align: center;
    }

    .left {
        @media (min-width: 768px) {
            text-align: left;
        }
    }

    .right {
        @media (min-width: 768px) {
            text-align: right;
        }
    }

    .mode-button {
        display: block;
        width: 100%;

        @media (min-width: 768px) {
            width: auto;
            display: inline-block;
        }
    }

    .material-icons {
        transition: $transition;
    }

    .toggle-mode-controls {
        &.show {
            .material-icons {
                transform: rotate(180deg);
            }
        }
    }
</style>
