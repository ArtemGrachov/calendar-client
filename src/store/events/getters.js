export default {
    byRange: state => range => state.items.filter(
        (event) => {
            const start = new Date(event.start);
            const end = new Date(event.end);
            return start < range.end && end > range.start;
        }
    )
}
