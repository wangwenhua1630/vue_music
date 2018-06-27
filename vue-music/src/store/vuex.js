import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
Vue.prototype.$http=axios
export default new Vuex.Store({
  state:{
    musicDatas:'',     //保存播放的歌曲列表
    musicIndex:'',    //保存当前播放歌曲的下标
    imgDatas:'' ,      //保存轮播广告的图片
    isCurrent:-1,        //保存当前播放音乐字体颜色与背景的状态
    rankData:'',         //排行榜列表
    pListData:'',         //歌单列表
    rankPageData:'',      //排行榜内部明细表
    pListPageData:'',      //歌曲内部明细表
    singerData:'',           //歌手列表
    singerSongData:'',       //歌手歌曲列表
    searchList:'',            //搜索列表
    nowPlay:'',             //当前播放的歌曲
    navS:true,              //记录父组件nav的状态
    nowSongList:'',          //保存当前播放歌单列表
    nowSongListIndex:'',      //保存当前播放歌单列表下标
    nowSongCi:''             //保存当前歌词
  },
  mutations:{
    showData:function(state,data){
      state.musicDatas=data;
    },
    showIndex:function(state,index){
      state.musicIndex=index;
    },
    showImg:function(state,data){
      state.imgDatas=data;
    },
    showCurrent:function(state,index){
      state.isCurrent=index;
    },
    showRank:function(state,data){
      state.rankData=data;
    },
    showPlist:function(state,data){
      state.pListData=data;
    },
    showRankPage:function(state,data){
      state.rankPageData=data;
    },
    showPlistPage:function(state,data){
      state.pListPageData=data;
    },
    showSinger:function(state,data){
      state.singerData=data;
    },
    showSingerSong:function(state,data){
      state.singerSongData=data;
    },
    showSearch:function(state,data){
      state.searchList=data;
    },
    showNowPlay:function(state,url){
      state.nowPlay=url;
    },
    showNav:function(state,staus){
      state.navS=staus;
    },
    showNowSongList:function(state,data){
      state.nowSongList=data;
    },
    showNowSongListIndex:function(state,index){
      state.nowSongListIndex=index;
    },
    showSongCi:function(state,data){
      state.nowSongCi=data;
    }
  },
  actions:{
    getData:function({commit}){
      return new Promise(function(resolve,reject){
        axios.get('http://www.xi-g.com/get_kugou.php').then(function(res){
//                            console.log(res.data);
          // 创建一个div的盒子存起来
          var div = document.createElement('div');
          // 把整个html的字符串存到这个div节点里
          div.innerHTML = res.data;
          // 分析html结构后，把类名为.panel-songslist-item的元素全部存到list变量里
          // querySelectorAll()以数组形式返回所有匹配节点
          var list = div.querySelectorAll('.panel-songslist-item');
          // 定义一个空数组
          var songList = [];
          // 遍历list提取歌单数据，整理格式
          for(var i = 0; i<list.length; i++){
            // 定义空对象
            var song = {};
            // 查找类名为.panel-songs-item-name的元素里的span节点里的文本存到song.title属性
            song.title = list[i].querySelector('.panel-songs-item-name span').textContent;
            // 取到每个list元素的id值
            song.hash = list[i].id.substr(6);
            // 把song对象推入songList数组
            songList.push(song);
          }
//                            console.log(songList);
          // 我们来打印songList这个对象数组看看
          commit('showData',songList);
          commit('showNowSongList',songList);//将当前请求的歌曲数组保存至当前播放歌单列表
          commit('showNowSongListIndex',-1);
        })
        resolve();
      })
    },
    getImgData:function({commit}){
      return new Promise(function(resolve,reject){
        axios.get('http://www.xi-g.com/get_kugou.php').then(function(res){
//                            console.log(res.data);
          // 创建一个div的盒子存起来
          var div = document.createElement('div');
          // 把整个html的字符串存到这个div节点里
          div.innerHTML = res.data;
          // querySelectorAll()以数组形式返回所有匹配节点
          var list = div.querySelectorAll('.swipe-wrap>div>a>img');
          // 定义一个空数组
          var imgList = [];
          // 遍历list提取歌单数据，整理格式
          for(var i = 0; i<list.length; i++){
            // 定义空对象
            var imgs = {};
            imgs.src=list[i].src
            imgList.push(imgs);
          }
//                            console.log(imgList);
          // 我们来打印songList这个对象数组看看
          commit('showImg',imgList);
        })
        resolve();
      })
    },
    getRankData:function({commit}){
      return new Promise(function(resolve){
        axios.get('http://www.xi-g.com/get_kugou.php?url=rank/list').then(function(res){
//                            console.log(res.data);
          var div=document.createElement("div");
          div.innerHTML=res.data;
          var ranks=div.querySelectorAll(".panel-img-list>li");
//                            console.log(ranks);
          var rankList=[];
          for(var i=0;i<ranks.length;i++){
            var rank={};
            rank.src=ranks[i].querySelector(".panel-img-left>img").attributes[0].value;
            rank.title=ranks[i].querySelector('.panel-img-content>p').innerHTML;
            rank.url=ranks[i].getElementsByTagName('a')[0].href.substr(19);
            rankList.push(rank);

          }
//                            console.log(rankList);
          commit('showRank',rankList);
        })
        resolve()
      })
    },
    getPlistData:function({commit}){
      return new Promise(function(resolve){
        axios.get('http://www.xi-g.com/get_kugou.php?url=plist/index').then(function(res){
//                            console.log(res.data);
          var div=document.createElement("div");
          div.innerHTML=res.data;
          var lists=div.querySelectorAll(".panel-img-list>li");
//                            console.log(ranks);
          var pList=[];
          for(var i=0;i<lists.length;i++){
            var list={};
            list.src=lists[i].querySelector(".panel-img-left>img").attributes[0].value;
            list.title=lists[i].querySelector('.panel-img-content>p').textContent.trim();
            list.url=lists[i].getElementsByTagName('a')[0].href.substr(19);
            list.num=lists[i].querySelector('.panel-img-content-sub').textContent;
            pList.push(list);

          }
//                            console.log(pList);
          commit('showPlist',pList);
        })
        resolve()
      })
    },
    getRankPageData:function({commit},info){
      return new Promise(function(resolve){
        axios.get('http://www.xi-g.com/get_kugou.php?url='+info).then(function(res){
//                            console.log(res.data);
          var div=document.createElement("div");
          div.innerHTML=res.data;
          var pages={};
          pages.time=div.querySelector('.rank-info-time span').textContent;
          pages.head=div.querySelector('.page-title').textContent;
          pages.src=div.querySelector('.rank-info-hd img').src;
          var list = div.querySelectorAll('.panel-songslist-item');
          // 定义一个空数组
          var rankPageList = [];
          for(var i = 0; i<list.length; i++){
            var page = {};
            page.title = list[i].querySelector('.panel-songs-item-name span').textContent;
            page.hash = list[i].id.substr(6);
            rankPageList.push(page);
          }
          pages.data=rankPageList;
//                            console.log(pages);
          commit('showRankPage',pages);
          commit('showNowSongList',pages.data);//将当前请求的歌曲数组保存至当前播放歌单列表
          commit('showNowSongListIndex',-1);
        })
        resolve()
      })
    },
    getPlistPageData:function({commit},info){
      return new Promise(function(resolve){
        axios.get('http://www.xi-g.com/get_kugou.php?url='+info).then(function(res){
//                            console.log(res.data);
          var div=document.createElement("div");
          div.innerHTML=res.data;
          var pages={};
          pages.info=div.querySelector('.intro-box p').textContent;
          pages.head=div.querySelector('.page-title').textContent;
          pages.src=div.querySelector('.img-box img').src;
          var list = div.querySelectorAll('.panel-songslist-item');
          // 定义一个空数组
          var pListPageList = [];
          for(var i = 0; i<list.length; i++){
            var page = {};
            page.title = list[i].querySelector('.panel-songs-item-name span').textContent;
            page.hash = list[i].id.substr(6);
            pListPageList.push(page);
          }
          pages.data=pListPageList;
//                            console.log(pages);
          commit('showPlistPage',pages);
          commit('showNowSongList',pages.data);//将当前请求的歌曲数组保存至当前播放歌单列表
          commit('showNowSongListIndex',-1);
        })
        resolve()
      })
    },
    getSingerListData:function({commit},info){
      return new Promise(function(resolve){
        axios.get('http://www.xi-g.com/get_kugou.php?url='+info).then(function(res){
//                            console.log(res.data);
          var div=document.createElement("div");
          div.innerHTML=res.data;
          var pages={};
          pages.head=div.querySelector('.page-title').textContent;
          var list = div.querySelectorAll('#panelList li');
          // 定义一个空数组
          var singerList = [];
          for(var i = 0; i<list.length; i++){
            var page = {};
            page.title = list[i].querySelector('.panel-img-content-first').textContent;
            page.url = list[i].querySelector('#panelList li a').href.substr(19);
            page.src=list[i].querySelector('.panel-img-left img').attributes[0].value;
            singerList.push(page);
          }
          pages.data=singerList;
//                            console.log(pages);
          commit('showSinger',pages);
        })
        resolve()
      })
    },
    getSingerSongData:function({commit},info){
      return new Promise(function(resolve){
        axios.get('http://www.xi-g.com/get_kugou.php?url='+info).then(function(res){
//                            console.log(res.data);
          var div=document.createElement("div");
          div.innerHTML=res.data;
          var pages={};
          pages.info=div.querySelector('.intro p').textContent;
          pages.head=div.querySelector('.clear_fix strong').textContent;
          pages.src=div.querySelector('.top img').attributes[2].value;
          var list = div.querySelectorAll('#song_container li');
//                            console.log(list);
          // 定义一个空数组
          var songList = [];
          for(var i = 0; i<list.length; i++){
            var page = {};
            var values = list[i].querySelector('input').value;
            var arr=values.split('|');
            page.title=arr[0];
            page.hash = arr[1];
            songList.push(page);
          }
          pages.data=songList;
//                            console.log(pages);
          commit('showSingerSong',pages);
          commit('showNowSongList',pages.data);//将当前请求的歌曲数组保存至当前播放歌单列表
          commit('showNowSongListIndex',-1);
        })
        resolve()
      })
    },
    getSearchData:function({commit},info){
      return new Promise(function(resolve){
        axios.get('http://www.xi-g.com/kugouAPI/searchSongList.php?name='+info).then(function(res){
//                            console.log(res.data);
          var item={};
          item.num=res.data.data.total;
          item.data=[];
          var lists=res.data.data.info;
          for(var i=0;i<lists.length;i++){
            var list={};
            list.tit=lists[i].filename;
            list.hash=lists[i].hash;
            item.data.push(list);
          }
//                            console.log(item);
          commit('showSearch',item);
          commit('showNowSongList',item.data);//将当前请求的歌曲数组保存至当前播放歌单列表
          commit('showNowSongListIndex',-1);
        })
        resolve()
      })
    },
    getSongUrl:function({commit},url){                    //得到当前播放歌曲的url地址
      return new Promise(function(resolve){
        axios.get("http://www.xi-g.com/kugouAPI/getSong.php?hash="+url).then(function(res){
//                            console.log(res.data.url);
          var list={};
          list.urls=res.data.url;//获取歌曲链接
          list.img='http://singerimg.kugou.com/uploadpic/softhead/200'+res.data.imgUrl.slice(52);//获取图片
          list.singer=res.data.singerName;//获取歌手姓名
          list.song=res.data.songName;  //获取歌曲名
          list.time=res.data.timeLength;//获取歌曲时长
          commit('showNowPlay',list);
        })
        resolve();
      })
    },
    getSongCi:function({commit},info){                    //得到当前播放歌曲的url地址
      return new Promise(function(resolve){
        axios.get("http://www.xi-g.com/kugouAPI/getSongLrc.php?hash="+info[0]+"&timelength="+info[1]).then(function(res){
//                            console.log(typeof(res.data));
          var list=res.data.split('\n');
          var lists=[];
          var arr=[];
          for(var i=0;i<list.length;i++){
            lists.push(list[i].replace(/(\[|])/g,''));
          }
          for(var i=0;i<lists.length;i++){
            var obj={};
            obj.time=lists[i].slice(0,5);
            obj.ci=list[i].slice(10);
            arr.push(obj);
          }
//                            console.log(arr);
          commit('showSongCi',arr);
        })
        resolve();
      })
    }//得到歌词数据（未开发）
  }
})
