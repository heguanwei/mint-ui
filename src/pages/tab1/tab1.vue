<template>
	<div class="tab1">
		<div style="width:100%;position: fixed;z-index: 999;margin-top: -1px;">
			<banner></banner>
			<mt-navbar v-model="selected">
			  <mt-tab-item id="1">正在热映</mt-tab-item>
			  <mt-tab-item id="2">即将上映</mt-tab-item>
			</mt-navbar>
		</div>
		<div class="tab_contain">
			<!-- tab-container -->
			<mt-tab-container v-model="selected" >
			  <mt-tab-container-item id="1">
			 	  <keep-alive>
			      		<in-theater-item in-theater=""></in-theater-item>
			      </keep-alive>
			  </mt-tab-container-item>
			  <mt-tab-container-item id="2">
			      <keep-alive>
	 			  		<coming-soon in-theater=""></coming-soon>
	 			  </keep-alive>
			  </mt-tab-container-item>
			</mt-tab-container>
		</div>
	</div>
</template>
<script>
 import banner from '../../components/banner'
 import inTheaterItem from '../../components/inTheaterItem'
 import comingSoon from '../../components/comingSoon'
export default {
	name: 'tab1',
	data(){
		return {
			selected:"1"
		}
	},components:{
		banner,
		inTheaterItem,
		comingSoon
	},created(){
		this.initData();
	}
	,methods:{
		initData:function(){
		}
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
.tab_contain{
	position: relative;
	top: 9.06rem;
	margin-bottom:4.6rem;
	overflow: scroll;
}
</style>