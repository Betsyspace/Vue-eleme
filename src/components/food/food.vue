<template>
  <div v-show="showFlag" class="food" transition="move">
    <div class="food-content">
      <div class="image-header">
        <img :src="food.image">
        <div class="back" @click="hide">
          <i class="icon-arrow_lift"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props:{
      food:{
          type:Object
      }
    },
    data() {
        return{
          showFlag: false
        }
    },
    methods: {
//        父组件可以调用子组件方法，但是子组件不能调用父组件的方法
        show() {
          this.showFlag = true;
        },
        hide() {
          this.showFlag = false;
        }
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
  }
</style>
