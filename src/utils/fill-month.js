export default function(date) {
    const result = [];
    const iDate = date.clone();
    const month = iDate.month();

    iDate.date(1);
    iDate.date(iDate.date() - (iDate.day() || 7));

    while (iDate.month() <= month || iDate.day() !== 0) {
        iDate.add(1, 'days');
        result.push(iDate.clone());
    }

    return result;
}
