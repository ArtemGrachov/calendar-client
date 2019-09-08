import Axios from 'axios';
import AuthClient from './auth';
import UserClient from './user';
import EventsClient from './events';
import NotificationsClient from './notifications';
import UsersClient from './users';
import { apiDomain } from '../config';

const axios = Axios.create();

const auth = new AuthClient(apiDomain, axios);
const user = new UserClient(apiDomain, axios);
const events = new EventsClient(apiDomain, axios);
const notifications = new NotificationsClient(apiDomain, axios);
const users = new UsersClient(apiDomain, axios);

export { axios };
export { auth };
export { user };
export { events };
export { notifications };
export { users };
