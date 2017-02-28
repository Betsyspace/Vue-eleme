<template>
  <div v-show="showFlag" class="food" transition="move" v-el:food>
    <div class="food-content">
      <div class="image-header">
        <img :src="food.image">
        <div class="back" @click="hide">
          <i class="icon-arrow_lift"></i>
        </div>
      </div>
      <div class="content">
        <h1 class="title">{{food.name}}</h1>
        <div class="detail">
          <span class="sell-count">月售{{food.sellCount}}份</span>
          <span class="rating">好评率{{food.rating}}%</span>
        </div>
        <div class="price">
          <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
        </div>
        <div class="cartcontrol-wrapper">
          <cartcontrol :food="food"></cartcontrol>
        </div>
        <div class="buy" v-show="!food.count || food.count===0" @click.stop.prevent="addFirst" transition="fade">加入购物车</div>
      </div>
      <split v-show="food.info"></split>
      <div class="info" v-show="food.info">
        <h1 class="title">商品详情</h1>
        <p class="text">{{food.info}}</p>
      </div>
      <split></split>
      <div class="rating">
        <h1 class="title">商品评价</h1>
        <ratingselect :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';
  import cartcontrol from '../../components/cartcontrol/cartcontrol.vue';  //引入每样商品的加减数目
  import split from '../../components/split/split.vue';  //切割栏
  import ratingselect from '../../components/ratingselect/ratingselect.vue';  //选择评价
  import Vue from 'vue';

  const POSITIVE = 0;  //好评
  const NEGATIVE = 1;  //差评
  const ALL = 2;      //全部评价

  export default {
    props:{
      food:{
          type:Object
      }
    },
    data() {
        return{
          showFlag: false,
          selectType:ALL,
          onlyContent:true,
          desc: {
              all:'全部',
              positive:'推荐',
              negative:'吐槽'
          }
        }
    },
    methods: {
//        父组件可以调用子组件方法，但是子组件不能调用父组件的方法
        show() {
          this.showFlag = true;
          this.selectType= ALL;
          this.onlyContent = true;
          this.$nextTick(() => {
             if(!this.scroll){
                 this.scroll = new BScroll(this.$els.food, {
                     click : true //可以被点击
                 })
             }else{
                 this.scroll.refresh();
             }
          });
        },
        hide() {
          this.showFlag = false;
        },
        addFirst(event) {
          if(!event._constructed){
              return;
          }
          //用Vue.set接口添加一个属性后这个属性就能被观察到 最终能通知到dom发生变化
          Vue.set(this.food,'count',1);
          this.$dispatch('cart.add',event.target);
        }
    },
    components:{
      cartcontrol:cartcontrol,
      split:split,
      ratingselect:ratingselect
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .food{
    position: fixed;
    left: 0;
    top:0;
    bottom:48px;
    z-index: 30;
    width:100%;
    background: #fff;
    &.move-transition{
      transition:all 0.2s linear;
      transform: translate3d(0,0,0);
    }
    &.move-enter,&.move-leave{
      transform: translate3d(-100%,0,0);
    }
    .food-content{
      .image-header{
        position: relative;
        width:100%;
        /*装图片的盒子 如果不固定高的话 设h为0 给个padding-top100% 高度计算是按宽度来的 所以等同于width设为多少则height设为多少*/
        height:0;
        padding-top:100%;
        img{
          position: absolute;
          top:0;
          left:0;
          width:100%;
          height:100%;
        }
        .back{
          position: absolute;
          top:10px;
          left:0;
          .icon-arrow_lift{
            display: block;
            padding:10px;
            font-size:20px;
            color: #fff;
          }
        }
      }
      .content{
        padding:18px;
        position: relative;
        .title{
          line-height: 14px;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 700;
          color: rgb(7,17,27);
        }
        .detail{
          margin-bottom:18px;
          line-height: 10px;
          font-size:0;
          height:10px;
          .sell-count,.rating{
            font-size: 10px;
            color: rgb(147,153,159);
          }
          .sell-count{
            margin-right: 8px;
          }
        }
        .price{
          font-weight: 700;
          line-height: 24px;
          .now{
            margin-right: 8px;
            font-size: 14px;
            font-weight: 700;
            color: rgb(240,20,20);
          }
          .old{
            text-decoration: line-through;
            font-size: 10px;
            color:rgb(147,153,159);
          }
        }
        .cartcontrol-wrapper{
          position: absolute;
          right:12px;
          bottom:12px;
        }
        .buy{
          position: absolute;
          right: 18px;
          bottom:18px;
          z-index:10;
          height:24px;
          line-height:24px;
          padding:0 12px;
          box-sizing: border-box;
          border-radius: 12px;
          font-size: 10px;
          color: #fff;
          background: rgb(0,160,220);
          &.fade-transition{
            transition: all 0.2s;
            opacity: 1;
          }
          &.fade-enter,&.fade-leave{
            opacity: 0;
          }
        }
      }
      .info{
        padding: 18px;
        .title{
          line-height: 14px;
          margin-bottom:6px;
          font-size: 14px;
          color: rgb(7,17,27);
        }
        .text{
          line-height: 24px;
          padding:0 8px;
          font-size: 12px;
          color: rgb(77,85,83);
        }
      }
      .rating{
        padding-top:18px;
        .title{
          line-height: 14px;
          margin-left:18px;
          font-size: 14px;
          color: rgb(7,17,27);
        }
      }
    }
  }
</style>
