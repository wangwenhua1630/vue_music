<template>
  <div>
    <div class="rankPage">
      <div class="rankPageTit">
        <p><b @click="back"></b>{{head}}</p>
      </div>
        <div class="rankPageHead">
           <img :src="src" style="height:200px;width:100%"/>
        </div>
      <ul class="musicList"><li @click="play(item,index)" :class="{current:showCurrent==index}" :song="item" v-for="(item,index) in lists"><span>{{item.title}}</span></li></ul>
    </div>
    </div>
</template>

<script>
export default {
  data:function(){
    return{
      list:''
    }
  },
  created:function(){
    this.$store.commit('showNav',false);  //使得state.navs的值为false
    this.$store.commit('showCurrent',-1);//使得state.iscurrent的值为-1
    this.list=this.$route.params.list;     //得到跳转前页面传过来的参数
    this.$store.dispatch('getRankPageData',this.list.url);
  },
  methods:{
    play:function(item,index){
      this.$store.commit('showCurrent',index);
      this.$store.dispatch('getSongUrl',item.hash);
      this.$store.commit('showNowSongListIndex',index);//当前歌曲所在列表的下标
    },
    back:function(){
      this.$store.commit('showNav',true);//使得state.navs的值为true
      this.$router.back(-1);
    }
  },
  computed:{
    head:function(){
      return this.$store.state.rankPageData.head;
    },
    time:function(){
      return this.$store.state.rankPageData.time;
    },
    src:function(){
      return this.$store.state.rankPageData.src;
    },
    lists:function(){
      return this.$store.state.rankPageData.data;
    },
    showCurrent:function(){
      return this.$store.state.isCurrent;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  ul li{color:#fff;text-align: left}
</style>
