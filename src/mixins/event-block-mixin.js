import Modal from '../modal';
import ModalEventDetails from '../components/ModalEventDetails';
import icons from '../config/icons';
import { PROCESSING_PENDING } from '../config/processing';

export default {
    props: {
        event: Object
    },
    computed: {
        icon() {
            return icons.find(icon => icon.name === this.event.icon);
        },
        pending() {
            return this.event.processing === PROCESSING_PENDING
        }
    },
    methods: {
        openDetails() {
            Modal.openModal({
                component: ModalEventDetails,
                data: this.event.id
            });
        }
    }
}
