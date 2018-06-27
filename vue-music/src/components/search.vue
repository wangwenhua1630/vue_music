<template>
  <div class="searchList">
    <div class="s_total"><span>共有{{searchTotal}}条记录</span></div>
    <ul class="musicList">
      <li @click="play(item,index)"  :class="{current:showCurrent==index}" :song="item" v-for="(item,index) in searchList">
      <span>{{item.tit}}</span>
      </li>
    </ul>
    </div>
</template>

<script>
export default {
  created:function(){
    this.$store.commit('showCurrent',-1);//更新current为初始状态
    this.$store.dispatch('getSearchData',this.$route.params.info);
  },
  methods:{
    play:function(item,index){
      this.$store.commit('showCurrent',index);
      this.$store.dispatch('getSongUrl',item.hash);
      this.$store.commit('showNowSongListIndex',index);//当前歌曲所在列表的下标
    }
  },
  computed:{
    searchList:function(){
      return this.$store.state.searchList.data;
    },
    searchTotal:function(){
      return this.$store.state.searchList.num;
    },
    showCurrent:function(){
      return this.$store.state.isCurrent;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
