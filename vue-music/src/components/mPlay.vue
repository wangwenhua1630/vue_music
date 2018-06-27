<template>
  <div class="footer">
    <div class="top_bottom" @click="xiala" :class="{top_bottom_cang:cang}">
      <img src="../assets/img/to_top.png" />
      </div>
    <div class="play_info" :class="{play_info_cang:cang}">
      <div class="song_info" @click="big">
        <dl>
          <dt><img :src='data.img' /></dt>
          <dd>
            <h5>{{data.song}}</h5>
            <h5 style="padding-top:5px;">{{data.singer}}</h5>
            </dd>
          </dl>
        </div>
      <div class="song_play">
        <div class="play" :class="{pause:ting}" @click="stop"></div>
        <div class="next" @click="next"></div>
        <audio id="audio" :src="data.urls" autoplay></audio>
        </div>
      </div>
    <div class="bigPlay" :style="bigShow">
      <div class="bigPTit" style="font-size:16px;">
        <p><b @click="back"></b>{{data.song}}</p>
        </div>
      <div class="bigP_shadow">
        <div class="bigP_box" :class="{playActive:playActive}">
          <img :src="data.img">
          </div>
        <div class="songCi">
          <div class="ci"  :style="ciObj">
            <p v-for="(item,index) in songCi" :class="{ciColor:index==ciIndex}">{{item.ci}}</p>
            </div>
          </div>
        <div class="big_rang">
          <b>{{nowCurrentTime}}</b>
          <input v-model="songCurrent" :style="inputObj" type="range" min="0" max=""  step="1" value="0">
          <b>{{currentTotalTime}}</b>
          </div>
        <div class="play_big">
          <div class="big_pre" @click="pre"></div>
          <div class="big_play" @click="stop" :class="{pause:ting}"></div>
          <div class="big_next" @click="next"></div>
          </div>
        </div>
      <div class="bigP_bg" :style="bigBg"></div>
      <div class="hand" :class="{handA:active}"></div>
      </div>
    </div>
</template>

<script>
export default {
  data:function(){
    return {
      cang:false,
      data:{},             //保存当前播放歌曲
      ting:false,           //播放背景
      active:false,         //音乐播放器摇杆背景
      playActive:false,     //音乐播放器轨道
      bigShow:{display:''}, //音乐播放器详情页面的样式
      bigBg:{},            //模糊背景的样式
      nowAudio:'',
      nowInput:'',
      currentTotalTime:'',          //播放音乐的总时长
      nowCurrentTime:'',            //当前音乐播放时长（格式化的时间）
      timer:'',
      songCurrent:0,              //歌曲播放的当前时间
      inputBg:0,                  //input横条的背景初始数据
      inputObj:{},                 //input横条的背景
      ciTop:0,                   //歌词父元素向上移动的高度
      ciObj:{},                   //歌词样式
      ciIndex:0                    //当前歌词播放到那一段
    }
  },
  created:function(){
    this.data.img=require('../assets/img/default.png');
  },
  mounted:function(){
    var hh=document.querySelector('#audio');//保存播放器对象
    var jj=document.querySelector('input[type=range]');//保存播放进度条
    this.nowAudio=hh;
    this.nowInput=jj;
  },
  updated:function(){
    this.timeProgess();
    if(this.data.time==this.nowInput.value){
      this.timer=null;
      this.next();
      this.nowInput.value=0;
    }
  },
  computed:{
    song:function(){                              //vuex中state.nowPlay一旦变化，song就跟着变化，view层也跟着变
      return this.$store.state.nowPlay;
    },
    songList:function(){                            //同上类似
      return this.$store.state.nowSongList;
    },
    songListIndex:function(){                            //同上类似
      return this.$store.state.nowSongListIndex;
    },
    songCi:function(){                                //同上类似
      return this.$store.state.nowSongCi;
    }
  },
  watch:{                                        //监听当前播放歌曲的变化,一旦变化就会调用函数
    song:function(newValue, oldValue){             //一旦歌曲变化，相关属性初始化
      this.data=newValue;
      this.ting=true;
      this.active=false;
      this.playActive=false;
      this.currentTotalTime=this.timePromat(this.data.time);//格式化总时间
      this.nowInput.max=this.data.time;      //初始化input[range]的max值
      this.nowInput.value=0;                 //初始化input[range]的value值
      this.bigBg.backgroundImage='url('+this.data.img+')';
      this.bigBg.backgroundSize='cover';
      this.ciTop=48;
      this.$store.dispatch('getSongCi',[this.songList[this.songListIndex].hash,newValue.time]);//异步加载歌词     **dispatch最多就只接受两个参数，type和payload，所以用数组包裹多个参数进行传递
    },
    songCurrent:function(newValue, oldValue){      //监听进度条数值的变化
      this.nowAudio.currentTime=newValue;
      this.timeProgess();
      for(var i=0;i<this.songCi.length;i++){
        if(this.songCi[i].time>=this.nowCurrentTime){
          this.ciIndex=i-1;
          this.ciTop=(-(i-1)*24);
          this.ciObj.top=this.ciTop+'px';
          break;
        }
      }
    },
    nowCurrentTime:function(newValue, oldValue){     //监听当前音乐播放时长的变化
      this.inputBg=((this.nowAudio.currentTime/this.data.time)*100).toFixed(0);//当前播放时长站总时长的占比，保留小数点后0位
      this.inputObj.backgroundSize=this.inputBg+'%'+" 100%";
      if(this.songCi){
        for(var i=0;i<this.songCi.length;i++){
          if(this.songCi[i].time==newValue){
            this.ciIndex=i;
            this.ciTop-=24;
            this.ciObj.top=this.ciTop+'px';
          }
        }
      }
    }
  },
  methods:{
    xiala:function(){     //播放器下拉效果
      if(this.cang){
        this.cang=false;
      }
      else{
        this.cang=true;
      }
    },
    pre:function(){                //上一首
      if(this.songListIndex==0){          //如果当前歌曲为歌曲列表的第一首
        this.$store.commit('showNowSongListIndex',this.songList.length-1);//向上一首为歌单最后一首
      }
      else{
        this.$store.commit('showNowSongListIndex',this.songListIndex-1);//更新当前歌曲所在列表的下标-1
      }
      this.$store.commit('showCurrent',this.songListIndex);//更新current状态
      this.$store.dispatch('getSongUrl',this.songList[this.songListIndex].hash);//异步请求歌曲的详细信息
    },
    stop:function(){
      if(this.nowAudio.src){                       //如果audio中src链接不为空
        if(this.ting){
          this.ting=false;
          this.active=true;
          this.playActive=true;
          this.nowAudio.pause();
          clearTimeout(this.timer);
          this.timer=null;
        }else{
          this.ting=true;
          this.active=false;
          this.playActive=false;
          this.nowAudio.play();
          this.timer=setTimeout(this.timeProgess,1000);
        }
      }
    },
    next:function(){     //下一首
      if(this.songListIndex==this.songList.length-1){
        this.$store.commit('showNowSongListIndex',0);
      }
      else{
        this.$store.commit('showNowSongListIndex',this.songListIndex+1);//更新当前歌曲所在列表的下标+1
      }
      this.$store.commit('showCurrent',this.songListIndex);//更新current状态
      this.$store.dispatch('getSongUrl',this.songList[this.songListIndex].hash);//异步请求歌曲的详细信息
    },
    big:function(){    //播放器详情页
      if(this.song){
        this.bigShow.display='block';
      }
    },
    back:function(){        //返回
      this.bigShow.display='none';
    },
    timePromat:function(times){    //编写一个时间转换函数：
      var minutes = Math.floor(times / 60);
      var seconds = Math.floor(times - (minutes * 60));
      if(minutes<10){
        minutes='0'+minutes;
      }
      if(seconds < 10) {
        seconds = '0' + seconds;
      }

      times = minutes + ':' + seconds;
      return times;
    },
    timeProgess:function(){  //播放时间周期事件
      this.nowCurrentTime=this.timePromat(this.nowAudio.currentTime);//将时间格式化
      this.nowInput.value=Math.floor(this.nowAudio.currentTime);        //进度条上时间与歌曲时间一致
      this.timer=setTimeout(this.timeProgess,1000);                 //每秒钟更新一次
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bigPTit{color:#fff;}
.big_rang>b,.ci>p{color:#fff;}
.ci>p.ciColor{color:#7DE87D}
</style>
