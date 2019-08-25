export default function(date) {
    const result = [];
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() - (newDate.getDay() || 7));

    for(let i = 1; i < 8; i++) {
        newDate.setDate(newDate.getDate() + i);
        result.push(new Date(newDate));
    }

    return result;
}