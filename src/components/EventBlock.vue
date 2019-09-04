<template>
    <div
        class="event px-2 py-1"
        :style="{ borderColor: event.color }"
    >
        <a
            class="details-link"
            href="#"
            @click.prevent="openDetails"
        >
            <div class="event-time mb-1">
                {{ event.start | moment('HH:mm') }} -
                {{ event.end | moment('HH:mm') }}
            </div>
            <div class="event-title">
                <span
                    class="em event-icon"
                    :class="icon.class"
                    v-if="event.icon"
                ></span>
                {{ event.title }}
            </div>

        </a>
    </div>
</template>

<script>
import eventBlockMixin from '../mixins/event-block-mixin';

export default {
    mixins: [eventBlockMixin]
}
</script>

<style lang="scss" scoped>
    @import '../styles/variables';

    .event {
        border-top: 4px solid $lightgrey;
        border-bottom: 4px solid $lightgrey;
        border-radius: $borderRadius;
        box-shadow: $shadow;
        text-align: center;
        font-size: 14px;
        overflow: hidden;

        &-time {
            font-size: 12px;
            color: $grey;
            font-weight: normal;
        }

        &-title {
            margin: auto;
            text-align: center;
            font-weight: bold;
        }

        &-icon {
            width: 1em;
            height: 1em;
            vertical-align: top;
        }
    }

    .details-link {
        color: black;
    }
</style>