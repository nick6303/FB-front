import { createRouter, createWebHistory } from 'vue-router'
import MainContain from '@l/mainContain'
import User from '@v/pages/user'
import { Post, AddPost } from '@v/pages/post'
import Login from '@v/login'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      isLogin: true,
    },
  },
  {
    path: '/signup',
    name: 'Signuo',
    component: Login,
    meta: {
      isLogin: false,
    },
  },
  {
    path: '/',
    name: 'MainContain',
    component: MainContain,
    children: [
      {
        path: '',
        name: 'Post',
        component: Post,
      },
      {
        path: 'addPost',
        name: 'AddPost',
        component: AddPost,
      },
      {
        path: 'user',
        name: 'User',
        component: User,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

export default router
