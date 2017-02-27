import Vue from 'vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import App from './App';
import goods from './components/goods/goods';
import ratings from './components/ratings/ratings';
import seller from './components/seller/seller';
import './common/sass/index.scss';

Vue.use(VueRouter);  //注册插件
Vue.use(VueResource);

/* eslint-disable no-new */
// new Vue({
//  el: 'body',
//  components: { App }
// });

//注册挂载组件
let app = Vue.extend(App);
//实例化router
let router = new VueRouter({
  //修改默认值class=v-link-active为active 简洁
  linkActiveClass:'active'
});
//定义路由
router.map({
  '/goods':{
    component:goods   //先在上面import引入再注册
  },
  '/ratings':{
    component:ratings
  },
  '/seller':{
    component:seller
  }
});
//路由挂载点
router.start(app,'#app');

//默认打开的路由
router.go('/goods');

