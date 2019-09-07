import SelectionController from '../utils/selection-controller';

export default {
    props: {
        selectionComponent: Object
    },
    data() {
        return {
            selection: null
        }
    },
    computed: {
        selectionController() {
            return this.$options.selectionController;
        }
    },
    created() {
        this.$options.selectionController = new SelectionController(
            this.start,
            this.end,
            this.stepMin,
            this.stepHeightPx,
            this.stepMin,
            sel => this.updateSelection(sel)
        )
    },
    methods: {
        updateSelection(selection) {
            this.selection = selection;
        },
        closeSelection() {
            this.selection = null;
        }
    }
}