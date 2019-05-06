<template>
  <div id="app" class="app">
    <div class="header">
      <Myheader :seller="seller"></Myheader>
    </div>
    <div class="tab border-1px">
      <router-link to="/goods">商品</router-link>
      <router-link to="/ratings">评论</router-link>
      <router-link to="/seller">商家</router-link>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Myheader from './components/header/header.vue'

export default{
  data () {
    return {
      seller:{}
    }
  },
  created () {
    this.$http.get('/api/seller').then((res) => {
      res = res.body;
      if(res.errno === 0){
        this.seller = res.seller;
      }
    })
  },
  components:{
    Myheader
  }
}

</script>

<style lang="stylus">
  @import "./common/css/mixin.styl"
  .app{
    .tab{
      display:flex
      border-1px(rgba(7,17,27,0.1))
      a{
        flex:1
        line-height:40px
        font-size:14px
        color:rgb(77,85,93)
        text-align:center
        &.active{
          color:rgb(240,20,20)
        }
      }
    }
  }
</style>
