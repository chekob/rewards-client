import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import Rewards from './components/rewards.vue';
import PrizeDetail from './components/prizeDetail.vue';
import store from './store/store';

Vue.use(VueRouter);

Vue.config.productionTip = false;

// const token = localStorage.getItem('user-token')
// if (token) {
//   axios.defaults.headers.common['Authorization'] = token
// }

// const ifNotAuthenticated = (to, from, next) => {
//   if (!store.getters.isAuthenticated) {
//     next()
//     return
//   }
//   next('/')
// }

// const ifAuthenticated = (to, from, next) => {
//   if (store.getters.isAuthenticated) {
//     next()
//     return
//   }
//   next('/login')
// }

const router = new VueRouter({
  // mode: 'history',
  routes: [
    {
      path: '/',
      component: Rewards,
      name: 'Rewards'
    },
    {
      path: '/prize/detail/:id',
      component: PrizeDetail,
      name: 'PrizeDetail',
      props: false
    },
  ]
})

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
