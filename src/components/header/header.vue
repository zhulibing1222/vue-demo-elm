<template>
	<div class="headerVue">
		<div class="content">
      <div class="logo">
        <img :src="seller.avatar" width="64" height="64">
      </div>
      <div class="right">
        <h1><span class="brand"></span>{{seller.name}}</h1>
        <p class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</p>
        <div v-if="seller.supports" class="supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span>{{seller.supports[0].description}}</span>
          <span class="more" @click="showDetail">{{seller.supports.length}}个&nbsp&gt</span>
        </div>
      </div>
    </div>  
    <div class="notice">
      <span class="icon"></span>
      <span class="bulletin">{{seller.bulletin}}</span>
      <span class="more" @click="showDetail">&gt</span>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" >
    </div>
    <div class="detail" v-show="detailShow">
      <div class="detail-wraper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrap">
            <star :size="48" :score="seller.score"></star>
          </div>
          <article class="line-wrap">
            <div class="line"></div>
            <div class="line-text">优惠信息</div>
            <div class="line"></div>
          </article>
          <ul v-if="seller.supports" class="supports-wrap">
            <li v-for="item in seller.supports">
              <span class="icon" :class="classMap[item.type]"></span>
              <span class="text">{{item.description}}</span>
            </li>
          </ul>
          <article class="line-wrap">
            <div class="line"></div>
            <div class="line-text">商家公告</div>
            <div class="line"></div>
          </article>
          <p class="bulletin">{{seller.bulletin}}</p>
          <p class="bulletin">{{seller.bulletin}}</p>
          <p class="bulletin">{{seller.bulletin}}</p>
        </div>
      </div>
      <div class="detail-close" @click="detailShow=false">×</div>
    </div>
	</div>
</template>

<script>
  import star from '../star/star.vue'

  export default {
    data () {
      return {
        detailShow:false
      }
    },
    methods : {
      showDetail (){
        this.detailShow = true;
      }
    },
    compute : {
    },
    props: {
      seller:{
        type:Object
      }
    },
    created(){
      this.classMap = ['decrease','discount','special','invoice','special'];
    },
    components:{
      star
    }
  };
</script>

<style lang="stylus">
  @import "../../common/css/mixin.styl"
  .headerVue{
    overflow hidden
    position relative
    color #fff
    background rgba(7,17,27,0.5)
    .content{
      overflow hidden
      .logo{
        float left
        margin 24px 12px 18px 24px
        font-size 0
        img{
          border-radius 2px
        }
      }
      .right{
        margin 26px 12px 0 0        
      }
      h1{
        font-size 16px
        font-weight bold
      }
      .brand{
        display inline-block
        vertical-align top
        margin-right 6px
        width 30px
        height 18px
        bg-image('brand')
        background-size 30px 18px
      }
      .description{
        margin 8px 0  10px 0
        font-size 12px
        line-height 12px
      }
      .supports{
        position relative
        font-size 10px
        .icon{
          display inline-block
          width 12px
          height 12px
          margin-right 4px
          vertical-align top
          background-size 12px 12px
          &.decrease{
            bg-image("decrease_1")
          }
          &.discount{
            bg-image("discount_1")
          }
          &.guarantee{
            bg-image("guarantee_1")
          }
          &.invoice{
            bg-image("invoice_1")
          }
          &.special{
            bg-image("special_1")
          }
          
        }
      }
      .more{
        position absolute
        background rgba(0,0,0,0.2)
        border-radius 7px
        padding 7px 8px
        right 0
        top -7px
      }
    }
    .notice{
      position relative
      font-size 10px
      background rgba(7,17,27,0.2)
      .icon{
        position absolute
        display inline-block
        width 22px
        height 12px
        left 12px
        top 8px
        bg-image('bulletin')
        background-size 22px 12px
      }
      .more{
        position absolute
        top 7px
        right 12px
      }
      .bulletin{
        display block
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
        margin 0 21px 0 38px
        line-height 28px        
      }
    }
    .background{
      position absolute
      width 100%
      height 100%
      top 0
      left 0
      z-index -1
      font-size 0
      filter blur(10px)
    }
    .detail{
      position fixed
      top 0 
      left 0
      z-index 1
      width 100%
      height 100%
      overflow auto
      background rgba(7,17,27,0.8)
      .detail-wraper{
        min-height 100%
      }
      .detail-main{
        padding 64px 0
      }
      .name{
        font-weight 700
        font-size 16px
        text-align center
      }
      .star-wrap{
        margin 18px 0  30px 0
      }
      .detail-close{
        margin-top:-64px
        width 100%
        font-size 32px
        color rgba(255,255,255,0.5)
        text-align center
      }
      .line-wrap{
        display flex
        width 80%
        margin 0 auto
      }
      .line{
        flex 1
        position relative
        top -6px
        border-bottom 1px solid rgba(255,255,255,0.2)
      }
      .line-text{
        padding 0 12px
        font-size 14px
        font-weight 700
      }
      .supports-wrap{
        width 80%
        margin 24px auto 28px auto
        padding 0 12px
        li{
          margin-bottom 12px
          font-size 0
          &:last-child{
            margin 0
          } 
        }
        .icon{
          display inline-block
          width 16px
          height 16px
          vertical-align top
          margin-right 6px
          background-size 16px 16px
          background-repeat no-repeat
          &.decrease{
            bg-image("decrease_2")
          }
          &.discount{
            bg-image("discount_2")
          }
          &.guarantee{
            bg-image("guarantee_2")
          }
          &.invoice{
            bg-image("invoice_2")
          }
          &.special{
            bg-image("special_2")
          }
        }
        .text{
          font-size 12px
        }
      }
      .bulletin{
        margin 24px auto 12px auto
        font-size 12px
        line-height 2
        width 80%
        padding 0 12px
      }
    }
  }
</style>
