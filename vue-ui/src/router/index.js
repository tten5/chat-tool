import {createRouter, createWebHistory } from 'vue-router'

import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Home from '../components/Home.vue' 
import Lounge from '../components/Lounge.vue' 

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login},
    { path: '/register', component: Register},
    { path: '/lounge', component: Lounge},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router