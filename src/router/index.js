import Vue from 'vue';
import Router from 'vue-router';
import Store from '@/store';
import { DefaultLayout, HomeLayout } from '@/layouts';
import Home from '@/views/Home';
import Album from '@/views/Album';
import Artist from '@/views/Artist';
import Playlists from '@/views/Playlists';
import Login from '@/views/Login';
import Register from '@/views/Register';
import User from '@/views/User';
import NotFound from '@/views/NotFound';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      component: HomeLayout,
      children: [
        {
          path: '/',
          name: 'Home',
          component: Home
        },
        {
          path: '/login',
          name: 'Login',
          component: Login
        },
        {
          path: '/register',
          name: 'Register',
          component: Register
        },
      ]
    },
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '/artist/:id',
          name: 'Artist',
          component: Artist
        },
        {
          path: '/album/:id',
          name: 'Album',
          component: Album
        },
        {
          path: '/playlists',
          name: 'Playlists',
          component: Playlists,
          beforeEnter(to, from, next) {
            if (Store.getters.getCurrentUser.id !== undefined) next();
            else next('/');
          },
        },
        {
          path: '/user/:id',
          name: 'User',
          component: User,
          beforeEnter(to, from, next) {
            if (Store.getters.getCurrentUser.id !== undefined) next();
            else next('/');
          },
        }
      ],
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
    }
  ],
});
