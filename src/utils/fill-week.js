export default function(date) {
    const result = [];
    const iDate = date.clone();
    iDate.date(iDate.date() - (iDate.day() || 7));

    for(let i = 1; i < 8; i++) {
        iDate.add(1, 'days');
        result.push(iDate.clone());
    }

    return result;
}