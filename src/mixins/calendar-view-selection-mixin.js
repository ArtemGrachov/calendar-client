import SelectionController from '../utils/selection-controller';

export default {
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
        isSelectionInRange(date, selection) {
            const { start, end } = this.dateRange(date);

            return selection.start.isBefore(end) && selection.end.isAfter(start);
        }
    }
}