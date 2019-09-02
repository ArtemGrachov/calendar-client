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
        <div class="row mb-3">
            <div class="col-12">
                <div class="description py-4 px-5">
                    {{ event.description }}
                </div>
            </div>
        </div>
        <div class="row align-items-center mb-4">
            <div class="col-4 col-sm-3 col-md-2">
                <strong>Owner:</strong> 
            </div>
            <div class="col-8 col-sm-9 col-md-10">
                <UserBlock :user="owner"></UserBlock>
            </div>
        </div>
        <div class="row mb-4" v-if="users.length">
            <div class="col-12">
                <strong class="d-block mb-2">
                    Members:
                </strong>
                <UserBlock
                    class="mb-3"
                    v-for="user in users"
                    :key="user.id"
                    :user="user"
                ></UserBlock>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-12 text-right">
                <button
                    class="button-flat mr-4"
                    @click="leave"
                    v-if="!iAmOnwer"
                >
                    Leave
                </button>
                <button
                    class="button-flat mr-4"
                    @click="invite"
                    v-if="iAmOnwer"
                >
                    Invite
                </button>
                <button
                    class="button-flat mr-4"
                    @click="edit"
                    v-if="iAmOnwer"
                >
                    Edit
                </button>
                <button
                    class="button-flat"
                    @click="deleteEvent"
                    v-if="iAmOnwer"
                >
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
import ModalInvite from './ModalInvite';
import UserBlock from './UserBlock';
import {
    EVENTS_ACTIONS_DELETE_EVENT,
    EVENTS_ACTIONS_LEAVE_EVENT
} from '../store/events/action-types';

export default {
    components: {
        UserBlock
    },
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
        },
        users() {
            return this.$store.getters['users/byIds'](this.event.users);
        },
        owner() {
            return this.$store.getters['users/byId'](this.event.owner);
        },
        iAmOnwer() {
            return this.$store.getters['events/iAmOwner'](this.event);
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
        },
        deleteEvent() {
            this.$store.dispatch(
                'events/' + EVENTS_ACTIONS_DELETE_EVENT,
                this.event
            );
        },
        leave() {
            this.$store.dispatch(
                'events/' + EVENTS_ACTIONS_LEAVE_EVENT,
                this.event
            );
        },
        invite() {
            Modal.openModal({
                component: ModalInvite,
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
