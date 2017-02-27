<template>
  <!--<div id="app">-->
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <!--v-link添加路由-->
      <div class="tab-item"><a v-link="{path:'/goods'}">商品</a></div>
      <div class="tab-item"><a v-link="{path:'/ratings'}">评论</a></div>
      <div class="tab-item"><a v-link="{path:'/seller'}">商家</a></div>
    </div>
    <!--router-view 当我们改变路由刷新的就是这部分-->
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script type=text/ecmascript-6>
  import header from "./components/header/header.vue";

  const ERR_OK = 0;  //errno

  export default {
    //数据
    data() {
        return {
            seller: {}
        }
    },
    //生命周期
    created() {
      this.$http.get('/api/seller').then((response) => {
        response=response.body;
        if(response.errno === ERR_OK){
          this.seller=response.data;
          //console.log(this.seller);  //传递给v-header（通过v-bind 缩写为冒号:）
        }
      });
    },
    //组件
    components:{
      'v-header':header  //不取header(关键字冲突)而是v-header
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  /*上边框一像素*/
  @import "./common/sass/common";

  .tab{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    /*border-bottom: 1px solid rgba(7,17,27,0.1);*/
    /*像素在移动设备查看会大于1Px 利用函数minxin.scss*/
    /*但是这并不能完全解决问题，必须得利用transform再对应不同dpi情况下进行缩放才能解决问题 在common.scss中*/
    @include border1px(rgba(7,17,27,0.1));

    .tab-item{
      flex: 1;
      text-align: center;

      a{
        display: block;
        font-size: 14px;
        color: rgb(77,85,93);
      }

      .active{
        /*被选中时的状态*/
        color: rgb(240,20,20);
      }
    }
  }
</style>

