import {
    LIST_MUTATIONS_SET_ITEMS,
    LIST_MUTATIONS_UPSERT_ITEMS,
    LIST_MUTATIONS_ADD_ITEMS,
    LIST_MUTATIONS_ADD_ITEM,
    LIST_MUTATIONS_UPDATE_ITEM,
    LIST_MUTATIONS_REMOVE_ITEM,
    LIST_MUTATIONS_SET_ITEM_PROCESSING,
    LIST_MUTATIONS_SET_PROCESSING,
    LIST_MUTATIONS_CLEAR,
    LIST_MUTATIONS_UPSERT_ITEM
} from './mutation-types';

function findAndUpdate(items, id, update, arg) {
    const itemIndex = items.findIndex(item => item.id === id);
    const item = items[itemIndex];

    const updated = update(item, arg);

    const newItems = [...items];
    newItems[itemIndex] = updated;

    return newItems;
}

export default {
    [LIST_MUTATIONS_SET_ITEMS](state, payload) {
        state.items = payload.items;
    },
    [LIST_MUTATIONS_ADD_ITEMS](state, payload) {
        state.items = [...state.items, ...payload.items];
    },
    [LIST_MUTATIONS_ADD_ITEM](state, payload) {
        state.items = [...state.items, payload.item];
    },
    [LIST_MUTATIONS_UPSERT_ITEM](state, payload) {
        state.items = [
            ...state.items.filter(item => item.id !== payload.item.id),
            payload.item
        ];
    },
    [LIST_MUTATIONS_UPSERT_ITEMS](state, payload) {
        const map = {};
        state.items.forEach(handler);
        payload.items.forEach(handler);

        const items = [];

        for (let key in map) {
            items.push(map[key]);
        }

        state.items = items;

        function handler(item) {
            map[item.id] = item;
        }
    },
    [LIST_MUTATIONS_UPDATE_ITEM](state, payload) {
        state.items = findAndUpdate(
            state.items,
            payload.id,
            payload.update,
            payload.arg
        );
    },
    [LIST_MUTATIONS_REMOVE_ITEM](state, payload) {
        state.items = state.items.filter(item => item.id !== payload.id);
    },
    [LIST_MUTATIONS_SET_ITEM_PROCESSING](state, payload) {
        state.items = findAndUpdate(
            state.items,
            payload.id,
            update,
            payload.processing
        );

        function update(item, processing) {
            return {
                ...item,
                processing
            };
        }
    },
    [LIST_MUTATIONS_SET_PROCESSING](state, payload) {
        state.processing = payload;
    },
    [LIST_MUTATIONS_CLEAR](state) {
        state.items = [];
    }
};
