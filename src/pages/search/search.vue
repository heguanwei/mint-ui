<template>
	<div class="main">
		<mt-header fixed title="猫眼电影">
			<mt-button  icon="back"  slot="left" @click="goBack">返回</mt-button>
		</mt-header>
		<div class="container">
			<div class="flex_box align-item search">
				<mt-search 
				autofocus   
				cancel-text=""
		        v-model="value"   
		        placeholder="搜索电影、电视剧、综艺、艺人" 
		        >
		        </mt-search>
		        <mt-button type="primary" size="small" @click="searchMovie">搜索</mt-button>
			</div>
			<!-- 正在热映 -->
			<div v-if="value==''">
				<div class="topSearch" v-if="isShow">
					<p class="line_height">正在热映</p>
					<div class="movieItem" > 
						<div class="movieTitle" 
						v-for="(item,index) in topMovies" 
						:key="index"  
						v-if="index<8" 
						v-text="item.title" 
						@touchend="goSingleMovie(item.id)">
						</div>
					</div>
				</div>
				<div class="topSearch"  v-if="(historyList!='') && isShow">
					<p class="line_height" >历史搜索</p>
					<div class="historyItem" > 
					 	<div v-for="(item,index) in historyList" @click="searchCurrMovie(item)" v-if="item!=''">
	 						 <mt-cell :title="item" 
							 :key="index" is-link>
							</mt-cell>
					 	</div>
					</div>
					<mt-button type="primary" @click="clearData">删除记录</mt-button>
				</div>
			</div>
			<!-- 搜索的结果 -->
			<div class=searchResult v-if="value!=''" >
				<div class="resultItem" v-for="(item,index) in searchResultMovie" :key="index" @click="goSingleMovie(item.id)">
					<div class="movieImg">
						<img :src="item.images.small" width="64" height="90">
					</div>
					<div class="movieDes">
					 	<div class="name">
					 		<p v-text="item.title"></p> 
					 		<p style="color:#fa0">{{item.rating.average}}分</p>
					 	</div>
						<div class="des" v-text="item.original_title"></div>
						<div class="des" >{{item.genres|arrConver}}</div>
						<div class="des" v-text="item.year"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import { Indicator } from 'mint-ui';
import {topMovie,searchMovieData,getSimpleMovieData} from "../../service/getData"
import {setStore,getStore,removeStore} from "../../config/mUtils"
export default {
	name: 'search',
	data(){
		return {
			isShow:false,
			value:'',
			topMovies:[],         //热映movie
			searchResultMovie:[], //搜索movie
			searchHistory:[],    //当前页搜索列表
			historyList:[], 		 //获取历史列表
			simpleMovie:{}
		}
	},
	created(){
		this.topMovieFun();	
		this.initData();
	},
	methods:{
		goBack:function(){
	        this.$router.go(-1);
	    },
		initData:function(){
			var $this = this;
			if(getStore("historyList")){
				$this.historyList = JSON.parse(getStore("historyList"));
			}else{
				$this.historyList = [];
			}
		},
		topMovieFun:function(){           //热门搜索
			var $this = this;
			Indicator.open({         //加载状态
			  text: '加载中...',
			  spinnerType: 'fading-circle'
			});
			topMovie().then(function(res){
			    $this.topMovies = res.data.subjects;
			    $this.isShow = true;
			    Indicator.close();
			});	
		},
		goSingleMovie:function(currId){                    //获取单个电影的信息
			var $this = this;
			$this.$router.push({path:'/singleMovie', query:{currId}})       //跳转至单个movie的信息
		},
		searchCurrMovie:function(currMovie){    //点击热门搜索、获取历史搜索
			var $this = this;
			$this.value = currMovie;
		},
		searchMovie:function(val){         //搜索
			Indicator.open({
			  text: '加载中...',
			  spinnerType: 'fading-circle'
			});
			var $this = this;
			$this.setHistory(val);      //	 保存当前搜索记录
			searchMovieData($this.value).then(function(res){
				$this.searchResultMovie = res.data.subjects;
				Indicator.close();
			});	
		},
		setHistory:function(val){           //判断当前搜索的字符串，是否已经存在
			var $this = this;
			let history = JSON.parse(getStore('historyList'));
			if(history){
				var checkRepeat = false;
				$this.searchHistory = JSON.parse(getStore('historyList'));
				history.forEach(function(item){
					if(item == val){
						checkRepeat = true;
					}
				});
				if(!checkRepeat){
					$this.searchHistory.unshift(val);       //从数组的最前边插入新的
				}
			}else{
				$this.searchHistory.unshift(val);
			}
			setStore('historyList',$this.searchHistory.slice(0,6));
		},
		clearData:function(){          //清楚历史记录
			removeStore('historyList');
			this.initData();
		}
		
	},computed:{
	 	 
	},
	filters: {  
        arrConver: function (value) {     //将数组转化为字符串
        	var str = value.join(",");
            return str;  
        }  
    },  
	watch:{ 
		//监听value值的变化
		value:function(val){
			this.searchMovie(val);
		}
	}
}
</script>
<style >


.search{
	background-color: #d9d9d9;
	padding-right: 10px;
}
.search .mint-search-list{
	display:none;
}

.mint-search{
	height: auto;
	width: 82%;
}
.topSearch,.searchResult{
  	 padding-left: 15px;
  	 padding-right:15px;
}
.historyItem{
	width: auto;
}
.mint-cell-wrapper{
	padding:0px;
}


.movieItem{
	display: flex;
	flex-wrap: wrap;
}
.movieTitle{
	padding: 5px;
	font-size: 13px;
	background-color: #f5f5f5;
	border-radius: 3px;
	margin-right: 10px;
	margin-bottom: 10px;
	cursor: pointer;
}

.mint-cell{
	min-height: 35px;
	border-bottom: 1px solid #f8f8f8;
}
.topSearch .mint-button{
	width: 100%;
	margin-top: 20px;
}

</style>