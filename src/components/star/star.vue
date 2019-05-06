<template>
  <div class="starVue" :class="starType">
    <span v-for="item in itemClass" :class="item" class="star"></span>
  </div>
</template>

<script>
  const LENGTH = 5;
  const CLS_ON = 'on';
  const CLS_OFF = 'off';
  const CLS_HALF = 'half';
  export default {
    props:['size','score'],
    computed : {
      starType () {
        return 'star-' + this.size;
      },
      itemClass(){
        let result = [];
        let score = Math.floor(this.score*2)/2;
        let hasDecimal = score % 1 !==0;
        let integer = Math.floor(score);
        for(let i=0;i<integer;i++) {
          result.push(CLS_ON);
        }
        if(hasDecimal) {
          result.push(CLS_HALF)
        }
        while(result.length < LENGTH){
          result.push(CLS_OFF)
        }
        return result;
      }
    }
  };
</script>

<style lang="stylus">
  @import "../../common/css/mixin.styl"
  .starVue{
    font-size 0
    text-align center
    .star {
      display inline-block
      background-repeat no-repeat
    }
    &.star-48{
      .star{
        width 20px
        height 20px
        margin 0 11px
        background-size 20px 20px
        &.on{
          bg-image('star48_on')
        }
        &.off{
          bg-image('star48_off')
        }
        &.half{
          bg-image('star48_half')
        }
      }
    }
    &.star-24{
      .star{
        width 10px
        height 10px
        margin 0 1.5px
        background-size 10px 10px
        &.on{
          bg-image('star24_on')
        }
        &.off{
          bg-image('star24_off')
        }
        &.half{
          bg-image('star24_half')
        }
      }
    }
    &.star-36{
      .star{
        width 15px
        height 15px
        margin 0 3px
        background-size 15px 15px
        &.on{
          bg-image('star36_on')
        }
        &.off{
          bg-image('star36_off')
        }
        &.half{
          bg-image('star36_half')
        }
      }
    }
    
  }
</style>
