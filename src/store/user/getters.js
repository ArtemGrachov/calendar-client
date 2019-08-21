export default {
    isAuthorized: state => Boolean(state.token),
    data: state => state.user
}
