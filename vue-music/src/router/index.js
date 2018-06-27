import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import home from '@/components/home'
import newMusic from '@/components/newMusic'
import rank from '@/components/rank'
import list from '@/components/list'
import singer from '@/components/singer'
import search from '@/components/search'
import rankPage from '@/components/rankPage'
import pListPage from '@/components/pListPage'
import singerList from '@/components/singerList'
import singerSong from '@/components/singerSong'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
    {
      path:'/',
      component:home,
      children:[
        {path:'/',component:newMusic},
        {path:'/newMusic',component:newMusic},
        {path:'/rank',component:rank},
        {path:'/list',component:list},
        {path:'/singer',component:singer},
        {path:'/search',component:search},
        {path:'/rankPage',name:'rankPage',component:rankPage},
        {path:'/pListPage',name:'pListPage',component:pListPage},
        {path:'/singerList',name:'singerList',component:singerList},
        {path:'/singerSong',name:'singerSong',component:singerSong}
      ]
    }
  ]
})
