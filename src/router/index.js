import Vue from 'vue'
import Router from 'vue-router'
import main from '@/components/main'
import find from '@/pages/find'
import index from '@/pages/index'
import search from '@/pages/search/search'
import singleMovie from '@/pages/singleMovie/singleMovie'
import simpleMovieCast from '@/pages/simpleMovieCast/simpleMovieCast'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name:'index',
      component:index
    },
    {
      path: '/find',
      name: 'find',
      component: find
    },
    {
      path:'/search',
      name:'search',
      component:search
    },
    {
      path:'/singleMovie',
      name:'singleMovie',
      component:singleMovie
    },{
      path:'/simpleMovieCast',
      name:'simpleMovieCast',
      component:simpleMovieCast
    }  
  ]
})
