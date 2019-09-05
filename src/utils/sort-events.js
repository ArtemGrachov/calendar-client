import moment from 'moment';

export default function (eventA, eventB) {
    const dA = moment(eventA.start);
    const dB = moment(eventB.start);

    return dA.isAfter(dB) ? 1 : dB.isAfter(dA) ? -1 : 0;
}
