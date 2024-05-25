export default {
    namespaced: true,
    state: {
        authenticated: false,
        authUser: null,
        authToken: null,
        authPermission: null,
        authPhoto: null
    },
    getters: {
        // user:(state) => state.authUser,
        // token:(state) => state.authToken,
        // permission:(state) => state.authPermission,
        // photo:(state) => state.authPhoto
        auth(state) {
            return state.authenticated;
        },
        user(state) {
            return state.authUser;
        },
        token(state) {
            return state.authToken;
        },
        permission(state) {
            return state.authPermission;
        },
        photo(state) {
            return state.authPhoto;
        },
    },
}
