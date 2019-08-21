import axios from 'axios';
import { apiDomain } from '../config';

export default {
    path: apiDomain + 'auth/',
    async login(payload) {
        return axios.post(this.path + 'login', payload)
    },
    async registration(payload) {
        return axios.post(this.path + 'ragistration', payload);
    }
}