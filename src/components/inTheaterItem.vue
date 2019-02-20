<template>
	<div class="blank_both tab">
		<div class="resultItem" v-for="(item,index) in in_theater.subjects" :key="index" @click="goSingleMovie(item.id)">
			<div class="movieImg">
				<img :src="item.images.small" width="100%" height="100%">
			</div>
			<div class="movieDes" style="">
			 	<div class="name">
			 		<p v-text="item.title"></p> 
			 	</div>
			 	<div class="des">观众评<span style="color:#fa0;font-weight: bold;margin-left: 5px;">{{item.rating.average}}</span></div>
				<div class="des" >主演:<span v-for="(cast,index) in item.casts">{{cast.name}},</span></div>
				<div class="des" >类型:{{item.genres|arrConver}}</div>
				<div class="des" v-text="item.year"></div>
			</div>
			<div class="flex_box just_center align-item" :class="index%2==0?'change_btn':''">
					<mt-button type="primary" @click.stop='showMsg'>购票</mt-button>
			</div>
		</div>
	</div>
</template>
<script>
import {inTheaterData} from "../service/getData"
import { Indicator, MessageBox} from 'mint-ui';
export default {
	name: '',
	data(){
		return {
			selected:'1',
			in_theater:{}
		}
	},
	beforeMount(){
	    
	    this.getInTheater();
	},
	components:{


	},methods:{
		getInTheater:function(){
			var $this = this;
			Indicator.open({         //加载状态
			  text: '加载中...',
			  spinnerType: 'fading-circle'
			});
			inTheaterData().then(function(res){
				$this.in_theater = res.data;
				console.log("长在热映电影-----"+JSON.stringify(res.data));	
				Indicator.close();
			})
		},
		goSingleMovie:function(currId){
			var $this = this;
			$this.$router.push({path:'/singleMovie', query:{currId}})       //跳转至单个movie的信息
		},
		showMsg:function(){
			MessageBox('提示', '目前不支持购票');
		}
		
	},mounted(){

	},filters:{
		arrConver:function(value){
			var str = value.join(",");
            return str; 
		}
	}
}
</script>
<style scoped>
.resultItem{
	display:flex;
	padding-top: 0.4rem;
	padding-bottom:0.4rem;
	border-bottom: 1px solid #ddd;
}
.movieImg{
	width: 5rem;
	height: 6rem;
	margin-right: 10px;
}
.name{
	display: flex;
	justify-content: space-between;
	font-size: 0.75rem;
	line-height: 1.5rem;
}
.name>p:first-child{
	font-weight: bold;
	width:8rem;
	white-space: nowrap;
	overflow: hidden;
	text-overflow:ellipsis;
}


.des{
	font-size: 0.625rem;
	line-height: 1rem;
	white-space: nowrap;
	overflow: hidden;
	text-overflow:ellipsis;
	  width: 8rem;
}
 .tab .mint-tab-item-label{
   font-size: 0.75rem;
 }

 .tab .mint-button{
 	height: auto;
 	padding:3px 8px;
 	font-size: 0.625rem;
 	white-space: nowrap;
 }
 .change_btn .mint-button{
		background-color: #fa0;
 }
</style>