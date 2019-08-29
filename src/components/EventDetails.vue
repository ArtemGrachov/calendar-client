<template>
    <div class="event-details">
        <div class="row mb-3">
            <div class="col-12">
                <div class="title">
                    <span
                        class="em"
                        :class="icon.class"
                        v-if="event.icon"
                    >
                        
                    </span>
                    {{ event.title }}
                </div>
            </div>
        </div>
        <div class="row mb-3" v-if="!diffDates">
            <div class="col-12">
                <div class="date-lg">
                    <span class="date-inner">
                        {{ event.start | moment('MMMM Do, YYYY') }}
                    </span>
                </div>
            </div>
        </div>
        <div class="row mb-4">
            <div class="col-12 col-sm-6">
                <div class="date-sm" v-if="diffDates">
                    <span class="date-inner">
                        {{ event.start | moment('MMMM, DD') }}
                    </span>
                </div>
                <div class="time">
                    {{ event.start | moment('HH:mm') }}
                </div>
            </div>
            <div class="col-12 col-sm-6">
                <div class="date-sm" v-if="diffDates">
                    <span class="date-inner">
                        {{ event.end | moment('MMMM, DD') }}
                    </span>
                </div>
                <div class="time">
                    {{ event.end | moment('HH:mm') }}
                </div>
            </div>
        </div>
        <div class="row mb-4">
            <div class="col-12">
                <div class="description py-4 px-5">
                    {{ event.description }}
                </div>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-12 text-right">
                <button class="button-flat mr-4" @click="edit">
                    Edit
                </button>
                <button class="button-flat">
                    Delete
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import icons from '../config/icons';
import Modal from '../modal';
import ModalEventForm from './ModalEventForm';

export default {
    props: {
        event: Object
    },
    computed: {
        diffDates() {
            return moment(this.event.start).format('DD.MM.YYYY') !==
                moment(this.event.end).format('DD.MM.YYYY');
        },
        icon() {
            return icons.find(icon => icon.name === this.event.icon);
        }
    },
    methods: {
        edit() {
            Modal.openModal({
                component: ModalEventForm,
                data: {
                    ...this.event
                }
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../styles/variables';

    .date {
        &-lg {
            font-size: 20px;
            text-align: center;
            color: $orange;
        }

        &-sm {
            text-align: center;
            color: $orange;
        }

        &-inner {
            border-bottom: 1px dotted $violet;
        }
    }

    .time {
        text-align: center;
        color: $violet;
        font-size: 18px;
    }

    .description {
        border-radius: $borderRadius * 2;
        border: 1px solid #f4f4f4;
    }
</style>