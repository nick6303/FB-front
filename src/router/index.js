import { createRouter, createWebHashHistory } from 'vue-router'
import MainContain from '@l/mainContain'
import { Post, AddPost, UserPost } from '@v/pages/post'
import Login from '@v/login'
import Profile from '@v/pages/profile'
import Following from '@v/pages/following'
import Likes from '@v/pages/likes'

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
        path: 'posts/:id',
        name: 'UserPost',
        component: UserPost,
      },
      {
        path: 'addPost',
        name: 'AddPost',
        component: AddPost,
      },
      {
        path: 'profile',
        name: 'Profile',
        component: Profile,
      },
      {
        path: 'following',
        name: 'Following',
        component: Following,
      },
      {
        path: 'likes/:id',
        name: 'likes',
        component: Likes,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
})

export default router
