<template>
  <div class="goods">
    <div class="menu-wrapper" v-el:menu-wrapper>
      <ul>
        <li v-for="item in goods" class="menu-item" :class="{'current':currentIndex===$index}" @click="selectMenu($index,$event)">
          <span class="text border-1px">
            <!--icon可以做成个组件-->
            <span v-show="item.type>0" class="icon" :class=classMap[item.type]></span>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" v-el:foods-wrapper>
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <!--food- list-hook -- hook表示被js选择的样式名，并没有实际的样式效果-->
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li  @click="selectFood(food,$event)" v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img :src="food.icon" width="57px" height="57px">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!--deliveryPrice配送费 minPrice起送价-->
    <shopcart v-ref:shopcart  :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
  </div>
  <!--food组件-->
  <!--v-ref调用子组件 food的方法-->
  <food :food="selectedFood" v-ref:food></food>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll';  //滚动插件
  import shopcart from '../../components/shopcart/shopcart.vue';  //引入底部购物车组件后需在下面注册
  import cartcontrol from '../../components/cartcontrol/cartcontrol.vue';  //引入每样商品的加减数目组件
  import food from '../../components/food/food.vue';
  const ERR_OK=0;

  export default {
    props: {
        seller:{
            type:Object  //在app.vue中的router-view中传进来的
        }
    },
    data() {
        return {
            goods: [],  //赋初始值
            listHeight: [],  //记录每个种类的菜单到顶部的高度
            scrollY: 0,
            selectedFood: {}
        }
    },
    computed: {
        currentIndex() { //样式
            for(let i = 0; i < this.listHeight.length; i++){
                let height1 = this.listHeight[i];
                let height2 = this.listHeight[i+1];
                //当i时最后一个的时候height2是undefined
                //如果height2不是最后一个 !height2
                if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
                    return i;
                }
            }
            return 0;
        },
        selectFoods() {
            let foods = [];
            this.goods.forEach((good) => {
                good.foods.forEach((food) => {
                  if(food.count) {
                      foods.push(food);
                  }
                });
            });
            return foods;
        }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$http.get('/api/goods').then((response) => {
        response = response.body;
        if (response.errno === ERR_OK) {
        this.goods = response.data;
        this.$nextTick(() => {
           this._initScroll();
           this._calculateHeight();
         });
        }
      });
    },
    methods: {
        selectMenu(index,event) {
        //如果只是移动端就不需要event参数
        //if(!event._constructed){
        //    return;
        //}
            console.log(index);
            let foodList = this.$els.foodsWrapper.getElementsByClassName('food-list-hook');
            let el=foodList[index];
            this.foodsScroll.scrollToElement(el,300);  //Better Scroll的一个方法
      },
        _initScroll() {
            this.menuScroll = new BScroll(this.$els.menuWrapper,{
                click: true   //这样better Scroll列菜单可以实现点击事件 不然是preventDefault不允许点击事件发生
            });   //两个参数 1DOM对象 2object json对象
            this.foodsScroll = new BScroll(this.$els.foodsWrapper,{
                probeType: 3,   //无论是缓动滚动 或是 swipe滑动 都可以实时监听
                click: true
            });
            this.foodsScroll.on('scroll',(pos) => {
                this.scrollY = Math.abs(Math.round(pos.y));
            });

        },
        _calculateHeight() {
            let foodlist = this.$els.foodsWrapper.getElementsByClassName('food-list-hook');
            let height = 0;
            this.listHeight.push(height);
            for(let i=0;i<foodlist.length;i++){
                let item = foodlist[i];
                height +=item.clientHeight;
                this.listHeight.push(height);  //累加高度然后添加到数组
            }
        },
        _drop(target) {
            //在这个goods的父组件里面调用子组件的方法[v-ref:]
            //然后通过this.$refs.shopcart调用
            //$nextTick 优化异步执行下落动画
            this.$nextTick(() => {
              this.$refs.shopcart.drop(target);
            });
        },
        selectFood(food,event) {
            if(!event._constructed){
                return;
            }
            this.selectedFood = food;
            this.$refs.food.show();
        }
    },
    components: { //注册组件
        shopcart : shopcart,
        cartcontrol : cartcontrol,
        food : food
    },
    events:{
      //由子组件cartcontrol传给父组件
        'cart.add'(target) {
          //调用drop方法
            this._drop(target);
        }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../common/sass/common";

  .goods{
    display: flex;
    position: absolute;
    top:174px;  /*header 和 tab 的 高度加起来174px*/
    bottom:46px;  /*底部购物车高度*/
    width: 100%;
    overflow: hidden;

    .menu-wrapper{
      flex: 0 0 80px;
      width:80px;
      background: #f3f5f7;
      .menu-item{
        display: table;
        height: 54px;
        width: 56px;
        line-height:14px;
        padding: 0 12px;
        &.current{
          position:relative;
          z-index: 10;
          margin-top: -1px;
          background: #fff;
          font-weight: 700;
          .text{
            @include border-none();
          }
        }
        .icon{
          display: inline-block;
          width:12px;
          height:12px;
          vertical-align: top;
          margin-right: 2px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          &.decrease{
            @include bg-img('decrease_3');
          }
          &.discount{
            @include bg-img('discount_3');
          }
          &.guarantee{
            @include bg-img('guarantee_3');
          }
          &.invoice{
            @include bg-img('invoice_3');
          }
          &.special{
            @include bg-img('special_3');
          }
        }
        .text{
          display: table-cell;
          width:56px;
          vertical-align: middle;
          @include border1px(rgba(7,17,27,0.1));
          font-size: 12px;
        }
      }
    }
    .foods-wrapper{
      flex: 1;

      .title{
        padding-left: 14px;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        color: rgb(147,153,159);
        background: #f4f5f7;
      }
      .food-item{
        display: flex;
        margin: 18px;
        padding-bottom: 18px;
        @include border1px(rgba(7,17,27,0.1));
        &:last-child{
         @include border-none();
         margin-bottom: 0;
        }
        .icon{
          flex: 0 0 57px;
          margin-right: 10px;
        }
        .content{
          flex:1;
          .name{
            font-size: 14px;
            margin: 2px 0 8px;
            line-height: 14px;
            height: 14px;
            color: rgb(7,17,27);
          }
          .desc,.extra{
            line-height: 10px;
            font-size:  10px;
            color: rgb(147,153,159);
          }
          .desc{
            margin-bottom: 8px;
            line-height: 14px;
          }
          .extra{
            &.count{
              margin-right: 12px;
            }
          }
          .price{
            font-weight: 700;
            line-height: 24px;
            .now{
              margin-right: 5px;
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
            right: 0;
            bottom: 12px;
          }
        }
      }
    }
  }
</style>
