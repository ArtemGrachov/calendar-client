export default {
    byId: state => id => state.items.find(item => item.id === id),
    byIds: state => ids => state.items.filter(item => ids.indexOf(item.id) !== -1)
}
