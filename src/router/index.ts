import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/presentation',
    name: 'Presentation',
    component: () => import(/* webpackChunkName: "presentation" */ '../views/Presentation.vue')
  },
  {
    path: '/presentation/1',
    component: () => import(/* webpackChunkName: "slide-1" */ '../views/slides/1.vue')
  },
  {
    path: '/presentation/2',
    component: () => import(/* webpackChunkName: "slide-2" */ '../views/slides/2.vue')
  },
  {
    path: '/presentation/3',
    component: () => import(/* webpackChunkName: "slide-3" */ '../views/slides/3.vue')
  },
  {
    path: '/presentation/4',
    component: () => import(/* webpackChunkName: "slide-4" */ '../views/slides/4.vue')
  },
  {
    path: '/presentation/5',
    component: () => import(/* webpackChunkName: "slide-5" */ '../views/slides/5.vue')
  },
  {
    path: '/presentation/6',
    component: () => import(/* webpackChunkName: "slide-6" */ '../views/slides/6.vue')
  },
  {
    path: '/presentation/7',
    component: () => import(/* webpackChunkName: "slide-7" */ '../views/slides/7.vue')
  },
  {
    path: '/presentation/8',
    component: () => import(/* webpackChunkName: "slide-8" */ '../views/slides/8.vue')
  },
  {
    path: '/presentation/9',
    component: () => import(/* webpackChunkName: "slide-9" */ '../views/slides/9.vue')
  },
  {
    path: '/presentation/10',
    component: () => import(/* webpackChunkName: "slide-10" */ '../views/slides/10.vue')
  },
  {
    path: '/presentation/11',
    component: () => import(/* webpackChunkName: "slide-11" */ '../views/slides/11.vue')
  },
  {
    path: '/presentation/12',
    component: () => import(/* webpackChunkName: "slide-12" */ '../views/slides/12.vue')
  },
  {
    path: '/presentation/13',
    component: () => import(/* webpackChunkName: "slide-13" */ '../views/slides/13.vue')
  },
  {
    path: '/presentation/14',
    component: () => import(/* webpackChunkName: "slide-14" */ '../views/slides/14.vue')
  },
  {
    path: '/presentation/15',
    component: () => import(/* webpackChunkName: "slide-15" */ '../views/slides/15.vue')
  },
  {
    path: '/presentation/16',
    component: () => import(/* webpackChunkName: "slide-16" */ '../views/slides/16.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
