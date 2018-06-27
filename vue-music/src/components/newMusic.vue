<template>
  <div>
    <carousel></carousel>
    <ul class="musicList">
      <li @click="play(item,index)" :class="{current:showCurrent==index}" v-for="(item,index) in musicData">
        <span>{{item.title}}</span>
      </li>
    </ul>
    </div>
</template>

<script>
  import carousel from '@/components/carousel'
export default {
  data:function(){
    return{
      songs:''
    }
  },
  created:function(){
    this.$store.dispatch('getData');     //得到歌曲列表数据
    this.$store.commit('showCurrent',-1);//更新current为初始状态
  },
  methods:{
    play:function(item,index){
      this.$store.commit('showCurrent',index);//更新current状态
      this.$store.dispatch('getSongUrl',item.hash);//触发异步请求
    }
  },
  computed:{
    musicData:function(){
      return this.$store.state.musicDatas;
    },
    showCurrent:function(){
      return this.$store.state.isCurrent;
    }
  },
  components:{
    carousel
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  ul li{color:#fff;text-align: left}
</style>
