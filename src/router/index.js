import { createRouter, createWebHistory } from 'vue-router'
import process from 'process';

import Home from '../pages/HomePage.vue'
import Category from '../pages/CategoryPage.vue'
import ImageDEtail from '../pages/ImageDetailPage.vue'
import Profile from '../pages/ProfilePage.vue'
import Auth from '../pages/AuthPage.vue'
import Upload from '../pages/Upload.vue'






const routes = [
  
  {
    path: '/oauth2-success',
    component: () => import('@/pages/OAuth2Success.vue') 
  },
  
  {
    path: '/',
    name: 'Home',
    component: Home,
    alias: '/home', 
  },
  
  {
    path: '/category',
    name: 'Category',
    component: Category,
  },
  {
    path: '/category',
    name: 'PopularCategory',
    component: Category,
    props: (route) => ({ collection: route.query.collection })
  },
  {
    path: '/upload',
    name: 'Upload',
    component: Upload,
  },
  {
    path: '/profile/:username',
    name: 'Profile',
    component: Profile,
    props: true,
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
  },
  {
    path: "/photo/:id",
    name: "ImageDetail",
    component: ImageDEtail,
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
