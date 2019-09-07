import moment from 'moment';

export default function(anotherFieldName, compareMethod) {
    return function(value, vm) {
        return moment(value)[compareMethod](moment(vm[anotherFieldName]))
    }
}
