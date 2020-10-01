import Vue from 'vue'
import VueRouter from 'vue-router'
import VCalendar from 'v-calendar'
import App from './App.vue'
import Home from './components/Home.vue'

Vue.use(VCalendar);
Vue.use(VueRouter);

Vue.config.productionTip = false;

const router =  new VueRouter({
    mode: 'history',
    routes: [
        {
          path: "/",
          redirect: '/search?',
          component: App,
          children: [
            {
            path: '/:searchProperties',
            name: "Body",
            component: Home,
            props: route => ({ query: route.query })
          },
        ]
      },
    ],
    scrollBehavior () {
      return { x: 0, y: 0 }
    }
});

new Vue({
  router,
  render: h => h(App),
})
 .$mount('#app')
