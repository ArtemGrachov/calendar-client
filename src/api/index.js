import AuthClient from "./auth";
import { apiDomain } from "../config";
import Axios from 'axios';
import { UserClient } from "./user";

const axios = Axios.create();

const auth = new AuthClient(apiDomain, axios);
const user = new UserClient(apiDomain, axios);

export { auth };
export { user };
