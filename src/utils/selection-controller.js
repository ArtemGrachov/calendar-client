import moment from 'moment';

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
        switch(event.type) {
            case 'create': {
                const minutes = this.minutesToGrid(this.posToMinutes(event.y)); 
                this.selection = this.createSelection(event.date, minutes);
                this.sendSelection(this.selection);
                this.mode = 'updateEnd';
                this.watchPosition();
                break;
            }
            case 'newPosition': {
                this.newPosition(event);
                break;
            }
            case 'changeEnd': {
                this.watchPosition();
                this.mode = 'updateEnd';
                break;
            }
            case 'moveTop': {
                this.watchPosition();
                this.mode = 'updatePos';
                break;
            }
        }
    }

    watchPosition() {
        this.watchers.forEach(watcher => watcher('watch'));

        const listener = () => {
            this.listenMouseUp();
            document.removeEventListener('mouseup', listener);
        };

        document.addEventListener('mouseup', listener);
    }

    newPosition(event) {
        const minutes = this.minutesToGrid(this.posToMinutes(event.y));
        switch (this.mode) {
            case 'updateEnd': {
                this.selection = this.updateSelectionEnd(event.date, minutes);
                break;
            }
            case 'updatePos': {
                this.selection = this.updateSelectionPos(event.date, minutes);
                break;
            }
        }
        this.sendSelection(this.selection);
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

    updateSelectionPos(date, min) {
        const length = moment.duration(
            this.selection.end.diff(this.selection.start)
        ).asMinutes();

        const start = date
            .clone()
            .startOf('day');

        start.hours(this.startHour);
        start.add(min, 'minutes');

        const end = start
            .clone()
            .add(length, 'minutes')

        return { start, end };
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
