export default function(date) {
    const start = date
        .clone()
        .startOf('month')
        .startOf('isoWeek');
    const end = date
        .clone()
        .endOf('month')
        .endOf('isoWeek');

    const result = [];

    const iDate = start.clone();

    while (iDate.isSameOrBefore(end, 'day')) {
        result.push(iDate.clone());
        iDate.add(1, 'day');
    }

    return result;
}
