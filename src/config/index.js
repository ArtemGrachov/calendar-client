import * as processing from './processing';

export const apiDomain = process.env.VUE_APP_API_DOMAIN;
export const wsDomain = process.env.VUE_APP_WS_DOMAIN;
export const alertLifetime = 5000;
export { processing };