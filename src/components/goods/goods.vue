<template>
	<div class="goodVue">
		<div class="menu-wrap" ref="menuWrap">
      <ul>
        <li v-for="(item,index) in goods" class="menu-item" :class="{'current':currentIndex === index}" @click="selectMenu(index)">          
          <span class="text border-1px"><span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}</span>
        </li>
      </ul>  
    </div>
    <div class="foods-wrap" ref="foodsWrap">
      <ul>
        <li v-for="good in goods" class="food-list food-list-hook">
          <h1 class="title">{{good.name}}</h1>
          <ul>
            <li class="food-item border-1px" v-for="food in good.foods">
              <div class="icon">
                <img :src="food.icon" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">¥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">¥{{food.oldPrice}}</span>
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
    <shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
	</div>
</template>

<script type='text/ecmascript-6'>
  import BScroll from 'better-scroll';
  import shopcart from '../shopcart/shopcart.vue'
  import cartcontrol from '../cartcontrol/cartcontrol.vue'

	export default{
    props:['seller'],
    data () {
      return {
        goods :[],
        heightList:[],
        scrollY:0
      }
    },
    computed:{
      currentIndex() {
        for(let [index,value] of this.heightList.entries()){
          let height1 = value;
          let height2 = this.heightList[index+1]
          if (!height2 || this.scrollY>=height1 && this.scrollY<height2){
            return index
          }
        }
        return 0;
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach((good) => {
          good.foods.forEach((food) => {
            if (food.count) {
              foods.push(food);
            }
          })
        })
        return foods;
      }
    },
    methods:{
      selectMenu(index){
        let el = this.$refs.foodsWrap.getElementsByClassName('food-list-hook')[index];
        this.foodsScroll.scrollToElement(el,300)
      },
      _initScroll(){
        this.meunScroll = new BScroll(this.$refs.menuWrap,{
          click: true
        })
        this.foodsScroll = new BScroll(this.$refs.foodsWrap,{
          click: true,
          probeType:3
        })

        this.foodsScroll.on('scroll',(pos)=>{
          this.scrollY = Math.abs(Math.round(pos.y));
        })
      },
      _calculateHeight() {
        this.heightList = [...this.$refs.foodsWrap.getElementsByClassName('food-list-hook')].map((item)=>{
          return item.offsetTop;
        });
      }
    },
    created() {
      this.classMap = ['decrease','discount','special','invoice','special'];

      this.$http.get('api/goods').then((res) => {
        res = res.body;
        if (res.errno === 0){
          this.goods = res.goods;
          this.$nextTick(()=>{
            this._initScroll();
            this._calculateHeight();
          })       
        }
      })
    },
    components: {
      shopcart,
      cartcontrol
    }
	};
</script>

<style lang="stylus">
  @import '../../common/css/mixin.styl'
  .goodVue{
    display flex
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrap{
      flex 0 0 80px
      background #f3f5f7
      .menu-item{
        display table
        padding 0 12px
        height 54px
        font-size 0    
        &.current{
          position relative
          margin-top -1px
          background #fff 
          font-weight 700
          .text::after{
            border none
          }
        }    
        .icon{
          display inline-block
          width 12px
          height 12px
          margin-right 2px
          vertical-align top
          background-size 12px 12px
          &.decrease{
            bg-image("decrease_3")
          }
          &.discount{
            bg-image("discount_3")
          }
          &.guarantee{
            bg-image("guarantee_3")
          }
          &.invoice{
            bg-image("invoice_3")
          }
          &.special{
            bg-image("special_3")
          }
          
        }
        .text{
          display table-cell
          width 56px
          vertical-align middle
          font-size 12px
          border-1px(rgba(7,17,27,0.1))
        }
      }
    }
    .foods-wrap{
      flex 1
      .title{
        padding-left 14px 
        height 26px
        line-height 26px
        border-left 2px solid #d9dde1
        font-size 12px
        color rgb(147,153,159)
        background #f3f5f7
      }
      .food-item{
        display flex
        margin 18px
        padding-bottom 18px
        border-1px(rgba(7,17,27,0.1))
        &:last-child{
          border-none()
          padding-bottom 0
        }
        .icon{
          flex  0 0 57px
          margin-right 10px
        }
        .content{
          flex 1
        }
        .name{
          margin 2px 0 8px 0
          line-height 14px
          font-size 14px
          color rgb(7,17,27)
        }
        .desc{
          margin-bottom 8px
          font-size 10px
          color rgb(147,153,159)
          line-height 12px
        }
        .extra{
          margin-bottom 8px
          font-size 10px
          color rgb(147,153,159)
          .count{
            margin-right 12px
          }
        }
        .price{
          font-weight 700
          line-height 24px
          .now{
            margin-right 8px
            font-size 14px
            color rgb(240,20,20)
          }
          .old{
            text-decoration line-through
            font-size 10px
            color rgb(147,153,159)
          }
        }
        .cartcontrol-wrapper{
          position absolute
          right 0
          bottom 12px
        }
      }
    }
  }
</style>
