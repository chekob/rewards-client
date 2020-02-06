import axios from 'axios';

const url = 'api/users/';

const state = {
    token: localStorage.getItem('user-token') || '',
    status: '',
    userName: '',
};

const getters = {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
    getUserName: state => state.userName,
};

const actions = {
    auth_login({ commit }, user) {
        return new Promise((resolve, reject) => {
            axios.post(`${url}auth/`, {
                email: user.email,
                password: user.password,
            }).then(result => {
                const token = result.data._id
                localStorage.setItem('user-token', token) // store the token in localstorage
                commit('auth_success', result.data);
                // you have your token, now log in your user :)
                // dispatch('auth')
                resolve(result);
            }, error => {
                commit('auth_error', error)
                localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
                reject(error)
            });
        })
    },
    logout({ commit }) {
        return new Promise((resolve) => {
            commit('auth_logout');
            localStorage.removeItem('user-token'); // clear your user's token from localstorage
            resolve();
        })
    },
};

const mutations = {
    auth: (state) => {
        state.status = 'success';
    },
    auth_success: (state, data) => {
        state.status = 'success';
        state.token = data._id;
        state.userName = data.name;
    },
    auth_error: (state) => {
        state.status = 'error';
    },
    auth_logout: (state) => {
        state.status = '';
        state.token = '';
        state.userName = '';
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}