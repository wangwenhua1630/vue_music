<template>
  <div class="singer">
    <ul><li @click="singerList" url="singer/list/88">热门歌手</li></ul>
    <ul><li @click="singerList" url="singer/list/1">华语男歌手</li><li @click="singerList" url="singer/list/2">华语女歌手</li><li @click="singerList" url="singer/list/3">华语组合</li></ul>
    <ul><li @click="singerList" url="singer/list/4">日韩男歌手</li><li @click="singerList" url="singer/list/5">日韩女歌手</li><li @click="singerList" url="singer/list/6">日韩组合</li></ul>
    <ul><li @click="singerList" url="singer/list/7">欧美男歌手</li><li @click="singerList" url="singer/list/8">欧美女歌手</li><li @click="singerList" url="singer/list/9">欧美组合</li></ul>
    </div>
</template>

<script>
export default {
  methods:{
    singerList:function(event){
      var urls=event.target.getAttribute('url');
      this.$router.push({name:'singerList',params:{url:urls}});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
