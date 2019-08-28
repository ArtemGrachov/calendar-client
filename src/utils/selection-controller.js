export default class SelectionController {
    mode = 'idle';

    watchers = [];

    selection = null;

    constructor(
        startHour,
        endHour,
        stepLength,
        stepPx,
        minStep,
        selectionHandler
    ) {
        this.startHour = startHour;
        this.endHour = endHour;
        this.stepLength = stepLength;
        this.stepPx = stepPx;
        this.minStep = minStep;
        this.selectionHandler = selectionHandler;
    }

    event(event) {
        this.mode = event.type;

        switch(event.type) {
            case 'mousedown': {
                const minutes = this.minutesToGrid(this.posToMinutes(event.y)); 
                this.selection = this.createSelection(event.date, minutes);
                this.sendSelection(this.selection);
                this.watchers.forEach(watcher => watcher('watch'));
                this.mode = 'updateEnd';

                const listener = () => {
                    this.listenMouseUp();
                    document.removeEventListener('mouseup', listener);
                };

                document.addEventListener('mouseup', listener);

                break;
            }
            case 'mousemove': {
                const minutes = this.minutesToGrid(this.posToMinutes(event.y)); 
                this.selection = this.updateSelectionEnd(event.date, minutes);
                this.sendSelection(this.selection);
                break;
            }
        }
        // create
        // changeEnd
        // moveStart
    }

    createSelection(date, min) {
        const start = date
            .clone()
            .startOf('day');

        start.hours(this.startHour);
        start.add(min, 'minutes');

        const end = start
            .clone()
            .add(this.stepLength, 'minutes');

        return { start, end };
    }

    sendSelection(selection) {
        if (selection.start.isBefore(selection.end)) {
            this.selectionHandler(this.selection);
        } else if (selection.start.isAfter(selection.end)) {
            this.selectionHandler({
                start: this.selection.end,
                end: this.selection.start
            });
        }
    }

    updateSelectionEnd(date, min) {
        const end = date
            .clone()
            .startOf('day');

        end.hours(this.startHour);
        end.add(min, 'minutes');

        return {
            ...this.selection,
            end
        }
    }

    posToMinutes(pos) {
        return pos / this.stepPx * this.minStep;
    }

    minutesToGrid(minutes) {
        return minutes - minutes % this.minStep;
    }

    watch(callback) {
        this.watchers.push(callback);
        return () =>
            this.watchers = this.watchers.filter(cb => cb !== callback);
    }

    listenMouseUp() {
        this.mode = 'idle';
        this.watchers.forEach(watcher => watcher('idle'));
    }
}
