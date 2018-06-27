<template>
  <div>
    <m-header></m-header>
    <m-nav v-show="snav"></m-nav>
    <router-view></router-view>
    <m-play></m-play>
  </div>
</template>

<script>
  import mHeader from './mHeader.vue'
  import mNav from './mNav.vue'
  import mPlay from './mPlay.vue'
export default {
  data:function(){
    return {
      snav:true
    }
  },
  computed:{
    showNav:function(){
      return this.$store.state.navS;
    }
  },
  watch:{                                       //随时监听showNav的状态，一旦变化就执行函数
    showNav:function(newValue,oldValue){
      this.snav=newValue
    }
  },
  components:{
    mHeader,
    mNav,
    mPlay
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
