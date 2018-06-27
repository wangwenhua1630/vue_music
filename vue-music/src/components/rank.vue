<template>
  <div class="rank">
      <div class="r_panel" v-for="(list,index) in rankList" :list="list" :key="index" @click="rankPage(list,index)">
        <div class="r_panel_left"><img :src="list.src" /></div>
        <div class="r_panel_right">{{list.title}}</div>
      </div>
    </div>
</template>

<script>
export default {
  created:function(){
    this.$store.dispatch('getRankData');
  },
  methods:{
    rankPage:function(list,index){
      this.$router.push({name:'rankPage',params:{list:list,index:index}});//跳向rankpage页面,并将信息传递
    }
  },
  computed:{
    rankList:function(){
      return this.$store.state.rankData
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .r_panel_right{color:#fff;text-align: left}
</style>
