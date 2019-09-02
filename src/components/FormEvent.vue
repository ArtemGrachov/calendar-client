<template>
    <form class="relative" @submit.prevent="submit">
        <div class="row mb-3">
            <div class="col-12">
                <label for="title" class="mb-2">Title:</label>
                <input
                    type="text"
                    name="title"
                    id="title"
                    v-model="form.title"
                >
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-12 col-sm-6">
                <label for="start" class="mb-2">Starts at:</label>
                <input
                    type="datetime-local"
                    name="start"
                    id="start"
                    v-model="form.start"
                >
            </div>
            <div class="col-12 col-sm-6">
                <label for="end" class="mb-2">Ends at:</label>
                <input
                    type="datetime-local"
                    name="end"
                    id="end"
                    v-model="form.end"
                >
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-12">
                <label for="description" class="mb-2">Description:</label>
                <textarea
                    name="description"
                    id="description"
                    rows="10"
                    v-model="form.description"
                ></textarea>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-12 col-sm-6">
                <label for="icon" class="mb-2">Icon:</label>
                <multiselect
                    name="icon"
                    id="icon"
                    :options="icons"
                    :trackBy="'label'"
                    :label="'label'"
                    v-model="formIcon"
                >
                    <template slot="singleLabel" slot-scope="props">
                        <i class="em" :class="props.option.class" v-if="props.option.class"></i>
                        {{ props.option.label }}
                    </template>
                    <template slot="option" slot-scope="props">
                        <i class="em" :class="props.option.class" v-if="props.option.class"></i>
                        {{ props.option.label }}
                    </template>
                </multiselect>
            </div>
            <div class="col-12 col-sm-6">
                <label for="color" class="mb-2">Color:</label>
                <input
                    type="color"
                    name="color"
                    id="color"
                    v-model="form.color"
                >
            </div>
        </div>
        <div
            class="form-message mb-2"
            v-if="message"
        >
            {{ message }}
        </div>
        <FormErrors
            :errors="errors"
            v-if="errors.length"
            class="mb-3"
        ></FormErrors>
        <button type="submit" class="button-success">Submit</button>
    </form>
</template>

<script>
import {
    FORM_ACTIONS_SUBMIT,
    FORM_ACTIONS_CLEAR
} from '../store/form/action-types';
import Multiselect from 'vue-multiselect'
import FormErrors from './FormErrors';
import icons from '../config/icons';
import moment from 'moment';

export default {
    props: {
        event: Object,
    },
    components: {
        Multiselect,
        FormErrors
    },
    computed: {
        errors() {
            return this.$store.state.editEvent.errors;
        },
        message() {
            return this.$store.state.editEvent.message;
        },
        pending() {
            return this.$store.getters['editEvent/pending'];
        }
    },
    data() {
        return {
            form: {
                title: '',
                start: '',
                end: '',
                description: '',
                icon: '',
                color: ''
            },
            formIcon: null,
            icons
        }
    },
    methods: {
        submit() {
            this.$store.dispatch(
                'editEvent/' + FORM_ACTIONS_SUBMIT,
                {
                    ...this.form,
                    icon: this.formIcon ? this.formIcon.name : ''
                }
            );
        }
    },
    created() {
        this.$store.dispatch('editEvent/' + FORM_ACTIONS_CLEAR);
        Object.assign(
            this.form,
            {
                ...this.event,
                start: moment(this.event.start).format('YYYY-MM-DDTHH:mm'),
                end: moment(this.event.end).format('YYYY-MM-DDTHH:mm')
            }
        );

        if (this.event.icon) {
            this.formIcon = icons.find(icon => icon.name === this.event.icon);
        }
    }
}
</script>