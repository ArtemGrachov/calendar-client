export default {
    byId: state => id => state.items.find(item => item.id === id)
}
