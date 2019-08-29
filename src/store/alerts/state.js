import state from '../list/state';

export default function() {
    return {
        ...state(),
        counter: 0
    }
}
