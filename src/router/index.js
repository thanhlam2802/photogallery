import { createRouter, createWebHistory } from 'vue-router'
import process from 'process';

import Home from '../pages/HomePage.vue'
import Category from '../pages/CategoryPage.vue'
import Upload from '../pages/ImageDetailPage.vue'
import Profile from '../pages/ProfilePage.vue'
import Auth from '../pages/AuthPage.vue'






const routes = [
  
  
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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
