<template>
	<div class="main">
      <mt-header fixed :title="simpleMovie.title">
           <mt-button  icon="back"  slot="left" @click="goBack">返回</mt-button>
      </mt-header>
      <div class="container bg_f4" >
        <div class="movie_bg_box ">
          <div class="movie_bg_filter">
              <img :src="simpleMovie.images.small" width="100%" height="170">
          </div>
          <div class="movie_des_box ">
            <div class="flex_box">
                <img :src="simpleMovie.images.small" width="110" height="150">
                <div class="movie_des">
                  <p class="movie_name">{{simpleMovie.title}}</p>
                  <p class="movie_des_item en_name">{{simpleMovie.original_title}}</p>
                  <p class="movie_des_item">
                     <span class="score">{{simpleMovie.rating.average}}</span>
                     ({{simpleMovie.comments_count}}人评论)</p>
                  <p class="movie_des_item">{{simpleMovie.genres|arrConver}}</p>
                  <p class="movie_des_item">{{simpleMovie.countries|arrConver}}</p>
                  <p class="movie_des_item">{{simpleMovie.year}}</p>
                </div> 
            </div>
          </div>
        </div>
        <div class="movie_des_text bg_white">
              <p :class="show_all_text?'h_full':'h_75'">{{simpleMovie.summary}}</p>
              <div class="arrow_box flex_box just_center">
                  <p class="movie_des_text_arrow" @click="showAll"></p>
              </div>
        </div>
        <div class="movie_casts bg_white blank_both">
              <div class="swiper-container" >
                <div class="swiper-wrapper">
                    <div class="swiper-slide " v-for="(item,index) in simpleMovie.casts" @click="goSimpleMovieCast(item.id)">
                        <img :src="item.avatars.large" >
                        <p>{{item.name}}</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
	</div>
</template>
<script>
import { Indicator } from 'mint-ui';
import {getSimpleMovieData} from "../../service/getData"

import '../../static/js/swiper.min.js'
import '../../static/css/swiper.min.css'
export default {
  name: 'singleMovie',
  data () {
    return {
      simpleMovie:{},
      currId:null,
      show_all_text:false          //是否显示全部的电影描述
    }
  },
  beforeMount(){
    if (this.$route.query.currId) {
        this.currId = this.$route.query.currId
    }
    this.getSimple();
  },
  methods:{
      goBack:function(){
        this.$router.go(-1);
      },
      getSimple:function(){           //获取单个电影的信息
        var $this = this;
        Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
        });
        getSimpleMovieData($this.currId).then(function(res){       
          $this.simpleMovie = res.data;
          Indicator.close();
          new Swiper('.swiper-container', {
              loop: true
          });
        }).catch(function(){     
           Indicator.close();
        });
      },
      goSimpleMovieCast:function(currId){
        var $this = this;
        $this.$router.push({path:'/simpleMovieCast', query:{currId}}) 
      },
      showAll:function(){
        this.show_all_text=!this.show_all_text;       
      }
  },filters: {  
        arrConver: function (value) {     //将数组转化为字符串
          var str = value.join(",");
          return str;  
        }  
  }
}
</script>
<style scoped>


.movie_des_text{
  padding: 10px;
  font-size:0.625rem; 
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
}
.movie_des_text p{
  line-height: 25px;
}
.movie_des_text_arrow{
  width: 9px;
  height: 14px;
  background-image: url("../../static/img/img_arrow_black.png");
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}
.h_75{
  height: 75px;
  overflow: hidden;
  word-break: break-all;  
  text-overflow: ellipsis;  
  display: -webkit-box; /*!** 对象作为伸缩盒子模型显示 **!  */
  -webkit-box-orient: vertical;/* !** 设置或检索伸缩盒对象的子元素的排列方式 **! */ 
  -webkit-line-clamp: 3; /*!** 显示的行数 **! */ 
}
.h_full{
  height: 100%;
}
.movie_casts{
  padding: 10px 15px; 
  border-bottom: 1px solid #ddd;
}
.swiper-slide{
  text-align: center;
  font-size: 0.5rem;
}
.swiper-container {
    width: 100%;
    height: 4.8rem;
}  
.swiper-slide{
  margin-right: 10px;
}
.swiper-slide, .swiper-slide img{
    width: 3.3rem;
    height: 3.8rem;
}
.swiper-slide p{
  width: 3.3rem;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: keep-all;
  white-space: nowrap;
}
</style>
