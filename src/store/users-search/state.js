import state from '../form/state';

export default function() {
    return {
        ...state(),
        user: null
    }
}
