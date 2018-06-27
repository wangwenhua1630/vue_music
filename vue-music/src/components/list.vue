<template>
  <div class="plist">
    <div class="p_panel" @click="pListPage(list,index)" v-for="(list,index) in pList" :list="list" :key="index">
      <div class="p_panel_left"><img :src="list.src" /></div>
      <div class="p_panel_right"><span>{{list.title}}</span><p><b></b>{{list.num}}</p></div>
      </div>
    </div>
</template>

<script>
export default {
  created:function(){
    this.$store.dispatch('getPlistData');
  },
  methods:{
    pListPage:function(list,index){
      this.$router.push({name:'pListPage',params:{list:list,index:index}});
    }
  },
  computed:{
    pList:function(){
      return this.$store.state.pListData;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .p_panel_right{color:#fff;text-align: left}
</style>
