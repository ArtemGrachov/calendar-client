import Modal from '../modal';
import ModalEventDetails from '../components/ModalEventDetails';
import icons from '../config/icons';

export default {
    props: {
        event: Object
    },
    computed: {
        icon() {
            return icons.find(icon => icon.name === this.event.icon);
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
