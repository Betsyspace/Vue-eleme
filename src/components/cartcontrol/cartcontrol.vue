<template>
  <div class="cartcontrol">
    <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click.stop.prevent="decreaseCart" transition="move">
      <span class="inner icon-remove_circle_outline"></span>
    </div>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue';
  export default {
    props: {
        food: {
            type: Object
        }
    },
    created() {
        //console.log(this.food);
    },
    methods: {
        addCart(event){
          if(!event._constructed){
            return;
          }
          if(!this.food.count){
            //用Vue.set接口添加一个属性后这个属性就能被观察到 最终能通知到dom发生变化
            Vue.set(this.food,'count',1);
            this.food.count == 1;
          }else{
            this.food.count++;
          }
          this.$dispatch('cart.add',event.target);

          //console.log(this.food);
        },
        decreaseCart(event) {
          if(!event._constructed){
            return;
          }
          if(this.food.count){
            this.food.count--;
          }
        }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  .cartcontrol{
    font-size: 0;
    .cart-decrease{
      display: inline-block;
      padding:6px;
      transition: all 0.4s linear;
      &.move-transition{
        opacity: 1;
        transform: translate3d(0,0,0);
      }
      .inner{
        display: inline-block;
        line-height: 24px;
        font-size: 24px;
        color: rgb(0,160,220);
        transition: all 0.4s linear;
        transform: rotate(0);
      }
      &.move-enter,&.move-leave{
        opacity: 0;
        transform: translate3d(24px,0,0);
        .inner{
          transform: translate3d(0,0,0);
        }
      }
    }
    .cart-count{
      display: inline-block;
      font-size: 10px;
      color: rgb(147,153,159);
      vertical-align: top;
      width:12px;
      padding-top: 6px;
      line-height:24px;
      text-align: center;
    }
    .cart-add{
      display: inline-block;
      padding:6px;
      line-height: 24px;
      font-size: 24px;
      color: rgb(0,160,220);
    }
  }
</style>
