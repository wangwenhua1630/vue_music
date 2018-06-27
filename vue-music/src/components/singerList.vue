<template>
  <div>
    <div class="singerList">
      <div class="pageTit" style="font-size:16px;">
        <p><b @click="back"></b>{{head}}</p>
      </div>
      <div class="r_panel" v-for="(list,index) in singers" :list="list" :key="index" @click="singerSong(list)">
        <div class="r_panel_left"><img :src="list.src" /></div>
        <div class="r_panel_right">{{list.title}}</div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data:function(){
    return{
      urls:''
    }
  },
  created:function(){
    this.$store.commit('showNav',false);
    this.urls=this.$route.params.url;
    this.$store.dispatch('getSingerListData',this.urls);
  },
  methods:{
    back:function(){
      this.$store.commit('showNav',true);
      this.$router.back(-1);
    },
    singerSong:function(list){
      this.$router.push({name:'singerSong',params:{list:list}});
    }
  },
  computed:{
    head:function(){
      return this.$store.state.singerData.head;
    },
    singers:function(){
      return this.$store.state.singerData.data;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .r_panel_right{color:#fff;text-align: left}
</style>
