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
                    v-model="form.icon"
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
        <button type="submit" class="button-success">Submit</button>
    </form>
</template>

<script>
import { FORM_ACTIONS_SUBMIT } from '../store/form/action-types';
import Multiselect from 'vue-multiselect'
import icons from '../config/icons';

export default {
    props: {
        event: Object,
    },
    components: {
        Multiselect
    },
    computed: {
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
            icons
        }
    },
    methods: {
        submit() {
            this.$store.dispatch(
                'editEvent/' + FORM_ACTIONS_SUBMIT,
                {
                    ...this.form,
                    icon: this.form.icon ? this.form.icon.name : ''
                }
            );
        }
    },
    created() {
        this.form.start = this.event.start.format('YYYY-MM-DDTHH:mm');
        this.form.end = this.event.end.format('YYYY-MM-DDTHH:mm');
    }
}
</script>