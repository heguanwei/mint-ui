<template>
	<div>
		<mt-swipe :auto="4000">
		  <mt-swipe-item >
		  	<img :src="img_01">
		  </mt-swipe-item>
		  <mt-swipe-item >
		  	<img :src="img_02">
		  </mt-swipe-item>
		  <mt-swipe-item >
		  	<img :src="img_03">
		  </mt-swipe-item>
		</mt-swipe>
		<!-- 九宫格 -->  
		    
	</div>
</template>
<script>
export default {
	name: 'banner',
	data(){
		return {
			img_01:'http://img3.doubanio.com/view/photo/s_ratio_poster/public/p2274692857.jpg',
			img_02:'http://img7.doubanio.com/view/photo/s_ratio_poster/public/p511118051.jpg',
			img_03:'http://img7.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg',
			imgs:['../static/img/a_01.jpg','../static/img/a_02.jpg','../static/img/a_03.jpg'],
			selected:'1'
		}
	},components:{
		

	},methods:{
		
	},mounted(){

	}
}
</script>
<style>
.tab .mint-navbar{
	width: 60%;
	margin:0px auto;
}
.mint-navbar .mint-tab-item.is-selected{
	margin-bottom:0px;
}
.mint-tab-container{
	border-top: 1px solid #ddd;
}
.mint-swipe{
	height:7rem !important;
}
 .mint-swipe-item img{
 	width: 100%;
 	height: 100%;
 }
</style>