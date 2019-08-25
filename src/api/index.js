import Axios from 'axios';
import AuthClient from "./auth";
import UserClient from "./user";
import EventsClient from "./events";
import { apiDomain } from "../config";

const axios = Axios.create();

const auth = new AuthClient(apiDomain, axios);
const user = new UserClient(apiDomain, axios);
const events = new EventsClient(apiDomain, axios);

export { auth };
export { user };
export { events };
