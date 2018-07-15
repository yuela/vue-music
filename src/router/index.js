import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

import Home from '../components/Home.vue'
// import Album from '../components/Album.vue'
import New from '../components/New.vue'
import Search from '../components/Search.vue'
import About from '../components/About.vue'
import Music from '../components/Music.vue'

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/new',
      name: 'new',
      component: New
    },
    {
      path: '/search',
      name:'search',
      component: Search,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/music',
      name: 'music',
      component: Music,
    },
  ]
});
