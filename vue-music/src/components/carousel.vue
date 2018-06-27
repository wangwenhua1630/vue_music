<template>
  <div class="banner">
    <transition-group name="fade" tag="ul">
      <li v-for="(img,index) in muImgData" :key="img"  v-show="index==nowIndex"><img :src="img.src"/></li>
      </transition-group>
    <div class="bullet">
    <span v-for="(item,index) in muImgData.length" :class="{mark:index==nowIndex}"  @click="change(index)"></span>
    </div>
    </div>
</template>

<script>
export default {
  data:function(){
    return {
      nowIndex:0
    }
  },
  created:function(){
    this.$store.dispatch('getImgData');
    this.play();
  },
  methods:{
    autoplay:function(){
      if(this.nowIndex==this.muImgData.length-1){
        this.nowIndex=0;
      }
      else{
        this.nowIndex++;
      }
    },
    play:function(){
      setInterval(this.autoplay,3000);
    },
    change:function(i){
      this.nowIndex=i;
    }
  },
  computed:{
    muImgData:function(){
      return this.$store.state.imgDatas;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
