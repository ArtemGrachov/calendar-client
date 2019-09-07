<template>
    <form
        class="relative"
        @submit.prevent="submit"
    >
        <div class="preloader form-preloader" v-if="pending"></div>
        <div class="row mb-3">
            <div class="col-12">
                <label for="title" class="mb-2">
                    Title:
                    <span class="required">
                        *
                    </span>
                </label>
                <input
                    class="mb-2"
                    type="text"
                    name="title"
                    id="title"
                    v-model="form.title"
                    @blur="$v.form.title.$touch()"
                    :disabled="pending"
                >
                <template v-if="$v.form.title.$error">
                    <p class="field-error" v-if="!$v.form.title.required">
                        Title is required
                    </p>
                </template>
            </div>
        </div>
        <div class="row mb-3">
            <div class="col-12 col-sm-6">
                <label for="start" class="mb-2">
                    Starts at:
                    <span class="required">
                        *
                    </span>
                </label>
                <input
                    class="mb-2"
                    type="datetime-local"
                    name="start"
                    id="start"
                    v-model="form.start"
                    @blur="$v.form.start.$touch()"
                    :disabled="pending"
                >
                <template v-if="$v.form.start.$error">
                    <p class="field-error" v-if="!$v.form.start.required">
                        'Starts at' field is required
                    </p>
                    <p class="field-error" v-if="!$v.form.start.dateCompare">
                        'Starts at' time must be before 'Ends at'
                    </p>
                </template>
            </div>
            <div class="col-12 col-sm-6">
                <label for="end" class="mb-2">
                    Ends at:
                    <span class="required">
                        *
                    </span>
                </label>
                <input
                    class="mb-2"
                    type="datetime-local"
                    name="end"
                    id="end"
                    v-model="form.end"
                    @blur="$v.form.end.$touch()"
                    :disabled="pending"
                >
                <template v-if="$v.form.end.$error">
                    <p class="field-error" v-if="!$v.form.end.required">
                        'Ends at' field is required
                    </p>
                    <p class="field-error" v-if="!$v.form.end.dateCompare">
                        'Ends at' time must be after 'Starts at'
                    </p>
                </template>
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
                    :disabled="pending"
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
                    :disabled="pending"
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
                    :disabled="pending"
                >
            </div>
        </div>
        <div
            class="form-message mb-2 p-3"
            v-if="message"
        >
            {{ message }}
        </div>
        <FormErrors
            :errors="errors"
            v-if="errors.length"
            class="mb-3 p-3"
        ></FormErrors>
        <button
            type="submit"
            class="button-success"
            :disabled="pending || $v.form.$invalid"
        >
            Submit
        </button>
    </form>
</template>

<script>
import { FORM_ACTIONS_CLEAR } from '../store/form/action-types';
import Multiselect from 'vue-multiselect'
import FormErrors from './FormErrors';
import icons from '../config/icons';
import moment from 'moment';
import formMixinFactory from '../mixins/form-mixin-factory';
import { required } from 'vuelidate/lib/validators';
import dateCompare from '../utils/date-compare-validator';

export default {
    mixins: [
        formMixinFactory(
            'editEvent',
            () => ({
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
            })
        )
    ],
    props: {
        event: Object,
    },
    components: {
        Multiselect,
        FormErrors
    },
    computed: {
        formData() {
            return {
                ...this.form,
                icon: this.formIcon ? this.formIcon.name : ''
            }
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
    },
    validations: {
        form: {
            title: {
                required
            },
            start: {
                required,
                dateCompare: dateCompare('end', 'isBefore')
            },
            end: {
                required,
                dateCompare: dateCompare('start', 'isAfter')
            },
        }
    }
}
</script>
