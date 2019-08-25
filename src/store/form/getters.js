import { PROCESSING_PENDING } from '../../config/processing';

export default {
    pending: (state) => state.processing === PROCESSING_PENDING,
}
