<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span class="block positive" :class="{'active':selectType===2}">{{desc.all}}<span class="count">46</span></span>
      <span class="block positive" :class="{'active':selectType===0}">{{desc.positive}}<span class="count">44</span></span>
      <span class="block negative" :class="{'active':selectType===1}">{{desc.negative}}<span class="count">7</span></span>
    </div>
    <div class="switch">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const POSITIVE = 0;  //好评
  const NEGATIVE = 1;  //差评
  const ALL = 2;      //全部评价

  export default {
      props : {
        //存储评价的数据到数组里面
          ratings :{
              type : Array,
              default() {
                  return [];  //数组的对象都要返回一个函数
              }
          },
        //选择是看好评还是差评还是全部
          selectType:{
              type : Number,
              default : ALL
          },
        //只看有内容的评价
          onlyContent : {
              type : Boolean,
              default : false
          },
        //描述
          desc : {
              type :　Object,
              default() {
                  return {
                      all: '全部',
                      positive: '满意',
                      negative: '不满意'
                  }
              }
          }
      }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../common/sass/common";
  .ratingselect{
    .rating-type{
      padding:18px 0;
      margin:0 18px;
      font-size: 0;
      @include border1px(rgba(7,17,27,0.1));
      .block{
        display: inline-block;
        padding:8px 12px;
        margin-right: 8px;
        border-radius: 1px;
        font-size: 12px;
        color: rgb(77,85,93);
        &.active{
          color:#fff;
        }
        .count{
          margin-left: 2px;
          font-size: 8px;
        }
        &.positive{
          background: rgba(0,160,220,0.2);
          &.active{
            background: rgb(0,160,220);
          }
        }
        &.negative{
          background: rgba(77,89,93,0.2);
          &.active{
            background: rgb(77,85,93);
          }
        }
      }
    }
  }
</style>
