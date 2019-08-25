export default function(date) {
    const result = [];
    const newDate = new Date(date);
    newDate.setDate(1);
    const month = newDate.getMonth();

    newDate.setDate(newDate.getDate() - (newDate.getDay() || 7));

    while (newDate.getMonth() <= month || newDate.getDay() !== 0) {
        newDate.setDate(newDate.getDate() + 1);
        result.push(new Date(newDate));
    }

    return result;
}
