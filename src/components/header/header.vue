<template>
  <div class="header">
    <div class="content-wrapper">
      <!--左侧图像开始-->
      <div class="avatar">
        <img :src="seller.avatar" width="64" height="64">
      </div>
      <!--左侧图像结束-->
      <!--中间商家信息开始-->
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <!--v-if如果没有的话会报错-->
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      <!--中间商家信息结束-->
      </div>
      <!--中间商家信息结束-->
      <!--右边显示几个优惠活动开始-->
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class=count>{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
      <!--右边显示几个优惠活动结束-->
    </div>
    <!--公告-->
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <!--通过transition添加样式-->
    <div v-show="detailShow" class="detail" transition="fade">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <!--用span在某些安卓下会出入-->
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li class="support-item" v-for="item in seller.supports">
              <span class="icon" :class="classMap[seller.supports[$index].type]"></span>
              <span class="text">{{seller.supports[$index].description}}</span>
            </li>
          </ul>
          <div class="title">
            <!--用span在某些安卓下会出入-->
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="hideDetail">
        <i class="icon-close"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import star from "../../components/star/star.vue";

  export default {
    props: {
        seller: {
            type: Object
        }
    },
    data (){
        return{
            detailShow: false
        }
    },
    methods: {
      showDetail() {
            this.detailShow = true;
        },
      hideDetail() {
            this.detailShow = false;
      }
    },
    created() {
//        顺序根据data.json里面的support-type里面来的
        this.classMap =['decrease','discount','special','invoice','guarantee']
    },
    components: {
        'star':star
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../common/sass/common";

  .header{
    color: #fff;
    background: rgba(7,17,25,0.5);
    position: relative;
    overflow: hidden;
    .content-wrapper{
      padding:24px 12px 18px 24px;
      //先给父元素设置font-size为0 再给子元素设置大小 能消除两个行内元素之间的默认空隙
      font-size: 0;
      position: relative;
      .avatar{
        display: inline-block;
        vertical-align: top;
        img{
          border-radius: 2px;
        }
      }
      .content{
        display: inline-block;
        margin-left: 16px;
        .title{
          margin: 2px 0 8px 0;
          .brand{
            display: inline-block;
            width: 30px;
            height: 18px;
            @include bg-img('brand');
            background-size: 30px 18px;
            background-repeat: no-repeat;
            vertical-align: top;
          }
          .name{
            margin-left: 6px;
            font-size: 16px;
            line-height: 18px;
            font-weight: bold;
          }
        }
        .description{
          margin-bottom: 10px;
          line-height: 12px;
          font-size: 12px;
        }
        .support{
           .icon{
             display: inline-block;
             width:12px;
             height:12px;
             vertical-align: top;
             margin-right: 4px;
             background-size: 12px 12px;
             background-repeat: no-repeat;
             &.decrease{
               @include bg-img('decrease_1');
             }
             &.discount{
               @include bg-img('discount_1');
             }
             &.guarantee{
               @include bg-img('guarantee_1');
             }
             &.invoice{
               @include bg-img('invoice_1');
             }
             &.special{
               @include bg-img('special_1');
             }
           }
           .text{
             line-height:12px;
             font-size: 10px;
           }
        }
      }
      .support-count{
        position: absolute;
        right: 12px;
        bottom: 18px;
        padding: 0 8px;
        height:24px;
        line-height: 24px;
        border-radius: 14px;
        background: rgba(0,0,0,0.2);
        text-align: center;
        .count{
          font-size: 10px;
          vertical-align: top;
        }
        .icon-keyboard_arrow_right{
          font-size: 10px;
          line-height: 24px;
          margin-left: 2px;
        }
      }
    }
    .bulletin-wrapper{
      position: relative;
      height: 28px;
      line-height: 28px;
      padding: 0 22px 0 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      background: rgba(7,17,27,0.2);
      /*font-size: 0;*/
      .bulletin-title{
        display: inline-block;
        vertical-align: top;
        width: 22px;
        height: 12px;
        @include bg-img('bulletin');
        background-size: 22px 12px;
        background-repeat: no-repeat;
        margin-top: 8px;
      }
      .bulletin-text{
        vertical-align: top;
        margin: 0 4px;
        font-size: 10px;
      }
      .icon-keyboard_arrow_right{
        position: absolute;
        font-size: 10px;
        right: 12px;
        bottom: 8px;
      }
    }
    .background{
      position: absolute;
      top: 0;
      left: 0;
      width:100%;
      height:100%;
      z-index: -1;
      filter: blur(10px); /*模糊背景效果*/
    }
    .detail{
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
      width: 100%;
      height: 100%;
      overflow: auto;
      transition: all 0.2s;
      background: rgba(7,17,27,0.8);
      /*只能在ios设备上有背景模糊效果*/
      /*backdrop-filter:blur(10px);*/
      /*--添加动画--*/
      &.fade-transiton{
        opacity: 1;
        background: rgba(7,17,27,0.8);
      }
      &.fade-enter, &.fade-leave{
        opacity: 0;
        background: rgba(7,17,27,0);
      }
      .detail-wrapper{
        min-height: 100%;
        width:100%;
        .detail-main{
          margin-top: 64px;
          padding-bottom: 64px;
          .name{
            line-height: 16px;
            text-align: center;
            font-size: 16px;
            font-weight:700;
          }
          .star-wrapper{
            margin-top:18px;
            padding:2px 0;
            text-align: center;
          }
          .title{
            /*flex布局*/
            display: flex;
            width:80%;
            margin:28px auto 24px auto;
            .line{
              flex: 1;
              position: relative;
              top:-6px;
              border-bottom: 1px solid rgba(255,255,255,0.2);
            }
            .text{
              padding: 0 12px;
              font-size: 14px;
              font-weight:700;
            }
          }
          .supports{
            width:80%;
            margin:0 auto;
            .support-item{
              padding: 0 12px;
              margin-bottom: 12px;
              font-size: 0;
              &:last-child{
                margin-bottom:0;
              }
              .icon{
                display: inline-block;
                width:16px;
                height:16px;
                vertical-align: top;
                margin-right: 6px;
                background-size: 16px 16px;
                background-repeat: no-repeat;
                &.decrease{
                  @include bg-img('decrease_2');
                }
                &.discount{
                  @include bg-img('discount_2');
                }
                &.guarantee{
                  @include bg-img('guarantee_2');
                }
                &.invoice{
                  @include bg-img('invoice_2');
                }
                &.special{
                  @include bg-img('special_2');
                }
              }
              .text{
                line-height: 12px;
                font-size: 12px;
              }
            }
          }
          .bulletin{
            width:80%;
            margin:0 auto;
            .content{
              padding:0 12px;
              line-height: 24px;
              font-size: 12px;
            }
          }
        }
      }
      .detail-close{
        position: relative;
        width: 32px;
        height: 32px;
        margin:-64px auto 0 auto;
        clear: both;
        font-size: 32px;
      }
    }
  }

</style>
