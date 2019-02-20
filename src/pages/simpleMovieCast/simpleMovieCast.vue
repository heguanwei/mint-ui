<template>
	<div class="main">
		<mt-header fixed :title="movie_cast.name">
  			<mt-button  icon="back"  slot="left" @click="goBack">返回</mt-button>
		</mt-header>
		<div class="container bg_f4">
			<div class="movie_bg_box ">
	          <div class="movie_bg_filter">
	              <img :src="movie_cast.avatars.small" width="100%" height="100%">
	          </div>
	          <div class="movie_des_box ">
	            <div class="flex_box">
	                <img :src="movie_cast.avatars.small" width="110" height="150">
	                <div class="movie_des">
	                  <p class="movie_name">{{movie_cast.name}}</p>
	                  <p class="movie_des_item">{{movie_cast.name_en}} </p>
	                  <p class="movie_des_item">{{movie_cast.gender}} {{movie_cast.born_place}}</p>
	                </div> 
	            </div>
	          </div>
	        </div>
			<!-- 代表作 -->
			<div class='master_work_box bg_white'>
				<p class="master_work_title blank_both">代表作品({{master_num}})</p>	
                <div class="master_work ">
					<div class="resultItem blank_both" v-for="(item,index) in movie_cast.works" :key="index" @click="goSingleMovie(item.subject.id)">
						<div class="movieImg">
							<img :src="item.subject.images.small" width="64" height="90">
						</div>
						<div class="movieDes">
						 	<div class="name">
						 		<p v-text="item.subject.title"></p> 
						 		<p style="color:#fa0">{{item.subject.rating.average}}分</p>
						 	</div>
						 	<div class="des">{{item.roles|arrConver}}</div>
							<div class="des">{{item.subject.genres|arrConver}}</div>
							<div class="des" v-text="item.subject.year"></div>
						</div>
					</div>
                </div> 
			</div>
		</div>
	</div>
</template>
<script>
import { Indicator } from 'mint-ui';
import {getSimpleMovieCast} from "../../service/getData"
export default {
	name: 'getSimpleMovie',
	data(){
		return {
			movie_cast:{},
			currId:null,
			master_num:null     //作品数量
		}
	},
	beforeMount(){         //在vue被实例化之前
	    if (this.$route.query.currId) {
	        this.currId = this.$route.query.currId
	    }
	    this.getMovieCast();
	},
	methods:{
		goBack:function(){
	        this.$router.go(-1);
	    },
		getMovieCast:function(){
			var $this = this;
			Indicator.open({
	            text: '加载中...',
	            spinnerType: 'fading-circle'
	        });
			getSimpleMovieCast($this.currId).then(function(res){
				Indicator.close();
				$this.movie_cast = res.data;
				$this.master_num = res.data.works.length;
			})
		},goSingleMovie:function(currId){                    //获取单个电影的信息
			var $this = this;
			$this.$router.push({path:'/singleMovie', query:{currId}})       //跳转至单个movie的信息
		}
		
	},computed:{
	 	 
	},
	filters: {  
        arrConver: function (value) {     //将数组转化为字符串
        	var str = value.join(",");
            return str;  
        }  
    }  
	
}
</script>
<style >
.movie_avatar{
	height: 9.6rem;
	width: 100%;
	overflow: hidden;
}
.master_work_title{
	font-size: 0.75rem;
	line-height: 40px;
	border-bottom: 1px solid #ddd;
}




</style>