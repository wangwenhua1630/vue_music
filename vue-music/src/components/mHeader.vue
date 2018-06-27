<template>
  <div class="header">
    <div class="search">
      <input type="text" v-model="info" name="search" placeholder="歌曲，歌手搜索"/>
      <b @click="search"></b>
    </div>
  </div>
</template>

<script>
export default {
  data:function(){
    return {
      info:''
    }
  },
  methods:{
    search:function(){
      if(this.info){
        this.$router.push({name:'search',params:{info:this.info}});
      }
    }
  },
  watch:{
    info:function(newValue,oldValue){
      this.info=newValue;
      this.$store.dispatch('getSearchData',this.info);

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
