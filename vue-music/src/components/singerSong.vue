<template>
  <div>
    <div class="rankPage">
      <div class="rankPageTit" style="font-size:16px;">
        <p><b @click="back"></b>{{head}}</p>
        </div>
      <div class="rankPageHead">
        <img :src="src" style="height:260px;width:100%"/>
        <!--//            '<div class="p_msg"><span>{{info}}</span></div>' +                                       //歌手介绍-->
        </div>
      <ul class="musicList">
        <li @click="play(item,index)" :class="{current:showCurrent==index}" :song="item" v-for="(item,index) in lists">
          <span>{{item.title}}</span>
        </li>
      </ul>
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
    this.$store.commit('showNav',false);
    this.$store.commit('showCurrent',-1);
    this.list=this.$route.params.list;
    this.$store.dispatch('getSingerSongData',this.list.url);
  },
  methods:{
    play:function(item,index){
      this.$store.commit('showCurrent',index);
      this.$store.dispatch('getSongUrl',item.hash);
      this.$store.commit('showNowSongListIndex',index);//当前歌曲所在列表的下标
    },
    back:function(){
      this.$store.commit('showNav',true);
      this.$router.back(-1);
    }
  },
  computed:{
    head:function(){
      return this.$store.state.singerSongData.head;
    },
    info:function(){
      return this.$store.state.singerSongData.info;
    },
    src:function(){
      return this.$store.state.singerSongData.src;
    },
    lists:function(){
      return this.$store.state.singerSongData.data;
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
  p{color:#fff}
</style>
